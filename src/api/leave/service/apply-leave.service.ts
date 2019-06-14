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
import { json } from 'body-parser';
import { ApplyLeaveDataDTO } from '../dto/apply-leave-data.dto';


/**
 *
 *
 * @export
 * @class ApplyLeaveService
 */
@Injectable()
export class ApplyLeaveService {

    constructor(
        private readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService,
        private readonly xmlParserService: XMLParserService,
        private readonly leaveValidationService: LeaveApplicationValidationService,
        private readonly userInfoService: UserInfoService,
        private readonly leaveTransactionDbService: LeaveTransactionDbService,
        private readonly dateCalculationService: DateCalculationService
    ) { }

    // process leave application
    public processLeave(applyLeaveDTO: ApplyLeaveDTO, user: any) {
        let y = applyLeaveDTO;

        return this.userInfoService.findByFilterV2(['JOIN_DATE', 'CONFIRMATION_DATE'], ['(USER_GUID=' + user.USER_GUID + ')', '(TENANT_GUID=' + user.TENANT_GUID + ')'])
            .pipe(
                map(res => {
                    return res[0];
                }),
                mergeMap((userInfo: UserInfoModel) => {
                    return this.checkUserLeaveEntitlement(y.leaveTypeID, user)
                        .pipe(
                            map((userEntitlement: UserLeaveEntitlementModel[]) => {
                                return { userInfo, userEntitlement };
                            })
                        )
                }),
                mergeMap((result) => {
                    // find the parent leave
                    const parent = result.userEntitlement.filter(x => x.PARENT_FLAG == 1)[0];

                    if (parent.PROPERTIES_XML == null || parent.PROPERTIES_XML == undefined) {
                        const res = new ValidationStatusDTO();
                        res.valid = false;
                        res.message.push("Policy Not Found");
                        throw res;
                    }

                    const policy: LeaveTypePropertiesXmlDTO = this.xmlParserService.convertXMLToJson(parent.PROPERTIES_XML);
                    const validation = this.leaveValidationService.validateLeave(policy, y, result.userInfo, result.userEntitlement);

                    return validation.pipe(map((validationResult) => {
                        return { result, validationResult, policy };
                    }));
                }),
                mergeMap(result => {
                    if (result.validationResult.valid) {
                        return of(this.applyLeaveData(result, y, user));
                    } else {
                        return of(result.validationResult);
                    }
                })
            )
    }

    private applyLeaveData(result, y: ApplyLeaveDTO, user) {
        let resArr = [];
        let sumDays = 0;
        for (let i = 0; i < y.data.length; i++) {
            let leaveDetail = y.data[i];

            let msjStatus = "";
            let noOfDays = this.dateCalculationService.getLeaveDuration(y.data[i].startDate, y.data[i].endDate, y.data[i].dayType, result.policy.excludeDayType.isExcludeHoliday, result.policy.excludeDayType.isExcludeRestDay);

            if (noOfDays == 0) {
                msjStatus = leaveDetail.startDate + ' is a leave day';
            }
            else {
                msjStatus = noOfDays + ' ' + (noOfDays > 1 ? 'days':'day') +'  was send for approval between '+leaveDetail.startDate+' and '+leaveDetail.endDate;
                this.leaveTransactionDbService.create(y.data[i], result, user, y).pipe(map((res) => {
                    console.log('pass');
                    if (res.status != 200) {
                        result.validationResult.valid = false;
                    }

                    return result.validationResult;
                })).subscribe(data => {
                    console.log(data);
                })
            }
            resArr.push(msjStatus);
            sumDays=sumDays+noOfDays;
        }
        result.validationResult.message = sumDays + ' ' + (sumDays > 1 ? 'days':'day') +' was send for approval';
        result.validationResult.details = resArr;
        return result.validationResult;
    }

    // check if leave entitlement policy is available
    private checkUserLeaveEntitlement(leaveTypeId: string, user: any) {
        const filter = [
            '(LEAVE_TYPE_GUID=' + leaveTypeId + ')',
            '(USER_GUID=' + user.USER_GUID + ')',
            '(TENANT_GUID=' + user.TENANT_GUID + ')',
            '(ACTIVE_FLAG=1)',
            '(YEAR=' + new Date().getFullYear() + ')'
        ];

        return this.userLeaveEntitlementDbService.findByFilterV2([], filter)
            .pipe(
                map(result => {
                    if (result.length == 0) {
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
            startDate.add(1, 'month');
        }

        return timeValues;
    }

    // get day list between 2 date
    getDays(startDate: Moment, endDate: Moment) {
        var timeValues = [];

        while (endDate > startDate || startDate.format('D') === endDate.format('D')) {
            timeValues.push(startDate.format('YYYY-MM-DD'));
            startDate.add(1, 'day');
        }

        return timeValues;
    }
}