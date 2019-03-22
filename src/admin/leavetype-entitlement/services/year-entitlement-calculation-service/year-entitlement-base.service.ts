export class YearEntitlementBaseService {

    protected dateFormat = 'YYYY-MM-DD';

    protected getEntitlementFromPolicy(leavePolicy: any, yearOfService: number) {

        // Check if leave entitlement is an array or not
        const checkArray = leavePolicy.levels.leaveEntitlement instanceof Array;

        let entitledDay;

        if(checkArray) {
            //find the entitle day for this service year
            entitledDay = leavePolicy.levels.leaveEntitlement.find(x=>yearOfService>=x.service_year_from&&yearOfService<=x.service_year_to);
        } else {
            if(yearOfService>=leavePolicy.levels.leaveEntitlement.service_year_from&&yearOfService<=leavePolicy.levels.leaveEntitlement.service_year_to) {
                entitledDay = leavePolicy.levels.leaveEntitlement;
            }
        }

        return entitledDay.entitled_days;
    }

    protected calculateEntitlement(
        serviceYear: number,
        policyJson: string, 
        monthAmount: number, 
        joinMonthAmount: number,
        lastDayOfMonthJoin: number,
        type: string) {
 
 
         const yearEntitlement = this.getEntitlementFromPolicy(policyJson,serviceYear);
 
 
         const yearEntitlementPerMonth  = (yearEntitlement/12);
         
         const yearlyEntitlement = (yearEntitlementPerMonth * monthAmount);

         if(type.toUpperCase()==="DAY") {
            const jointMonthEntitlementPerDay = (yearEntitlementPerMonth/lastDayOfMonthJoin);
    
    
            const joinMonthEntitlement = jointMonthEntitlementPerDay*joinMonthAmount;
    
    
            const total = yearlyEntitlement+joinMonthEntitlement;
    
            return total;
        }

        return yearEntitlement;
         
    }
}