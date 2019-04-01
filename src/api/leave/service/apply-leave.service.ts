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


@Injectable()
export class ApplyLeaveService {

    constructor(
        private readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService,
        private readonly xmlParserService: XMLParserService,
        private readonly leaveValidationService: LeaveApplicationValidationService,
        private readonly userInfoService: UserInfoService,
        private readonly balanceValidationService: LeaveBalanceValidationService
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
                            throw "Policy Not Found";
                        }

                        const policy = this.xmlParserService.convertXMLToJson(parent.PROPERTIES_XML);

                        // validate the policy
                        const validation = this.leaveValidationService.validateLeave(policy,applyLeaveDTO,result.userInfo,result.userEntitlement);

                        return validation;

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
                            throw ('Leave entitlement not available');
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
