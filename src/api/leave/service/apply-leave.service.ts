import { Injectable } from '@nestjs/common';
import { Moment } from 'moment';
import { ApplyLeaveDTO } from '../dto/apply-leave.dto';
import { UserLeaveEntitlementDbService } from 'src/api/userprofile/db/user-leave-entitlement.db.service';
import { map } from 'rxjs/operators';


@Injectable()
export class ApplyLeaveService {

    constructor(
        private readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService
    ) {}

    // process leave application
    public processLeave(applyLeaveDTO: ApplyLeaveDTO, user: any) {
        return this.checkUserLeaveEntitlement(applyLeaveDTO.leaveTypeID,user);
    }

    // calculate how many day leave is taken
    // check the policy for excluded day type
    public getTotalAppliedDay(startDate: Moment, endDate:Moment) {
        return this.getMonths(startDate,endDate);
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

    // calculate balance available on leave date
    private calculateLeaveBalance(startDate: Moment, endDate: Moment, leavePolicy: string) {
        
        // get the month list
        const month = this.getMonths(startDate,endDate);

        

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
