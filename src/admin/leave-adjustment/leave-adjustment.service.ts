import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { LeaveAdjustmentDTO } from './dto/update-leave-adjustment.dto';
import { map, mergeMap } from 'rxjs/operators';
import { UserLeaveEntitlementDbService } from 'src/api/userprofile/db/user-leave-entitlement.db.service';
import { UserLeaveEntitlementModel } from 'src/api/userprofile/model/user-leave-entitlement.model';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import moment = require('moment');

/**
 * Service leave adjustment
 *
 * @export
 * @class LeaveAdjustmentService
 */
@Injectable()
export class LeaveAdjustmentService {

  /**
   *Creates an instance of LeaveAdjustmentService.
   * @param {UserLeaveEntitlementDbService} userLeaveEntitlementDbService Db service for user leave entitlement
   * @memberof LeaveAdjustmentService
   */
  constructor(private readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService) { }
  /**
   * Create new entry on l_main_user_leave_entitlement parent flag 0 and days added with range
   *
   * @param {*} user
   * @param {LeaveAdjustmentDTO} leaveAdjustmentDTO
   * @returns {Observable<any>}
   * @memberof LeaveAdjustmentService
   */
  public adjustLeave(user: any, leaveAdjustmentDTO: LeaveAdjustmentDTO): Observable<any> {

    const userFilter = ['(USER_GUID IN (' + leaveAdjustmentDTO.userId + '))', '(TENANT_GUID=' + user.TENANT_GUID + ')', '(LEAVE_TYPE_GUID=' + leaveAdjustmentDTO.leaveTypeId + ')', '(PARENT_FLAG=1)'];
    const fields = [];

    return this.userLeaveEntitlementDbService.findByFilterV2(fields, userFilter).pipe(
      map(res => {
        let successList = [];
        let failedList = [];

        let resource = new Resource(new Array);

        resource = this.setupData([leaveAdjustmentDTO, res, successList, failedList, resource, user]);

        this.runServiceCreateData(resource);

        let data = resource.resource;
        return { data, successList, failedList };
      })
    )
  }

  /**
   * Setup data to create new entry for leave adjustment
   *
   * @param {*} leaveAdjustmentDTO
   * @param {*} res
   * @param {*} successList
   * @param {*} failedList
   * @param {*} resource
   * @param {*} user
   * @returns
   * @memberof LeaveAdjustmentService
   */
  public setupData(data) {
    let leaveAdjustmentDTO = data[0];
    let res = data[1];
    let successList = data[2];
    let failedList = data[3];
    let resource = data[4];
    let user = data[5];
    leaveAdjustmentDTO.userId.forEach(element => {
      let leave: UserLeaveEntitlementModel = res.find(x => x.USER_GUID.toString() === element.toString());
      if (leave) {
        successList.push(element);
        let dataAssign = this.createLeaveAdjustment(user, leave, leaveAdjustmentDTO);
        resource.resource.push(dataAssign);
      } else {
        failedList.push(element);
      }
    });

    return resource;
  }

  /**
   * Run service for leave adjustment
   *
   * @param {Resource} resource
   * @memberof LeaveAdjustmentService
   */
  public runServiceCreateData(resource: Resource) {
    this.userLeaveEntitlementDbService.createByModel(resource, [], [], [])
      .pipe(map(res => {
        if (res.status == 200) {
          return res.data.resource;
        } else {
          throw new InternalServerErrorException('Failed to create leave adjustment');
        }
      })).subscribe(data => {
        return data;
      }, err => {
        return err;
      });
  }

  /**
   * Assign data to column user leave entitlement
   *
   * @param {*} user
   * @param {UserLeaveEntitlementModel} data
   * @param {LeaveAdjustmentDTO} updateData
   * @returns
   * @memberof LeaveAdjustmentService
   */
  public createLeaveAdjustment(user: any, data: UserLeaveEntitlementModel, updateData: LeaveAdjustmentDTO) {
    const {
      LEAVE_TYPE_GUID,
      ENTITLEMENT_GUID,
      USER_GUID,
      PROPERTIES_XML
    } = data;

    // assign new policy to user
    const entitlementModel = new UserLeaveEntitlementModel();
    entitlementModel.USER_LEAVE_ENTITLEMENT_GUID = v1();
    entitlementModel.LEAVE_TYPE_GUID = LEAVE_TYPE_GUID;
    entitlementModel.ENTITLEMENT_GUID = ENTITLEMENT_GUID;
    entitlementModel.USER_GUID = USER_GUID;

    entitlementModel.PARENT_FLAG = 0;
    entitlementModel.CF_FLAG = 0;
    entitlementModel.PROPERTIES_XML = PROPERTIES_XML;
    entitlementModel.YEAR = moment().year();
    entitlementModel.REMARKS = updateData.reason;
    entitlementModel.ACTIVE_FLAG = 1;

    entitlementModel.TENANT_GUID = user.TENANT_GUID;
    entitlementModel.CREATION_USER_GUID = user.USER_GUID;

    entitlementModel.DAYS_ADDED = updateData.noOfDays;

    return entitlementModel;
  }

}