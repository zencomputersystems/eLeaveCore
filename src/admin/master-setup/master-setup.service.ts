import { Injectable } from '@nestjs/common';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { MasterSetupDbService } from './db/master-setup.db.service';
import { MasterSetupDTO } from './dto/master-setup.dto';
import { of, Observable } from 'rxjs';

/**
 * Service for master setup
 *
 * @export
 * @class MasterSetupService
 */
@Injectable()
export class MasterSetupService {

  /**
   *Creates an instance of MasterSetupService.
   * @param {CommonFunctionService} commonFunctionService
   * @param {MasterSetupDbService} masterSetupDbService
   * @memberof MasterSetupService
   */
  constructor(
    private readonly commonFunctionService: CommonFunctionService,
    private readonly masterSetupDbService: MasterSetupDbService
  ) { }

  /**
   * get item function
   *
   * @param {string} item
   * @param {*} user
   * @returns
   * @memberof MasterSetupService
   */
  public runGetItem(item: string, user: any) {

    let tenantId = user.TENANT_GUID;
    let result = null;

    if (item == 'department') {
      result = this.getAllLists([this.masterSetupDbService, tenantId, ['DEPARTMENT'], 'view_departments']);
    }
    if (item == 'designation') {
      result = this.getAllLists([this.masterSetupDbService, tenantId, ['DESIGNATION'], 'view_designations']);
    }
    if (item == 'section') {
      result = this.getAllLists([this.masterSetupDbService, tenantId, ['SECTION'], 'view_section']);
    }
    if (item == 'branch') {
      result = this.getAllLists([this.masterSetupDbService, tenantId, ['BRANCH'], 'view_branches']);
    }
    if (item == 'bank') {
      result = this.getAllLists([this.masterSetupDbService, tenantId, ['BANK'], 'view_banks']);
    }
    if (item == 'costcentre') {
      result = this.getAllLists([this.masterSetupDbService, tenantId, ['COSTCENTRE'], 'view_costcentre']);
    }
    if (item == 'country') {
      result = this.getAllLists([this.masterSetupDbService, tenantId, ['COUNTRY'], 'view_country']);
    }
    if (item == 'employee_type') {
      result = this.getAllLists([this.masterSetupDbService, tenantId, ['EMPLOYEE_TYPE'], 'view_employee_types']);
    }
    if (item == 'employee_status') {
      result = this.getAllLists([this.masterSetupDbService, tenantId, ['EMPLOYEE_STATUS'], 'view_employee_status']);
    }

    return result;
  }

  /**
   * Get list by option selection
   *
   * @private
   * @param {*} [methodService, tenantId, field, table]
   * @returns
   * @memberof MasterSetupService
   */
  private getAllLists([methodService, tenantId, field, table]) {
    return this.commonFunctionService.getListData(methodService.findAllList([field, tenantId, table]));
  }

  /**
   * Master setup update function
   *
   * @param {[MasterSetupDTO, string, any]} [data, item, user]
   * @returns {Observable<any>}
   * @memberof MasterSetupService
   */
  public updateMasterItem([data, item, user]: [MasterSetupDTO, string, any]): Observable<any> {
    let tenantId = user.TENANT_GUID;
    let result = null;

    if (item == 'department') {
      result = this.updateLists([data, user, 'DEPARTMENT']);
    }
    if (item == 'designation') {
      result = this.updateLists([data, user, 'DESIGNATION']);
    }
    if (item == 'section') {
      result = this.updateLists([data, user, 'SECTION']);
    }
    if (item == 'branch') {
      result = this.updateLists([data, user, 'BRANCH']);
    }
    if (item == 'bank') {
      result = this.updateLists([data, user, 'BANK']);
    }
    if (item == 'costcentre') {
      result = this.updateLists([data, user, 'COSTCENTRE']);
    }
    if (item == 'country') {
      result = this.updateLists([data, user, 'COUNTRY']);
    }

    return result;
  }

  /**
   * Update list
   *
   * @private
   * @param {*} [data, user, field]
   * @returns {Observable<any>}
   * @memberof MasterSetupService
   */
  private updateLists([data, user, field]): Observable<any> {

    // return this.commonFunctionService.getListData(
    return this.masterSetupDbService.updateMasterList([data, user, field]);
    // );
  }

}