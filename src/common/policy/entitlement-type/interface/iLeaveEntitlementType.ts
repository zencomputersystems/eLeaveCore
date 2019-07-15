import { LeaveTypePropertiesXmlDTO } from 'src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto';

/**
 * Interface leave entitlement type
 *
 * @export
 * @interface ILeaveEntitlementType
 */
export interface ILeaveEntitlementType {
    // taken from policy: Leave entitlement type
    // calculate leave entitlement based on type assign to user policy
    /**
     * taken from policy: Leave entitlement type
     * calculate leave entitlement based on type assign to user policy
     *
     * @param {Date} date
     * @param {number} yearOfService
     * @param {LeaveTypePropertiesXmlDTO} leavePolicy
     * @returns {number}
     * @memberof ILeaveEntitlementType
     */
    calculateEntitledLeave(date: Date, yearOfService: number, leavePolicy: LeaveTypePropertiesXmlDTO): number
}