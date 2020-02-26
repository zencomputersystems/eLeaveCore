import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Resource } from 'src/common/model/resource.model';
import { LeaveAdjustmentLogModel } from './model/leave-adjustment-log.model';
import { v1 } from 'uuid';

@Injectable()
export class LeaveAdjustmentDbLogService extends BaseDBService implements IDbService {
  constructor(
    public readonly httpService: HttpService,
    public readonly queryService: QueryParserService) {

    super(httpService, queryService, "l_leave_adjustment_log");
  }

  setupData([resource, userId, leavetypeId, adjustment, remarks, creatorUserId, tenantId]: [Resource, string, string, string, string, string, string]) {

    let leaveLogData = new LeaveAdjustmentLogModel();

    leaveLogData.LEAVE_ADJUSTMENT_LOG_GUID = v1();
    leaveLogData.TENANT_GUID = tenantId;
    leaveLogData.USER_GUID = userId;
    leaveLogData.LEAVE_TYPE_GUID = leavetypeId;
    leaveLogData.ADJUSTMENT = adjustment;
    leaveLogData.REMARKS = remarks;
    leaveLogData.CREATION_USER_GUID = creatorUserId;

    resource.resource.push(leaveLogData);
    return resource;

  }

  create([resource]: [Resource]) {
    return this.createByModel(resource, [], [], []);
  }

}