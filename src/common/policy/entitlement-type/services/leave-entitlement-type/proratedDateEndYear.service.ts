import moment = require("moment");
import { Injectable } from '@nestjs/common';
import { LeaveEntitlementBaseService } from './leave-entitlement-base.service';
import { ILeaveEntitlementType } from '../../interface/iLeaveEntitlementType';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { EntitlementRoundingService } from 'src/common/policy/entitlement-rounding/services/entitlement-rounding.service';
import { LeaveTypePropertiesXmlDTO } from 'src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto';

/**
 * Service for pro rate date end year
 *
 * @export
 * @class ProratedDateEndYearService
 * @extends {LeaveEntitlementBaseService}
 * @implements {ILeaveEntitlementType}
 */
@Injectable()
export class ProratedDateEndYearService extends LeaveEntitlementBaseService implements ILeaveEntitlementType {

    /**
     *Creates an instance of ProratedDateEndYearService.
     * @param {XMLParserService} xmlParserService Service for XMLJSON converter
     * @param {EntitlementRoundingService} roundingService Service for rounding
     * @memberof ProratedDateEndYearService
     */
    constructor(
        private readonly xmlParserService: XMLParserService,
        private readonly roundingService: EntitlementRoundingService) {
        super();
    }

    // get full entitlement of this service year
    /**
     * get full entitlement of this service year
     *
     * @param {Date} date
     * @param {number} yearOfService
     * @param {LeaveTypePropertiesXmlDTO} leavePolicy
     * @returns {number}
     * @memberof ProratedDateEndYearService
     */
    calculateEntitledLeave(date: Date, yearOfService: number, leavePolicy: LeaveTypePropertiesXmlDTO): number {

        /* EG:
            
            Join Date = 23/March/2018
            Entitle for 1 year of service = 16

            April - Dec = 9 month
            31 March - 23 March = 9 Days

            Entitle Per Month = 16/12
            Entitle Per Day = Entitle Per Month/31 days 

            Total Entitle = (Entitle Per Month * 9 Month) + (Entitle Per Day * 9 Days)
        */

        // convert date of join to moment type
        const dateMoment = moment(date, 'YYYY-MM-DD');

        // join month entitlement will be calculated based on days
        const monthJoin = dateMoment.month() + 1;

        // month that will have full entitlement
        const monthFullEntitlement = (12 - monthJoin);

        // Convert xml to json
        //const policyJson = this.xmlParserService.convertXMLToJson(leavePolicy);

        const currentYearActualEntitlement = this.calculateEntitlement(dateMoment, leavePolicy, yearOfService, monthFullEntitlement, "END")

        if (yearOfService <= 1) {

            // for december in 1st working year of service, we ignore other month
            return currentYearActualEntitlement;
        }

        const previousYearActualEntitlemnt = this.calculateEntitlement(dateMoment, leavePolicy, (yearOfService - 1), (monthJoin - 1), "START");

        return currentYearActualEntitlement + previousYearActualEntitlemnt;
    }


}