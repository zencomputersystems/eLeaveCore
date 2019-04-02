import { Injectable } from '@nestjs/common';
import { Moment } from 'moment';
import { ApplyLeaveDTO } from '../dto/apply-leave.dto';
import { UserLeaveEntitlementDbService } from 'src/api/userprofile/db/user-leave-entitlement.db.service';
import { map, filter, switchMap, mergeMap } from 'rxjs/operators';
import { UserLeaveEntitlementModel } from 'src/api/userprofile/model/user-leave-entitlement.model';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { LeaveApplicationValidationService } from 'src/common/policy/leave-application-validation/services/leave-application-validation.service';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { UserInfoModel } from 'src/admin/user-info/model/user-info.model';
import moment = require('moment');
import { of } from 'rxjs';
import { LeaveBalanceValidationService } from 'src/common/policy/leave-application-validation/services/leave-balance-validation.service';
import { LeaveTransactionModel } from '../model/leave-transaction.model';
import { v1 } from 'uuid';
import { Resource } from 'src/common/model/resource.model';
import { LeaveTransactionDbService } from '../db/leave-transaction.db.service';
import { DateCalculationService } from 'src/common/calculation/service/date-calculation.service';
import { LeaveTypePropertiesXmlDTO } from 'src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto';
import { ValidationStatusDTO } from 'src/common/policy/leave-application-validation/dto/validation-status.dto';


@Injectable()
export class ApplyLeaveService {

    constructor(
        private readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService,
        private readonly xmlParserService: XMLParserService,
        private readonly leaveValidationService: LeaveApplicationValidationService,
        private readonly userInfoService: UserInfoService,
        private readonly leaveTransactionDbService: LeaveTransactionDbService,
        private readonly dateCalculationService: DateCalculationService
    ) {}

    // process leave application
    public processLeave(applyLeaveDTO: ApplyLeaveDTO, user: any) {
        
        //const dayDuration = this.balanceService.getDayDuration(moment(applyLeaveDTO.startDate),moment(applyLeaveDTO.endDate),true,true);


        // get user info
        return this.userInfoService.findByFilterV2(['JOIN_DATE','CONFIRMATION_DATE'],['(USER_GUID='+user.USER_GUID+')','(TENANT_GUID='+user.TENANT_GUID+')'])
                .pipe(
                    map(res => {
                        return res[0];
                    }),
                    mergeMap((userInfo:UserInfoModel) => {
                        return this.checkUserLeaveEntitlement(applyLeaveDTO.leaveTypeID,user)
                                .pipe(
                                    map((userEntitlement:UserLeaveEntitlementModel[]) => {
                                        return {userInfo,userEntitlement};
                                    })
                                )

                    }),
                    mergeMap((result) => {

                        //find the parent leave
                        const parent = result.userEntitlement.filter(x=>x.PARENT_FLAG==1)[0];

                        if(parent.PROPERTIES_XML==null||parent.PROPERTIES_XML==undefined) {
                            const res = new ValidationStatusDTO();
                            res.valid = false;
                            res.message.push("Policy Not Found");
                            throw res;
                        }

                        const policy: LeaveTypePropertiesXmlDTO = this.xmlParserService.convertXMLToJson(parent.PROPERTIES_XML);

                        // validate the policy
                        const validation = this.leaveValidationService.validateLeave(policy,applyLeaveDTO,result.userInfo,result.userEntitlement);

                        return validation.pipe(map(validationResult => {
                            return {result,validationResult,policy};
                        }));

                    }),
                    mergeMap(result => {
                        
                        if(result.validationResult.valid) {
                            //start to save leave transaction into db
                            const leaveData = new LeaveTransactionModel();

                            leaveData.LEAVE_TRANSACTION_GUID = v1();
                            leaveData.LEAVE_TYPE_GUID = result.result.userEntitlement[0].LEAVE_TYPE_GUID;
                            leaveData.ENTITLEMENT_GUID = result.result.userEntitlement[0].ENTITLEMENT_GUID;
                            leaveData.USER_GUID = user.USER_GUID;
                            leaveData.TENANT_GUID = user.TENANT_GUID;
                            leaveData.CREATION_USER_GUID = user.USER_GUID;
                            leaveData.TENANT_COMPANY_GUID = result.result.userInfo.TENANT_COMPANY_GUID==undefined?"":result.result.userInfo.TENANT_COMPANY_GUID;
                            
                            leaveData.START_DATE = applyLeaveDTO.startDate;
                            leaveData.END_DATE = applyLeaveDTO.endDate;
                            leaveData.REASON = applyLeaveDTO.reason;
                            leaveData.NO_OF_DAYS = this.dateCalculationService.getLeaveDuration(applyLeaveDTO.startDate,applyLeaveDTO.endDate,applyLeaveDTO.dayType,result.policy.excludeDayType.isExcludeHoliday,result.policy.excludeDayType.isExcludeRestDay);
                            leaveData.ENTITLEMENT_XML_SNAPSHOT = this.xmlParserService.convertJsonToXML(result.policy);
                            leaveData.ACTIVE_FLAG = true;

                            const resource = new Resource(new Array());

                            resource.resource.push(leaveData);

                            return this.leaveTransactionDbService.createByModel(resource,[],[],[])
                                .pipe(map((res) => {

                                    if(res.status!=200) {
                                        result.validationResult.valid = false;
                                    } 

                                    return result.validationResult;
                                }))
                        } else {
                            return of(result.validationResult);
                        }
                    })
                )
    }

    // check if leave entitlement policy is available
    private checkUserLeaveEntitlement(leaveTypeId: string, user: any) {
        const filter = [
            '(LEAVE_TYPE_GUID='+leaveTypeId+')',
            '(USER_GUID='+user.USER_GUID+')',
            '(TENANT_GUID='+user.TENANT_GUID+')',
            '(ACTIVE_FLAG=1)',
            '(YEAR='+new Date().getFullYear()+')'
        ];


        return this.userLeaveEntitlementDbService.findByFilterV2([],filter)
                .pipe(
                    map(result => {
                        if(result.length==0) {
                            const res = new ValidationStatusDTO();
                            res.valid = false;
                            res.message.push("Leave Entitlement Not Available");
                            throw res;
                        }
                        
                        return result;
                    })
                )
    }

    // get month between 2 date
    // return array of month
    getMonths(startDate: Moment, endDate: Moment) {
        var timeValues = [];

        while (endDate > startDate || startDate.format('M') === endDate.format('M')) {
            timeValues.push(startDate.format('YYYY-MM'));
            startDate.add(1,'month');
        }

        return timeValues;
    }

    // get day list between 2 date
    getDays(startDate: Moment, endDate: Moment) {
        var timeValues = [];

        while (endDate > startDate || startDate.format('D') === endDate.format('D')) {
            timeValues.push(startDate.format('YYYY-MM-DD'));
            startDate.add(1,'day');
        }

        return timeValues;
    }



}
