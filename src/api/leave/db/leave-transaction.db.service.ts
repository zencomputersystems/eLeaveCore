import { BaseDBService } from "src/common/base/base-db.service";
import { IDbService } from "src/interface/IDbService";
import { Injectable, HttpService } from "@nestjs/common";
import { QueryParserService } from "src/common/helper/query-parser.service";
import { XMLParserService } from "src/common/helper/xml-parser.service";
import { LeaveTransactionModel } from "../model/leave-transaction.model";
import { v1 } from "uuid";
import { ApplyLeaveDataDTO } from "../dto/apply-leave-data.dto";
import { ApplyLeaveDTO } from "../dto/apply-leave.dto";
import { Resource } from "src/common/model/resource.model";
import { DateCalculationService } from "src/common/calculation/service/date-calculation.service";

@Injectable()
export class LeaveTransactionDbService extends BaseDBService implements IDbService {

    constructor(
        public readonly httpService: HttpService,
        private readonly xmlParserService: XMLParserService,
        private readonly dateCalculationService: DateCalculationService,
        public readonly queryService: QueryParserService) {
        super(httpService, queryService, "l_main_leave_transaction");
    }

    public create(applyLeaveDataDTO: ApplyLeaveDataDTO, result:any, user: any,y:ApplyLeaveDTO) {

        // const data = new LeaveTransactionModel();

        // data.LEAVE_TRANSACTION_GUID = v1();
        // data.CREATION_USER_GUID = user.USER_GUID;
        // data.USER_GUID = user.USER_GUID;
        // data.TENANT_GUID = user.TENANT_GUID;
        // data.ENTITLEMENT_GUID = applyLeaveDataDTO.leaveTypeID;
        // data.START_DATE = applyLeaveDTO.startDate;
        // data.END_DATE = applyLeaveDTO.endDate;

        let leaveData = new LeaveTransactionModel();


        leaveData.LEAVE_TRANSACTION_GUID = v1();
        leaveData.LEAVE_TYPE_GUID = result.result.userEntitlement[0].LEAVE_TYPE_GUID;
        leaveData.ENTITLEMENT_GUID = result.result.userEntitlement[0].ENTITLEMENT_GUID;
        leaveData.USER_GUID = user.USER_GUID;
        leaveData.TENANT_GUID = user.TENANT_GUID;
        leaveData.CREATION_USER_GUID = user.USER_GUID;
        leaveData.TENANT_COMPANY_GUID = result.result.userInfo.TENANT_COMPANY_GUID == undefined ? "" : result.result.userInfo.TENANT_COMPANY_GUID;
        leaveData.START_DATE = applyLeaveDataDTO.startDate;
        leaveData.END_DATE = applyLeaveDataDTO.endDate;
        leaveData.REASON = y.reason;
        leaveData.NO_OF_DAYS = this.dateCalculationService.getLeaveDuration(applyLeaveDataDTO.startDate, applyLeaveDataDTO.endDate, applyLeaveDataDTO.dayType, result.policy.excludeDayType.isExcludeHoliday, result.policy.excludeDayType.isExcludeRestDay);
        leaveData.ENTITLEMENT_XML_SNAPSHOT = this.xmlParserService.convertJsonToXML(result.policy);
        leaveData.ACTIVE_FLAG = true;
        leaveData.STATES = null;
        leaveData.STATUS = "PENDING";
        leaveData.UPDATE_USER_GUID = user.USER_GUID;
        leaveData.AM_PM = applyLeaveDataDTO.slot || null;
        leaveData.CURRENT_APPROVAL_LEVEL = 0;
        leaveData.Half_Date = applyLeaveDataDTO.dayType == 1 ? applyLeaveDataDTO.startDate : null;

        let resource = new Resource(new Array());

        console.log(leaveData);

        resource.resource.push(leaveData);

        return this.createByModel(resource,[],[],[]);
    }

}