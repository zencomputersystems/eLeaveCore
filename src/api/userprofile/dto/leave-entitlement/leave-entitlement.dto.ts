export class LeaveEntitlementDTO {

    constructor() {
        this.leaveType = '';
        this.entitledDays = 0;
        this.leaveTaken = 0;
        this.leavePending = 0;
        this.leaveBalance = 0
    }

    leaveType: string;
    entitledDays: number;
    leaveTaken: number;
    leavePending: number;
    leaveBalance: number;
}