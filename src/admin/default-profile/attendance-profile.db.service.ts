import { HttpService, Injectable } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';

@Injectable()
export class AttendanceProfileDbService extends BaseDBService {

  /**
   * Declare tablename
   *
   * @private
   * @memberof AttendanceProfileDbService
   */
  private _tableName = "a_attendance_profile";

  /**
   *Creates an instance of AttendanceProfileDbService.
   * @param {HttpService} httpService http service
   * @param {QueryParserService} queryService query service
   * @memberof AttendanceProfileDbService
   */
  constructor(
    public readonly httpService: HttpService,
    public readonly queryService: QueryParserService) {
    super(httpService, queryService, "a_attendance_profile");
  }
}