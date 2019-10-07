import { Injectable } from '@nestjs/common';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { AssignerDataService } from 'src/common/helper/assigner-data.service';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { WorkingHoursDbService } from './db/working-hours.db.service';
import { map, mergeMap } from 'rxjs/operators';
import { WorkingHoursListDTO } from './dto/working-hours-list.dto';
import { WorkingHoursDTO } from './dto/working-hours.dto';
import { v1 } from 'uuid';
import { Resource } from 'src/common/model/resource.model';
import { CreateWorkingHoursModel } from './model/create-working-hours.model';
import { UpdateWorkingHoursDTO } from './dto/update-working-hours.dto';
import { UpdateWorkingHoursModel } from './model/update-working-hours.model';
import { UpdateUserWorkingHoursDTO } from './dto/update-userworkinghours.dto';
import { UpdateUserWorkingHoursModel } from './model/update-userworkinghours.model';
import { of } from 'rxjs';

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
   * @param {XMLParserService} xmlParserService xml parser service
   * @param {WorkingHoursDbService} workingHoursDbService working hours service
   * @param {AssignerDataService} assignerDataService assigner data service
   * @param {UserInfoDbService} userinfoDbService user info db service
   * @memberof WorkingHoursService
   */
  constructor(
    private readonly xmlParserService: XMLParserService,
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
    return this.workingHoursDbService.findAllWorkingHoursProfile()
      .pipe(map(res => {
        if (res.status == 200) {
          let result = this.assignerDataService.assignArrayData(res.data.resource, WorkingHoursListDTO);
          return result;
        }
      })
      )
  }

  /**
   * Get employee working hours attach
   *
   * @param {string} workingHoursId
   * @returns
   * @memberof WorkingHoursService
   */
  public getEmployeeWorkingHoursAttach(workingHoursId: string) {
    // const filters = ['(WORKING_HOURS_GUID=' + workingHoursId + ')'];
    const filters = ['(WORKING_HOURS_GUID=' + workingHoursId + ')'];
    return this.userinfoDbService.findEmployeeAssign(filters)
      .pipe(map(res => {
        if (res.status == 200) {
          // let jsonHoliday = this.xmlParserService.convertXMLToJson(res.data.resource[0].PROPERTIES_XML);
          // return jsonHoliday;
          return res.data.resource;
        }
      }))
  }

  /**
   * Get one working hours details
   *
   * @param {string} workingHoursId
   * @returns
   * @memberof WorkingHoursService
   */
  public getWorkingHoursDetail(workingHoursId: string) {
    return this.workingHoursDbService.findAll(workingHoursId)
      .pipe(map(res => {
        if (res.status == 200) { return this.xmlParserService.convertXMLToJson(res.data.resource[0].PROPERTIES_XML); }
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
    // let tempData = this.xmlParserService.convertJsonToXML(data);
    // console.log(tempData);

    const resource = new Resource(new Array);
    const modelData = new CreateWorkingHoursModel();

    modelData.CODE = data.code;
    modelData.WORKING_HOURS_GUID = v1();
    modelData.CREATION_TS = new Date().toISOString();
    modelData.CREATION_USER_GUID = user.USER_GUID;
    modelData.PROPERTIES_XML = this.xmlParserService.convertJsonToXML(data);
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

    data.PROPERTIES_XML = this.xmlParserService.convertJsonToXML(d.data);
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
    // let userList = '';
    // for (let i = 0; i < d.user_guid.length; i++) {
    //   if (userList == '') {
    //     userList = '"' + d.user_guid[i] + '"';
    //   } else {
    //     userList = userList + ',"' + d.user_guid[i] + '"';
    //   }
    // }

    let userList = this.assignerDataService.setBundleUserGuid(d);

    resource.resource.push(data);

    return this.userinfoDbService.updateByModel(resource, [], ['(USER_GUID IN (' + userList + '))'], []);
  }

  /**
   * Function delete working hours
   *
   * @param {*} user
   * @param {string} working_hours_guid
   * @returns
   * @memberof WorkingHoursService
   */
  deleteWorkingHours(user: any, working_hours_guid: string) {
    const filters = ['(WORKING_HOURS_GUID=' + working_hours_guid + ')'];
    return this.userinfoDbService.findEmployeeAssign(filters).pipe(
      mergeMap(res => {
        if (res.data.resource.length > 0) {
          // will return user attach to this working hours profile
          return of(res);
        } else {
          // will show deleted working hours
          let deletedData = this.deleteProcessWorkingHours(user, working_hours_guid);
          return deletedData;
        }
      }),
    );
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