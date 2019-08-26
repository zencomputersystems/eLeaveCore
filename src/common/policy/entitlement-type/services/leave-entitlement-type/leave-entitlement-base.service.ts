import { Moment } from 'moment';
import { LeaveTypePropertiesXmlDTO } from 'src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto';

/**
 * Service for leave entitlement
 *
 * @export
 * @class LeaveEntitlementBaseService
 */
export class LeaveEntitlementBaseService {

    /**
     * Method to get entitlement from policy
     *
     * @protected
     * @param {*} leavePolicy
     * @param {number} yearOfService
     * @returns
     * @memberof LeaveEntitlementBaseService
     */
    public getEntitlementFromPolicy(leavePolicy: any, yearOfService: number) {

        // Check if leave entitlement is an array or not
        const checkArray = leavePolicy.levels.leaveEntitlement instanceof Array;

        let entitledDay;

        if (checkArray) {
            //find the entitle day for this service year
            entitledDay = leavePolicy.levels.leaveEntitlement.find(x => yearOfService >= x.serviceYearFrom && yearOfService <= x.serviceYearTo);
        } else {
            if (yearOfService >= leavePolicy.levels.leaveEntitlement.serviceYearFrom && yearOfService <= leavePolicy.levels.leaveEntitlement.serviceYearTo) {
                entitledDay = leavePolicy.levels.leaveEntitlement;
            }
        }

        return entitledDay.entitledDays;
    }

    /**
     * Method to get entitlement per day
     *
     * @protected
     * @param {Moment} date
     * @param {number} entitlementPerMonth
     * @param {string} option
     * @returns
     * @memberof LeaveEntitlementBaseService
     */
    protected getEntitlementPerDay(date: Moment, entitlementPerMonth: number, option: string) {

        let monthWorkingDay = 0;

        if (option === "START") {
            // get the first part month workingday
            monthWorkingDay = date.date();

        } else {

            monthWorkingDay = (date.daysInMonth() + 1) - date.date();
        }

        return ((entitlementPerMonth / date.daysInMonth()) * monthWorkingDay);
    }

    /**
     * Method calculate entitlement
     *
     * @protected
     * @param {Moment} date
     * @param {LeaveTypePropertiesXmlDTO} policyJson
     * @param {number} yearOfService
     * @param {number} monthFullEntitlement
     * @param {string} option
     * @returns
     * @memberof LeaveEntitlementBaseService
     */
    protected calculateEntitlement(
        date: Moment,
        policyJson: LeaveTypePropertiesXmlDTO,
        yearOfService: number,
        monthFullEntitlement: number,
        option: string
    ) {

        // current service year entitlement
        const yearTotalEntitlement = this.getEntitlementFromPolicy(policyJson, yearOfService);
        const entitlementPerMonth = yearTotalEntitlement / 12;

        // get the first/end month workingday
        const monthEntitlement = this.getEntitlementPerDay(date, entitlementPerMonth, option);

        // find leave entitlement for other month
        const monthlyTotalEntitlement = monthFullEntitlement * entitlementPerMonth;

        return (monthlyTotalEntitlement + monthEntitlement);

    }

}