import { LeaveTypePropertiesXmlDTO } from "src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto";

export interface ILeaveEntitlementType {
    // taken from policy: Leave entitlement type
    // calculate leave entitlement based on type assign to user policy
    calculateEntitledLeave(date: Date, yearOfService: number, leavePolicy: LeaveTypePropertiesXmlDTO): number
}