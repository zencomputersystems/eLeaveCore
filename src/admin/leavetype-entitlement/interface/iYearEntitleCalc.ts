export interface IYearEntitleCalcService {
    calculateYearlyEntitlement(dateOfJoin: Date, yearOfService: number,leavePolicy: string): number;
}