import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Resource } from 'src/common/model/resource.model';
import { UserInfoModel } from '../../user-info/model/user-info.model';
import { DisableUserDTO } from '../../user/dto/disable-user.dto';
import { of, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { UserService } from 'src/admin/user/user.service';
import { UserModel } from 'src/admin/user/model/user.model';
import { UpdateUserInfoItemDTO } from 'src/admin/user-info-details/dto/update-user-info-details.dto';

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
     * @param {[any, string, Date]} [user,user_guid,date]
     * @returns
     * @memberof UserInfoDbService
     */
    public setResignUser([user, user_guid, date]: [any, string, Date]) {
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

    /**
     * Set user info
     *
     * @param {[string, string, any, UpdateUserInfoItemDTO]} [d, user_info_guid, user, res]
     * @returns
     * @memberof UserInfoDbService
     */
    public setUserInfo([d, user_info_guid, user, res]: [string, string, any, UpdateUserInfoItemDTO]) {
        const resource = new Resource(new Array);
        const data = new UserInfoModel;

        const employmentData = res.root.employmentDetail;
        const personalData = res.root.personalDetails;

        data.DEPARTMENT = employmentData.department;
        data.DESIGNATION = employmentData.designation;
        data.SECTION = employmentData.section;
        data.COSTCENTRE = employmentData.costcentre;
        data.EMPLOYEE_STATUS = employmentData.employmentStatus;
        data.EMPLOYEE_TYPE = employmentData.employmentType;
        data.MANAGER_USER_GUID = employmentData.reportingTo;
        data.JOIN_DATE = new Date(employmentData.dateOfJoin);
        data.CONFIRMATION_DATE = new Date(employmentData.dateOfConfirmation);
        data.RESIGNATION_DATE = new Date(employmentData.dateOfResignation);

        data.FULLNAME = personalData.fullname;
        data.NICKNAME = personalData.nickname;
        data.PERSONAL_ID = personalData.nric;
        data.DOB = personalData.dob;



        data.PROPERTIES_XML = d;
        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;

        resource.resource.push(data);

        return this.updateByModel(resource, [], ['(USER_INFO_GUID=' + user_info_guid + ')'], ['PROPERTIES_XML']);
    }

    /**
     * Find employee attach
     *
     * @param {string[]} filters
     * @returns {Observable<any>}
     * @memberof UserInfoDbService
     */
    public findEmployeeAttach(filters: string[]): Observable<any> {
        return this.findEmployeeAssign(filters)
            .pipe(map(res => {
                if (res.status == 200) {
                    return res.data.resource;
                }
            }))
    }

    /**
     * Find employee and delete
     *
     * @param {string[]} filters
     * @param {*} method
     * @returns {Observable<any>}
     * @memberof UserInfoDbService
     */
    public findEmployeeAndDelete(filters: string[], method): Observable<any> {
        return this.findEmployeeAssign(filters).pipe(
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
     * Find list employee assign to calendar
     *
     * @param {string} calendarProfileId
     * @returns {Observable<any>}
     * @memberof UserInfoDbService
     */
    public findEmployeeAssign(filters: string[]): Observable<any> {

        const fields = ['USER_GUID', 'FULLNAME', 'PERSONAL_ID_TYPE'];
        // const filters = ['(CALENDAR_GUID=' + calendarProfileId + ')'];

        const url = this.queryService.generateDbQueryV3([this._tableName, fields, filters, null, null]);
        //call DF to validate the user
        return this.httpService.get(url);

    }

    /**
     * Find user info
     *
     * @param {string[]} filters
     * @returns {Observable<any>}
     * @memberof UserInfoDbService
     */
    public findUserInfo(filters: string[]): Observable<any> {
        const fields = ['PROPERTIES_XML'];
        const url = this.queryService.generateDbQueryV3([this._tableName, fields, filters, null, null]);

        return this.httpService.get(url);
    }

    /**
     * Find fullname
     *
     * @param {string} userGuid
     * @returns {Observable<any>}
     * @memberof UserInfoDbService
     */
    public findFullname(userGuid: string): Observable<any> {

        const fields = ['USER_GUID', 'FULLNAME'];
        const filters = ['(USER_GUID IN (' + userGuid + '))'];

        const url = this.queryService.generateDbQueryV3([this._tableName, fields, filters, 'CREATION_TS DESC', 1]);
        return this.httpService.get(url);

    }

    /**
     * Get date of birth
     *
     * @param {string} userId
     * @param {string} tenantId
     * @returns {Observable<any>}
     * @memberof UserInfoDbService
     */
    public getDateOfBirth(userId: string, tenantId: string): Observable<any> {

        const fields = ['DOB'];
        const filters = ['(USER_GUID=' + userId + ')', 'AND (TENANT_GUID=' + tenantId + ')'];

        const url = this.queryService.generateDbQueryV3([this._tableName, fields, filters, 'CREATION_TS DESC', 1]);
        //call DF to validate the user
        return this.httpService.get(url);

    }

    /**
     * Get calendar profile
     *
     * @param {string} userGuid
     * @returns
     * @memberof UserInfoDbService
     */
    public getCalendarProfile(userGuid: string) {
        let fields = ['CALENDAR_GUID'];
        let filters = ['(USER_GUID=' + userGuid + ')'];
        return this.findByFilterV2(fields, filters);
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

    /**
     * Find my downline
     *
     * @param {string} userGuid
     * @returns
     * @memberof UserInfoDbService
     */
    public findMyDownline(userGuid: string) {
        let fields = ['USER_GUID'];
        let filters = ['(MANAGER_USER_GUID=' + userGuid + ')', '(RESIGNATION_DATE IS NULL)'];
        return this.findByFilterV2(fields, filters);
    }

}