export interface ILeaveEntitleCalc {

    // calculate entitle leave for current year of service
    // return entitle leave for passed year of service
    calculateEntitledLeave(dateOfJoin:Date, yearOfService: number, leavePolicy: string): number;
}