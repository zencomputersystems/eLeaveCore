import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Resource } from 'src/common/model/resource.model';
import { UserInfoModel } from '../../user-info/model/user-info.model';
import { DisableUserDTO } from '../../user/dto/disable-user.dto';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/admin/user/user.service';
import { UserModel } from 'src/admin/user/model/user.model';

/**
 * DB Service for user info to update calendar
 *
 * @export
 * @class UserInfoDbService
 * @extends {BaseDBService}
 */
@Injectable()
export class UserInfoDbService extends BaseDBService {
    /**
     * Declare tablename user info
     *
     * @private
     * @memberof UserInfoDbService
     */
    private _tableName = "user_info";

    /**
     *Creates an instance of UserInfoDbService.
     * @param {HttpService} httpService Service for http
     * @param {QueryParserService} queryService Service for query
     * @memberof UserInfoDbService
     */
    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService) {
        super(httpService, queryService, "user_info");
    }

    /**
     * Set date resign to user
     *
     * @param {*} user
     * @param {string} user_guid
     * @returns
     * @memberof UserInfoDbService
     */
    public setResignUser(user: any, user_guid: string, date: Date) {
        // do a checking first to determine this data belong to user

        const resource = new Resource(new Array);
        const data = new UserInfoModel;

        if (date == null) {
            data.RESIGNATION_DATE = new Date();
        } else {
            data.RESIGNATION_DATE = date;
        }
        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;

        resource.resource.push(data);

        return this.updateByModel(resource, [], ['(USER_GUID=' + user_guid + ')'], ['USER_GUID', 'FULLNAME']);
    }

    // public disableUserProcess(user, d) {
    //     const resource = new Resource(new Array);
    //     const data = new UserInfoModel;

    //     data.RESIGNATION_DATE = d.resign_date;
    //     data.UPDATE_TS = new Date().toISOString();
    //     data.UPDATE_USER_GUID = user.USER_GUID;

    //     resource.resource.push(data);

    //     return this.updateByModel(resource, [], ['(USER_GUID=' + d.user_guid + ')'], ['USER_GUID', 'FULLNAME']);
    // }

}