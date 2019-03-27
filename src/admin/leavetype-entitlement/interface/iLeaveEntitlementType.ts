export interface ILeaveEntitlementType {
    // taken from policy: Leave entitlement type
    // calculate leave entitlement based on type assign to user policy
    calculateEntitledLeave(date: Date, yearOfService: number, leavePolicy: string): number
}