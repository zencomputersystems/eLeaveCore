import { ILeaveEntitleCalc } from "../../interface/iLeaveEntitleCalc";

export class ProratedJoinDateCurrentMonth implements ILeaveEntitleCalc {
    
    calculateEntitledLeave(dateOfJoin: Date, yearOfService: number, leavePolicy: string): number {
        throw new Error("Method not implemented.");
    }

}