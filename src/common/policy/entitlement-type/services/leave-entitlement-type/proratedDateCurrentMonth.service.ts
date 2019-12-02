import { LeaveEntitlementBaseService } from './leave-entitlement-base.service';
import { ILeaveEntitlementType } from '../../interface/iLeaveEntitlementType';
import moment = require("moment");
import { Injectable } from '@nestjs/common';
import { LeaveTypePropertiesXmlDTO } from 'src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto';
/** XMLparser from zen library  */
var { convertXMLToJson, convertJsonToXML } = require('@zencloudservices/xmlparser');

/**
 * Service for pro rate date current month
 *
 * @export
 * @class ProratedDateCurrentMonthService
 * @extends {LeaveEntitlementBaseService}
 * @implements {ILeaveEntitlementType}
 */
@Injectable()
export class ProratedDateCurrentMonthService extends LeaveEntitlementBaseService implements ILeaveEntitlementType {

    /**
     *Creates an instance of ProratedDateCurrentMonthService.
     * @memberof ProratedDateCurrentMonthService
     */
    constructor() {
        super();
    }

    // calculate the leave entitlement
    // calculation based on date of join/date of confirm to current month
    // case:
    // Join date: 24/2/2019
    // current date: 1/4/2019
    // calculate Feb using day calculation
    // calculate March and April using Month Calculation
    /**
     * Calculate entitled leave
     *
     * @param {Date} date
     * @param {number} yearOfService
     * @param {LeaveTypePropertiesXmlDTO} leavePolicy
     * @returns {number}
     * @memberof ProratedDateCurrentMonthService
     */
    calculateEntitledLeave(date: Date, yearOfService: number, leavePolicy: LeaveTypePropertiesXmlDTO): number {

        // convert date of join to moment type
        const dateMoment = moment(date, 'YYYY-MM-DD');

        // join month entitlement will be calculated based on days
        const monthJoin = dateMoment.month() + 1;

        const currentMonth = moment().month() + 1;

        // Convert xml to json
        //const policyJson = convertXMLToJson(leavePolicy);

        const currentYearActualEntitlement = this.calculateEntitlement(dateMoment, leavePolicy, yearOfService, (currentMonth - monthJoin), "END");

        //console.log(currentYearActualEntitlement);
        if (yearOfService <= 1) {
            return currentYearActualEntitlement;
        }


        const previousYearActualEntitlement = this.calculateEntitlement(dateMoment, leavePolicy, (yearOfService - 1), (monthJoin - 1), "START");

        return currentYearActualEntitlement + previousYearActualEntitlement;


    }

}