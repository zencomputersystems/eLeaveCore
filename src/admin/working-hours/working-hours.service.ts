import { Injectable } from '@nestjs/common';
import { AssignerDataService } from 'src/common/helper/assigner-data.service';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { WorkingHoursDbService } from './db/working-hours.db.service';
import { map } from 'rxjs/operators';
import { WorkingHoursListDTO } from './dto/working-hours-list.dto';
import { WorkingHoursDTO } from './dto/working-hours.dto';
import { v1 } from 'uuid';
import { Resource } from 'src/common/model/resource.model';
import { CreateWorkingHoursModel } from './model/create-working-hours.model';
import { UpdateWorkingHoursDTO } from './dto/update-working-hours.dto';
import { UpdateWorkingHoursModel } from './model/update-working-hours.model';
import { UpdateUserWorkingHoursDTO } from './dto/update-userworkinghours.dto';
import { UpdateUserWorkingHoursModel } from './model/update-userworkinghours.model';
import { Observable } from 'rxjs';
/** XMLparser from zen library  */
var { convertXMLToJson, convertJsonToXML } = require('@zencloudservices/xmlparser');

/**
 * Service for working hours
 *
 * @export
 * @class WorkingHoursService
 */
@Injectable()
export class WorkingHoursService {
  /**
   *Creates an instance of WorkingHoursService.
   * @param {WorkingHoursDbService} workingHoursDbService working hours service
   * @param {AssignerDataService} assignerDataService assigner data service
   * @param {UserInfoDbService} userinfoDbService user info db service
   * @memberof WorkingHoursService
   */
  constructor(
    private readonly workingHoursDbService: WorkingHoursDbService,
    private readonly assignerDataService: AssignerDataService,
    private readonly userinfoDbService: UserInfoDbService
  ) { }

  /**
   * Get list of working hours profile
   *
   * @returns
   * @memberof WorkingHoursService
   */
  public findWorkingHoursProfile() {
    return this.workingHoursDbService.findAllWorkingHoursProfile().pipe(map(res => {
      if (res.status == 200) { return this.assignerDataService.assignArrayData(res.data.resource, WorkingHoursListDTO); }
    }))
  }

  /**
   * Get employee working hours attach
   *
   * @param {string} workingHoursId
   * @param {string} tenant_guid
   * @returns {Observable<any>}
   * @memberof WorkingHoursService
   */
  public getEmployeeWorkingHoursAttach(workingHoursId: string, tenant_guid: string): Observable<any> {
    const filters = ['(WORKING_HOURS_GUID=' + workingHoursId + ')', 'AND (TENANT_GUID=' + tenant_guid + ')'];
    return this.userinfoDbService.findEmployeeAttach(filters);
  }

  /**
   * Get one working hours details
   *
   * @param {string} workingHoursId
   * @returns
   * @memberof WorkingHoursService
   */
  public getWorkingHoursDetail(workingHoursId: string) {
    return this.workingHoursDbService.findAll(workingHoursId).pipe(map(res => {
      return convertXMLToJson(res.data.resource[0].PROPERTIES_XML);
    }))
  }

  /**
   * Create new working hours profile
   *
   * @param {*} user
   * @param {WorkingHoursDTO} data
   * @returns
   * @memberof WorkingHoursService
   */
  create(user: any, data: WorkingHoursDTO) {

    const resource = new Resource(new Array);
    const modelData = new CreateWorkingHoursModel();

    modelData.CODE = data.code;
    modelData.WORKING_HOURS_GUID = v1();
    modelData.CREATION_TS = new Date().toISOString();
    modelData.CREATION_USER_GUID = user.USER_GUID;
    modelData.PROPERTIES_XML = convertJsonToXML(data);
    modelData.UPDATE_TS = null;
    modelData.UPDATE_USER_GUID = null;
    modelData.DESCRIPTION = data.description;

    resource.resource.push(modelData);

    return this.workingHoursDbService.createByModel(resource, [], [], []);
  }

  /**
   * Update existing working hours profile
   *
   * @param {*} user
   * @param {UpdateWorkingHoursDTO} d
   * @returns
   * @memberof WorkingHoursService
   */
  updateWorkingHours(user: any, d: UpdateWorkingHoursDTO) {
    const resource = new Resource(new Array);
    const data = new UpdateWorkingHoursModel();

    data.PROPERTIES_XML = convertJsonToXML(d.data);
    data.CODE = d.data.code;
    data.UPDATE_TS = new Date().toISOString();
    data.UPDATE_USER_GUID = user.USER_GUID;
    data.DESCRIPTION = d.data.description;

    resource.resource.push(data);

    return this.workingHoursDbService.updateByModel(resource, [], ['(WORKING_HOURS_GUID=' + d.working_hours_guid + ')'], ['WORKING_HOURS_GUID', 'CODE', 'PROPERTIES_XML']);
  }

  /**
   * Update working hours to employee
   *
   * @param {*} user
   * @param {UpdateUserWorkingHoursDTO} d
   * @returns
   * @memberof WorkingHoursService
   */
  updateToEmployee(user: any, d: UpdateUserWorkingHoursDTO) {
    const resource = new Resource(new Array);
    const data = new UpdateUserWorkingHoursModel;

    data.WORKING_HOURS_GUID = d.working_hours_guid;
    data.UPDATE_TS = new Date().toISOString();
    data.UPDATE_USER_GUID = user.USER_GUID;

    let userList = this.assignerDataService.setBundleUserGuid(d);

    resource.resource.push(data);

    return this.userinfoDbService.updateByModel(resource, [], ['(USER_GUID IN (' + userList + '))'], []);
  }

  /**
   * Function delete working hours if no user attach
   *
   * @param {*} user
   * @param {string} working_hours_guid
   * @returns
   * @memberof WorkingHoursService
   */
  deleteWorkingHours(user: any, working_hours_guid: string) {
    const filters = ['(WORKING_HOURS_GUID=' + working_hours_guid + ')'];
    return this.userinfoDbService.findEmployeeAndDelete(filters, this.deleteProcessWorkingHours(user, working_hours_guid));
  }

  /**
   * Delete working hours profile
   *
   * @param {*} user
   * @param {string} workingHoursId
   * @returns
   * @memberof WorkingHoursService
   */
  deleteProcessWorkingHours(user: any, workingHoursId: string) {
    const resource = new Resource(new Array);
    const data = new UpdateWorkingHoursModel();

    data.UPDATE_TS = new Date().toISOString();
    data.UPDATE_USER_GUID = user.USER_GUID;
    data.DELETED_AT = new Date().toISOString();

    resource.resource.push(data);

    return this.workingHoursDbService.updateByModel(resource, [], ['(WORKING_HOURS_GUID=' + workingHoursId + ')'], ['WORKING_HOURS_GUID', 'CODE']);
  }

}