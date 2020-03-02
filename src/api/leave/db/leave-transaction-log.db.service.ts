import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { LeaveTransactionLogModel } from '../model/leave-transaction-log.model';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';

@Injectable()
export class LeaveTransactionLogDbService extends BaseDBService implements IDbService {
  constructor(
    public readonly httpService: HttpService,
    public readonly queryService: QueryParserService) {

    super(httpService, queryService, "l_main_leave_transaction_log");
  }

  create([leaveTransactionId, status, processLeave, remarks, creatorUserId, tenantId]: [string, string, string, string, string, string]) {
    const resource = new Resource(new Array);
    let leaveLogData = new LeaveTransactionLogModel();

    leaveLogData.LOG_GUID = v1();
    leaveLogData.TENANT_GUID = tenantId;
    leaveLogData.LEAVE_TRANSACTION_GUID = leaveTransactionId;
    leaveLogData.STATUS = status;
    leaveLogData.PROCESS = processLeave;
    leaveLogData.REMARKS = remarks;
    leaveLogData.CREATION_USER_GUID = creatorUserId;

    resource.resource.push(leaveLogData);

    return this.createByModel(resource, [], [], []);

  }
}