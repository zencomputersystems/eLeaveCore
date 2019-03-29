import { BaseDBService } from "src/common/base/base-db.service";
import { IDbService } from "src/interface/IDbService";
import { Injectable, HttpService } from "@nestjs/common";
import { QueryParserService } from "src/common/helper/query-parser.service";
import { XMLParserService } from "src/common/helper/xml-parser.service";
import { ApplyLeaveDTO } from "../dto/apply-leave.dto";
import { LeaveTransactionModel } from "../model/leave-transaction.model";
import { v1 } from "uuid";

@Injectable()
export class LeaveTransactionDbService extends BaseDBService implements IDbService {
    
    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService){
            super(httpService,queryService,"l_leavetype_entitlement_def");
        }

    public create(applyLeaveDTO: ApplyLeaveDTO, user: any) {
        
        const data = new LeaveTransactionModel();

        data.LEAVE_TRANSACTION_GUID = v1();
        
    }
        
}