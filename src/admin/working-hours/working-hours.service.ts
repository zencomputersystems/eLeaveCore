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
import { UserprofileDbService } from 'src/api/userprofile/db/userprofile.db.service';
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
   * @param {UserprofileDbService} userprofileDbService user profile db service
   * @memberof WorkingHoursService
   */
  constructor(
    private readonly workingHoursDbService: WorkingHoursDbService,
    private readonly assignerDataService: AssignerDataService,
    private readonly userinfoDbService: UserInfoDbService,
    private readonly userprofileDbService: UserprofileDbService
  ) { }

  /**
   * Get list of working hours profile
   *
   * @returns
   * @memberof WorkingHoursService
   */
  public findWorkingHoursProfile(user) {
    let url = this.workingHoursDbService.queryService.generateDbQueryV2('l_view_working_hours_profile', ['WORKING_HOURS_GUID', 'CODE', 'DESCRIPTION', 'PROPERTIES_XML', 'TOTAL_EMPLOYEE_ATTACH'], ['(TENANT_GUID=' + user.TENANT_GUID + ')'], []);
    return this.assignerDataService.processProfile([url, this.workingHoursDbService, WorkingHoursListDTO]);
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
    const filters = ['(WORKING_HOURS_GUID=' + workingHoursId + ')', 'AND (TENANT_GUID=' + tenant_guid + ')', 'AND (DELETED_AT IS NULL)'];
    const fields = ['USER_GUID', 'FULLNAME', 'PERSONAL_ID_TYPE'];
    const url = this.workingHoursDbService.queryService.generateDbQueryV3(['l_view_user_profile_list', fields, filters, null, null]);
    return this.assignerDataService.processProfile([url, this.workingHoursDbService, WorkingHoursListDTO]);
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
    modelData.TENANT_GUID = user.TENANT_GUID;
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
    const filters = ['(WORKING_HOURS_GUID=' + working_hours_guid + ')', 'AND (TENANT_GUID=' + user.TENANT_GUID + ')', 'AND (DELETED_AT IS NULL)'];
    return this.userprofileDbService.findEmployeeAndDelete([filters, this.deleteProcessWorkingHours(user, working_hours_guid)]);
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