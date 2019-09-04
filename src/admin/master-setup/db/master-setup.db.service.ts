import { HttpService, Injectable } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { MasterSetupDTO } from '../dto/master-setup.dto';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Resource } from 'src/common/model/resource.model';
import { UserInfoModel } from '../../user-info/model/user-info.model';
import { UserInfoDbService } from 'src/admin/holiday/db/user-info.db.service';

/**
 * Service for master setup database
 *
 * @export
 * @class MasterSetupDbService
 */
@Injectable()
export class MasterSetupDbService {

  /**
   *Creates an instance of MasterSetupDbService.
   * @param {HttpService} httpService http service
   * @param {QueryParserService} queryService query service
   * @param {CommonFunctionService} commonFunctionService common function service
   * @param {UserInfoDbService} userinfoDbService user info db service
   * @memberof MasterSetupDbService
   */
  constructor(
    public httpService: HttpService,
    public queryService: QueryParserService,
    public commonFunctionService: CommonFunctionService,
    public userinfoDbService: UserInfoDbService
  ) { }

  /**
   * Function get all data
   *
   * @param {*} [fields, TENANT_GUID, tableName]
   * @returns
   * @memberof MasterSetupDbService
   */
  public findAllList([fields, TENANT_GUID, tableName]) {
    return this.commonFunctionService.findAllList([fields, TENANT_GUID, this.queryService, this.httpService, tableName]);
  }

  /**
   * Update user info for all occurance
   *
   * @param {[MasterSetupDTO, string, string]} [data, TENANT_GUID, fields]
   * @returns {Observable<any>}
   * @memberof MasterSetupDbService
   */
  public updateMasterList([data, user, fields]: [MasterSetupDTO, any, string]): Observable<any> {

    let tenantId = user.TENANT_GUID;
    // build url for dreamfactory
    const url = this.queryService.generateDbQueryV3(['user_info', ['USER_INFO_GUID', 'FULLNAME'], ['(' + fields + '=' + data.oldName + ') AND (TENANT_GUID=' + tenantId + ')'], null, null]);

    // console.log(url);

    // run url by dreamfactory
    let result = this.httpService.get(url)
      .pipe(
        map(res => {
          if (res.status == 200) {
            return res.data.resource;
          }
        })
      )

    // process data
    let resUpdate = result.pipe(
      map(res => {

        let userinfoGuidAll = '';
        let resultProcess;
        res.forEach(element => {
          userinfoGuidAll = userinfoGuidAll == '' ? '"' + element.USER_INFO_GUID + '"' : userinfoGuidAll + ',"' + element.USER_INFO_GUID + '"';
        });

        if (userinfoGuidAll != '')
          resultProcess = this.update(user, userinfoGuidAll, fields, data.newName).subscribe(
            data => {
              return data;
            }, err => {
              return err;
            }
          );
        else
          res = 'No data "' + data.oldName + '" for ' + fields;

        // return resultProcess;
        return res;
      })
    )

    return resUpdate;

  }


  /**
   * update method
   *
   * @param {*} user
   * @param {string} userGuidAll
   * @param {string} fields
   * @param {string} newName
   * @returns
   * @memberof MasterSetupDbService
   */
  update(user: any, userGuidAll: string, fields: string, newName: string) {

    const resource = new Resource(new Array);
    const data = new UserInfoModel;

    data.UPDATE_TS = new Date().toISOString();
    data.UPDATE_USER_GUID = user.USER_GUID;
    data[fields] = newName;

    resource.resource.push(data);

    // console.log(userGuidAll);

    // console.log(resource);

    const filters = ['(USER_INFO_GUID IN (' + userGuidAll + '))'];
    // console.log(filters);
    // return resource;
    // return this.updateByModel(resource, [], [], []);
    return this.userinfoDbService.updateByModel(resource, [], filters, []);
  }


}