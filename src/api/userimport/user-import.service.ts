import { Injectable } from '@nestjs/common';
import { UserCsvDto } from './dto/csv/user-csv.dto';
import { v1 } from 'uuid';
import { UserImportResult } from './dto/user-import-result.dto';
import { UserService } from 'src/admin/user/user.service';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { map, mergeMap } from 'rxjs/operators';
import { UserModel } from 'src/admin/user/model/user.model';
import { of } from 'rxjs';
import { Resource } from 'src/common/model/resource.model';
import { UserInfoModel } from 'src/admin/user-info/model/user-info.model';
import { UserImport } from './dto/user-import';


/**
 * Service for user import
 *
 * @export
 * @class UserImportService
 */
@Injectable()
export class UserImportService {
    public branchData: any;
    public costCentreData: any;
    public sectionData: any;
    public departmentData: any;
    public importResult = new Array<UserImportResult>();

    /**
     *Creates an instance of UserImportService.
     * @param {UserService} userService
     * @param {UserInfoService} userInfoService
     * @memberof UserImportService
     */
    constructor(
        private readonly userService: UserService,
        private readonly userInfoService: UserInfoService
    ) { }

    /**
     * Proess the imported user data
     *
     * @param {*} user
     * @param {[UserCsvDto]} importData
     * @returns
     * @memberof UserImportService
     */
    public processImportData(user: any, importData: [UserCsvDto]) {


        //get all the the user for this tenant
        return this.userService.findByFilterV2([], ['(TENANT_GUID=' + user.TENANT_GUID + ')'])
            .pipe(
                map(res => {
                    const existingUsers: UserModel[] = res;
                    return existingUsers;
                }),
                map(res => this.filterData(importData, res, 'Existing User', 'EMAIL', 'STAFF_EMAIL')),
                map(res => this.filterDuplicateUser(res)),
                mergeMap(successUser => this.saveImportList(successUser, user)),
                mergeMap(successUser => this.saveInfoDataList(successUser, user))

            )
    }

    /**
     * Method save import list
     *
     * @private
     * @param {Array<UserCsvDto>} importData
     * @param {*} user
     * @returns
     * @memberof UserImportService
     */
    private saveImportList(importData: Array<UserCsvDto>, user: any) {

        if (importData.length == 0) {
            return of(importData);
        }
        const userResourceArray = new Resource(new Array);

        importData.forEach(element => {
            const userModel = new UserModel();

            userModel.USER_GUID = v1();
            userModel.ACTIVATION_FLAG = 0;
            userModel.CREATION_TS = new Date().toISOString();
            userModel.CREATION_USER_GUID = user.USER_GUID;
            userModel.TENANT_GUID = user.TENANT_GUID;
            userModel.IS_TENANT_ADMIN = "";
            userModel.LOGIN_ID = element.STAFF_EMAIL;
            userModel.EMAIL = element.STAFF_EMAIL;

            userResourceArray.resource.push(userModel);
        });

        return this.userService.createByModel(userResourceArray, [], [], ['EMAIL,USER_GUID'])
            .pipe(map(res => {
                if (res.status == 200) {
                    const saveUser = res.data.resource;
                    return this.filterData(importData, saveUser, 'Fail', 'EMAIL', 'STAFF_EMAIL')
                }
            }))

    }

    /**
     * Method save info data list
     *
     * @private
     * @param {Array<UserCsvDto>} importData
     * @param {*} user
     * @returns
     * @memberof UserImportService
     */
    private saveInfoDataList(importData: Array<UserCsvDto>, user: any) {
        if (importData.length == 0) {
            return of(this.importResult);
        }

        const userInfoResourceArray = new Resource(new Array);

        importData.forEach(element => {

            if (element.ID != null || element.ID != '') {
                const userInfoModel = new UserInfoModel();
                userInfoModel.USER_INFO_GUID = v1();
                userInfoModel.USER_GUID = element.ID;
                userInfoModel.TENANT_GUID = user.TENANT_GUID;
                userInfoModel.CREATION_USER_GUID = user.USER_GUID;
                userInfoModel.CREATION_TS = new Date().toISOString();

                userInfoModel.FULLNAME = element.FULLNAME;

                userInfoModel.DEPARTMENT = element.DEPARTMENT;
                userInfoModel.BRANCH = element.BRANCH;
                userInfoModel.DESIGNATION = element.DESIGNATION;

                userInfoModel.JOIN_DATE = new Date(element.JOIN_DATE);
                userInfoModel.CONFIRMATION_DATE = new Date(element.CONFIRMATION_DATE);
                userInfoModel.RESIGNATION_DATE = new Date(element.RESIGNATION_DATE);

                userInfoResourceArray.resource.push(userInfoModel);
            }

        })

        return this.userInfoService.createByModel(userInfoResourceArray, [], [], ['USER_INFO_GUID', 'USER_GUID'])
            .pipe(map(res => {
                if (res.status == 200) {
                    const saveUser = res.data.resource;

                    return this.filterSaveUserByID(saveUser, importData);
                }
            }))
    }

    /**
     * Method to filter data
     *
     * @private
     * @param {Array<UserCsvDto>} importData
     * @param {*} checkModelArray
     * @param {string} categoryName
     * @param {*} findElement
     * @param {*} findItem
     * @returns
     * @memberof UserImportService
     */
    private filterData(
        importData: Array<UserCsvDto>,
        checkModelArray: any,
        categoryName: string,
        findElement: any,
        findItem: any) {

        const data = new UserImportResult();
        data.category = categoryName;

        const successList = new Array<UserCsvDto>();

        // remove existing users from csv list
        importData.forEach(element => {

            if (checkModelArray.find(x => x[findElement].toUpperCase() === element[findItem].toUpperCase())) {
                data.data.push(new UserImport('', element.STAFF_EMAIL, element.STAFF_ID, element.FULLNAME));
            } else {
                successList.push(element);
            }

        });

        this.importResult.push(data);

        return successList;
    }

    /**
     * Method to filter duplicate user
     *
     * @private
     * @param {Array<UserCsvDto>} importData
     * @returns
     * @memberof UserImportService
     */
    private filterDuplicateUser(importData: Array<UserCsvDto>) {
        const duplicateUser = new UserImportResult();
        duplicateUser.category = "Duplicate";

        const successList = new Array<UserCsvDto>();

        // remove existing users from csv list
        importData.forEach(element => {

            if (successList.find(x => x.STAFF_EMAIL.toUpperCase() === element.STAFF_EMAIL.toUpperCase())) {
                duplicateUser.data.push(new UserImport('', element.STAFF_EMAIL, element.STAFF_ID, element.FULLNAME));
            } else {
                successList.push(element);
            }

        });

        this.importResult.push(duplicateUser);

        return successList;
    }

    /**
     * Method filter save user by id
     *
     * @private
     * @param {*} saveUser
     * @param {Array<UserCsvDto>} importData
     * @returns
     * @memberof UserImportService
     */
    private filterSaveUserByID(saveUser: any, importData: Array<UserCsvDto>) {
        const failUser = new UserImportResult();
        failUser.category = "Fail";

        const successUser = new UserImportResult();
        successUser.category = "Success";

        const successList = new Array<UserCsvDto>();

        // remove existing users from csv list
        importData.forEach(element => {

            const checkUser = saveUser.find(x => x.USER_GUID.toUpperCase() === element.ID.toUpperCase())
            if (checkUser) {
                element.ID = checkUser.USER_GUID;
                successList.push(element);
                successUser.data.push(new UserImport(checkUser.USER_GUID, element.STAFF_EMAIL, element.STAFF_ID, element.FULLNAME));

            } else {
                failUser.data.push(new UserImport('', element.STAFF_EMAIL, element.STAFF_ID, element.FULLNAME));
            }

        });

        this.importResult.push(successUser);
        this.importResult.push(failUser);

        return this.importResult;
    }

}