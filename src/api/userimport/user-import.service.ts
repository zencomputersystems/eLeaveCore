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
import { PendingLeaveService } from '../../admin/approval-override/pending-leave.service';
import { UpdateUserInfoItemDTO } from 'src/admin/user-info-details/dto/update-user-info-details.dto';
import * as moment from 'moment';
/** XMLparser from zen library  */
var { convertJsonToXML } = require('@zencloudservices/xmlparser');

/**
 * Service for user import
 *
 * @export
 * @class UserImportService
 */
@Injectable()
export class UserImportService {
    /**
     * Declare branchData
     *
     * @type {*}
     * @memberof UserImportService
     */
    public branchData: any;
    /**
     * Declare cost centre data
     *
     * @type {*}
     * @memberof UserImportService
     */
    public costCentreData: any;
    /**
     * Declare section data
     *
     * @type {*}
     * @memberof UserImportService
     */
    public sectionData: any;
    /**
     * Declare department data
     *
     * @type {*}
     * @memberof UserImportService
     */
    public departmentData: any;
    /**
     * Declare import result data
     *
     * @memberof UserImportService
     */
    public importResult = new Array<UserImportResult>();

    /**
     *Creates an instance of UserImportService.
     * @param {UserService} userService
     * @param {UserInfoService} userInfoService
     * @memberof UserImportService
     */
    constructor(
        private readonly userService: UserService,
        private readonly userInfoService: UserInfoService,
        private readonly pendingLeaveService: PendingLeaveService
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
        this.importResult = new Array<UserImportResult>();
        //get all the the user for this tenant
        return this.userService.findByFilterV2([], ['(TENANT_GUID=' + user.TENANT_GUID + ')'])
            .pipe(
                map(res => {
                    const existingUsers: UserModel[] = res;
                    return existingUsers;
                }),
                map(res => this.filterData([importData, res, 'Existing User', 'EMAIL', 'STAFF_EMAIL', 'STAFF_ID', 'STAFF_ID'])),
                map(res => this.filterDuplicateUser(res)),
                mergeMap(successUser => this.saveImportList(successUser, user)),
                mergeMap(async successUser => await this.saveInfoDataList(successUser, user)),
                mergeMap(res => { return res; })

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
        // console.log(importData)
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
            userModel.STAFF_ID = element.STAFF_ID;

            userResourceArray.resource.push(userModel);
        });

        return this.userService.createByModel(userResourceArray, [], [], ['EMAIL,USER_GUID'])
            .pipe(map(res => {
                if (res.status == 200) {
                    const saveUser = res.data.resource;
                    // console.log(saveUser);
                    return this.filterData([importData, saveUser, 'Fail', 'EMAIL', 'STAFF_EMAIL', 'STAFF_ID', 'STAFF_ID'])
                    // return importData;
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
    private async saveInfoDataList(importData: Array<UserCsvDto>, user: any) {

        let userList = await this.pendingLeaveService.getAllUserInfo(user.TENANT_GUID) as any[];
        let companyList = await this.pendingLeaveService.getCompanyList(user.TENANT_GUID) as any[];

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

                userInfoModel.FULLNAME = element.hasOwnProperty('FULLNAME') ? element.FULLNAME : null;
                userInfoModel.NICKNAME = element.hasOwnProperty('NICKNAME') ? element.NICKNAME : null;

                userInfoModel.DEPARTMENT = element.hasOwnProperty('DEPARTMENT') ? element.DEPARTMENT : null;
                userInfoModel.BRANCH = element.hasOwnProperty('BRANCH') ? element.BRANCH : null;
                userInfoModel.COSTCENTRE = element.hasOwnProperty('COST_CENTRE') ? element.COST_CENTRE : null;
                userInfoModel.DESIGNATION = element.hasOwnProperty('DESIGNATION') ? element.DESIGNATION : null;
                userInfoModel.DIVISION = element.hasOwnProperty('DIVISION') ? element.DIVISION : null;
                userInfoModel.SECTION = element.hasOwnProperty('SECTION') ? element.SECTION : null;
                userInfoModel.PERSONAL_ID = element.hasOwnProperty('NRIC') ? element.NRIC : null;
                userInfoModel.DOB = element.hasOwnProperty('DOB') ? element.DOB : null;
                userInfoModel.GENDER = element.hasOwnProperty('GENDER') ? (element.GENDER.toLowerCase() == 'male' ? 1 : 0) : null;
                userInfoModel.MARITAL_STATUS = element.hasOwnProperty('MARITAL_STATUS') ? (element.MARITAL_STATUS.toLowerCase() == 'single' ? 0 : 1) : null;

                if (element.hasOwnProperty('COMPANY')) {
                    let companyData = companyList.find(x => x.NAME === element.COMPANY || x.TENANT_COMPANY_GUID === element.COMPANY);
                    if (companyData != undefined) {
                        userInfoModel.TENANT_COMPANY_GUID = companyData.TENANT_COMPANY_GUID;
                    }
                }

                if (element.hasOwnProperty('MANAGER_EMAIL')) {
                    let managerData = userList.find(x => x.EMAIL === element.MANAGER_EMAIL);
                    if (managerData != undefined) {
                        userInfoModel.MANAGER_USER_GUID = managerData.USER_GUID;
                    }
                }

                // userInfoModel.TENANT_COMPANY_GUID = element.hasOwnProperty('COMPANY') ? element.COMPANY : null;
                // userInfoModel.MANAGER_USER_GUID = element.hasOwnProperty('MANAGER_EMAIL') ? element.MANAGER_EMAIL : null;

                userInfoModel.JOIN_DATE = element.hasOwnProperty('JOIN_DATE') ? new Date(moment(element.JOIN_DATE, 'DD/M/YYYY').format('YYYY-MM-DD')) : null;
                userInfoModel.CONFIRMATION_DATE = element.hasOwnProperty('CONFIRMATION_DATE') ? new Date(moment(element.CONFIRMATION_DATE, 'DD/M/YYYY').format('YYYY-MM-DD')) : null;
                userInfoModel.RESIGNATION_DATE = element.hasOwnProperty('RESIGNATION_DATE') ? new Date(moment(element.RESIGNATION_DATE, 'DD/M/YYYY').format('YYYY-MM-DD')) : null;
                this.setUserInfoXML([element, userInfoModel]);
                // userInfoModel.PROPERTIES_XML = null;
                userInfoResourceArray.resource.push(userInfoModel);
            }

        })

        // console.log(userInfoResourceArray);

        return this.userInfoService.createByModel(userInfoResourceArray, ['USER_INFO_GUID', 'USER_GUID', 'TENANT_COMPANY_GUID'], [], [])
            .pipe(map(res => {
                if (res.status == 200) {
                    const saveUser = res.data.resource;
                    return this.filterSaveUserByID(saveUser, importData);
                }
            }))
    }

    private setUserInfoXML([element, userInfoModel]: [UserCsvDto, UserInfoModel]) {

        // console.log(userInfoModel);
        // console.log(element);

        let dataXML = {};
        let dataRoot = {};
        let dataEmployment = {};
        let dataPersonal = {};

        dataEmployment['employeeId'] = element.STAFF_ID;
        dataEmployment['companyId'] = userInfoModel.TENANT_COMPANY_GUID;
        dataEmployment['department'] = userInfoModel.DEPARTMENT;
        dataEmployment['designation'] = userInfoModel.DESIGNATION;
        dataEmployment['section'] = userInfoModel.SECTION;
        dataEmployment['branch'] = userInfoModel.BRANCH;
        dataEmployment['costcentre'] = userInfoModel.COSTCENTRE;
        dataEmployment['employmentStatus'] = userInfoModel.EMPLOYEE_STATUS;
        dataEmployment['employmentType'] = userInfoModel.EMPLOYEE_TYPE;
        dataEmployment['reportingTo'] = userInfoModel.MANAGER_USER_GUID;
        dataEmployment['dateOfJoin'] = moment(element.JOIN_DATE, 'DD/M/YYYY').format('YYYY-MM-DD');
        dataEmployment['dateOfConfirmation'] = moment(element.CONFIRMATION_DATE, 'DD/MM/YYYY').format('YYYY-MM-DD') || null;
        dataEmployment['dateOfResignation'] = moment(element.RESIGNATION_DATE, 'DD/MM/YYYY').format('YYYY-MM-DD') || null;
        dataEmployment['epfNumber'] = '';
        dataEmployment['incomeTaxNumber'] = '';
        dataEmployment['bankAccountName'] = '';
        dataEmployment['bankAccountNumber'] = '';

        dataPersonal['fullname'] = userInfoModel.FULLNAME;
        dataPersonal['nickname'] = userInfoModel.NICKNAME;
        dataPersonal['nric'] = element.NRIC;
        dataPersonal['dob'] = element.DOB;
        dataPersonal['gender'] = element.GENDER;
        dataPersonal['maritalStatus'] = userInfoModel.MARITAL_STATUS;
        dataPersonal['race'] = '';
        dataPersonal['religion'] = '';
        dataPersonal['nationality'] = '';
        dataPersonal['phoneNumber'] = element.MOBILE_NUMBER;
        dataPersonal['workPhoneNumber'] = element.WORK_NUMBER;
        dataPersonal['emailAddress'] = '';
        dataPersonal['workEmailAddress'] = element.STAFF_EMAIL;
        dataPersonal['address1'] = element.ADDRESS;
        dataPersonal['address2'] = '';
        dataPersonal['postcode'] = element.POSTCODE;
        dataPersonal['city'] = element.CITY;
        dataPersonal['state'] = element.STATE;
        dataPersonal['country'] = element.COUNTRY;
        dataPersonal['emergencyContact'] = [];
        dataPersonal['education'] = [];
        dataPersonal['certification'] = [];
        dataPersonal['family'] = [];

        dataRoot['employmentDetail'] = dataEmployment;
        dataRoot['notificationRule'] = [];
        dataRoot['personalDetails'] = dataPersonal;

        dataXML['root'] = dataRoot;

        // console.log(dataXML);
        // let root = data['root'];
        // let personal = root['personalDetails'];
        // // data.root.employmentDetail.reportingTo = userInfoModel.MANAGER_USER_GUID;
        // personal['fullname'] = 'userInfoModel.FULLNAME';
        // console.log(data);
        userInfoModel.PROPERTIES_XML = convertJsonToXML(dataXML);
        // return 'data';
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
    // private filterData(
    //     importData: Array<UserCsvDto>,
    //     checkModelArray: any,
    //     categoryName: string,
    //     findElement: any,
    //     findItem: any) {
    private filterData([importData, checkModelArray, categoryName, findElement, findItem, findElement2, findItem2]: [Array<UserCsvDto>, any, string, any, any, any, any]) {

        // console.log(importData);
        // console.log(checkModelArray[0]);


        // this.filterData(importData, res, 'Existing User', 'EMAIL', 'STAFF_EMAIL')),
        const data = new UserImportResult();
        data.category = categoryName;
        data.message = this.messageResult(categoryName);

        const successList = new Array<UserCsvDto>();

        // remove existing users from csv list
        importData.forEach(element => {

            // checkModelArray.find(x => {
            //     x[findElement].toUpperCase() === element[findItem].toUpperCase();
            //     console.log(element.STAFF_EMAIL + ' - ' + x[findElement]);
            // });

            if (checkModelArray.find(x => x[findElement].toUpperCase() === element[findItem].toUpperCase() || x[findElement2] === element[findItem2])) {
                data.data.push(new UserImport('', element.STAFF_EMAIL, element.STAFF_ID, element.FULLNAME, element.JOIN_DATE, element.SECTION, '', element.COMPANY));
                if (data.category == 'Fail') {
                    let userTemp = checkModelArray.find(x => x[findElement].toUpperCase() === element[findItem].toUpperCase());
                    if (userTemp) {
                        // console.log(userTemp.USER_GUID);
                        element.ID = userTemp.USER_GUID;
                        // console.log(element);
                        successList.push(element);
                        // return successList;
                    }
                }
            } else {
                successList.push(element);
            }

        });
        // console.log(data);
        if (data.category == 'Existing User')
            this.importResult.push(data);


        return successList;
    }

    /**
     * Message result
     *
     * @private
     * @param {string} categoryName
     * @returns
     * @memberof UserImportService
     */
    private messageResult(categoryName: string) {
        let message;
        if (categoryName == "Duplicate")
            message = 'Duplicate email in user list';
        else if (categoryName == 'Existing User')
            message = 'User email or staff id already exist';
        else if (categoryName == "Success")
            message = 'User successfully created';
        else if (categoryName == "Fail")
            message = 'Failed to create user';
        return message;
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
        duplicateUser.message = this.messageResult(duplicateUser.category);

        const successList = new Array<UserCsvDto>();

        // remove existing users from csv list
        importData.forEach(element => {

            if (successList.find(x => x.STAFF_EMAIL.toUpperCase() === element.STAFF_EMAIL.toUpperCase())) {
                duplicateUser.data.push(new UserImport('', element.STAFF_EMAIL, element.STAFF_ID, element.FULLNAME, element.JOIN_DATE, element.SECTION, '', element.COMPANY));
            } else {
                successList.push(element);
            }

        });

        // console.log(duplicateUser);
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
        failUser.message = this.messageResult(failUser.category);

        const successUser = new UserImportResult();
        successUser.category = "Success";
        successUser.message = this.messageResult(successUser.category);

        const successList = new Array<UserCsvDto>();

        // remove existing users from csv list
        importData.forEach(element => {

            const checkUser = saveUser.find(x => x.USER_GUID.toUpperCase() === element.ID.toUpperCase())
            // console.log(checkUser);
            if (checkUser) {
                element.ID = checkUser.USER_GUID;
                successList.push(element);
                successUser.data.push(new UserImport(checkUser.USER_GUID, element.STAFF_EMAIL, element.STAFF_ID, element.FULLNAME, element.JOIN_DATE, element.SECTION, checkUser.TENANT_COMPANY_GUID, element.COMPANY));

            } else {
                failUser.data.push(new UserImport('', element.STAFF_EMAIL, element.STAFF_ID, element.FULLNAME, element.JOIN_DATE, element.SECTION, '', element.COMPANY));
            }

        });

        // console.log(successUser);
        // console.log(failUser);
        this.importResult.push(successUser);
        this.importResult.push(failUser);

        return this.importResult;
    }

}