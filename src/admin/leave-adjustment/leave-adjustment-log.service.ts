import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Resource } from 'src/common/model/resource.model';
import { LeaveAdjustmentLogModel } from './model/leave-adjustment-log.model';
import { v1 } from 'uuid';

/**
 * Leave adjustment db log service
 *
 * @export
 * @class LeaveAdjustmentDbLogService
 * @extends {BaseDBService}
 * @implements {IDbService}
 */
@Injectable()
export class LeaveAdjustmentDbLogService extends BaseDBService implements IDbService {
  /**
   *Creates an instance of LeaveAdjustmentDbLogService.
   * @param {HttpService} httpService http service
   * @param {QueryParserService} queryService query service
   * @memberof LeaveAdjustmentDbLogService
   */
  constructor(
    public readonly httpService: HttpService,
    public readonly queryService: QueryParserService) {

    super(httpService, queryService, "l_leave_adjustment_log");
  }

  /**
   * Setup data for leave adjustment log
   *
   * @param {[Resource, string, string, string, string, string, string]} [resource, userId, leavetypeId, adjustment, remarks, creatorUserId, tenantId]
   * @returns
   * @memberof LeaveAdjustmentDbLogService
   */
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

  /**
   * Create data log for leave adjustment
   *
   * @param {[Resource]} [resource]
   * @returns
   * @memberof LeaveAdjustmentDbLogService
   */
  create([resource]: [Resource]) {
    return this.createByModel(resource, [], [], []);
  }

}