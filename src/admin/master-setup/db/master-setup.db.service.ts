import { HttpService, Injectable } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

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
   * @memberof MasterSetupDbService
   */
  constructor(
    public httpService: HttpService,
    public queryService: QueryParserService,
    public commonFunctionService: CommonFunctionService
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

}