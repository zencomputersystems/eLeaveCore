import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { ACCESSLEVEL } from 'src/constant/accesslevel';
import { switchMap, map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Injectable } from '@nestjs/common';

/**
 * Service for access level validate
 *
 * @export
 * @class AccessLevelValidateService
 */
@Injectable()
export class AccessLevelValidateService {
    /**
     *Creates an instance of AccessLevelValidateService.
     * @param {UserInfoService} userInfoService Service for user info
     * @memberof AccessLevelValidateService
     */
    constructor(private readonly userInfoService: UserInfoService) { }

    // get the requestor permission level
    // return filter with the id of that level
    /**
     * get the requestor permission level
     * return filter with the id of that level
     *
     * @param {string} accessLevel
     * @param {string[]} filters
     * @param {string} tenantId
     * @returns
     * @memberof AccessLevelValidateService
     */
    public validateAccessLevel(accessLevel: string, filters: string[], tenantId: string) {

        const filter = ['(TENANT_GUID=' + tenantId + ')'];

        filters.forEach(element => {
            if ((element && element != '') && element != 'TENANT_GUID') {
                filter.push(element);
            }
        });

        // find the field name to be filtered
        const filterLevel = ACCESSLEVEL[accessLevel.toUpperCase()];

        return this.userInfoService.findByFilterV2(filterLevel, filter)
            .pipe(
                switchMap(res => {
                    if (res) {

                        const buildFilter = new Array<string>();

                        filterLevel.forEach(element => {
                            // console.log(element+' - '+res[0][element]);
                            buildFilter.push('(' + element + '=' + res[0][element] + ')');
                        });

                        return of(buildFilter.join('AND'));
                    } else {
                        return throwError('Fail to Load Permission');
                    }
                })
            )

    }

    //validate user access level before return data
    /**
     * validate user access level before return data
     *
     * @param {string} tenantId
     * @param {string} requestor_userId
     * @param {string} accessLevel
     * @param {string[]} filterList
     * @returns
     * @memberof AccessLevelValidateService
     */
    public generateFilterWithChecking(tenantId: string, requestor_userId: string, accessLevel: string, filterList: string[]) {

        return this.validateAccessLevel(accessLevel, ['(USER_GUID=' + requestor_userId + ')'], tenantId)
            .pipe(
                map(filterResult => {
                    const filters = ['(TENANT_GUID=' + tenantId + ')'];

                    filterList.forEach(element => {
                        if (element && element != '') {
                            filters.push(element);
                        }
                    });

                    if (filterResult && filterResult != '') {
                        filters.push(filterResult);
                    }

                    return filters;
                })
            )

    }

}