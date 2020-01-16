import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';
import { HttpService, Injectable } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

/**
 * DB Service for user profile
 *
 * @export
 * @class UserprofileDbService
 * @extends {BaseDBService}
 */
@Injectable()
export class UserprofileDbService extends BaseDBService {

    /**
     * Declare table view profile list
     *
     * @private
     * @memberof UserprofileDbService
     */
    private _tableName = "l_view_user_profile_list";

    /**
     *Creates an instance of UserprofileDbService.
     * @param {HttpService} httpService Service for http
     * @param {QueryParserService} queryService Service for query
     * @memberof UserprofileDbService
     */
    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService) {

        super(httpService, queryService, "l_view_user_profile_list");
    }

    /**
     * Find employee and delete if no one attached
     *
     * @param {[string[], any]} [filters, method]
     * @returns {Observable<any>}
     * @memberof UserprofileDbService
     */
    public findEmployeeAndDelete([filters, method]: [string[], any]): Observable<any> {
        return this.findEmployeeAssign([filters]).pipe(
            mergeMap(res => {
                if (res.data.resource.length > 0) {
                    // will return user attach to this profile
                    return of(res);
                } else {
                    // will show deleted profile
                    let deletedData = method;
                    return deletedData;
                }
            }),
        );
    }

    /**
     * Returns data user attach
     *
     * @param {[string[]]} [filters]
     * @returns {Observable<any>}
     * @memberof UserprofileDbService
     */
    public findEmployeeAssign([filters]: [string[]]): Observable<any> {

        const fields = ['USER_GUID', 'FULLNAME', 'PERSONAL_ID_TYPE'];

        const url = this.queryService.generateDbQueryV3([this._tableName, fields, filters, null, null]);
        //call DF to validate the user
        return this.httpService.get(url);

    }
}