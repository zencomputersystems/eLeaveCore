import { Injectable } from '@nestjs/common';
import { UserCsvDto } from './dto/csv/user-csv.dto';
import { v1 } from 'uuid';
import { UserModel } from '../user/model/user.model';
import { UserService } from '../user/user.service';
import { map,flatMap, catchError, filter, concatMap, mergeMap, zipAll, combineLatest, switchMap} from 'rxjs/operators';
import { forkJoin, of,Observable, empty, throwError, from, zip, pipe, merge } from 'rxjs';
import { UserImport } from './dto/user-import';
import { BranchService } from '../branch/branch.service';
import { CostcentreService } from '../costcentre/costcentre.service';
import { SectionService } from '../section/section.service';
import { Resource } from 'src/common/model/resource.model';
import { UserImportResult } from './dto/user-import-result.dto';
import { DepartmentService } from '../department/department.service';
import { CompanyService } from '../company/company.service';
import { UserInfoModel } from '../user-info/model/user-info.model';
import { UserImportSuccessDTO } from './dto/user-import-success.dto';
import { UserDto } from '../user-info/dto/user.dto';
import { UserInfoService } from '../user-info/user-info.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { IDbService } from 'src/interface/IDbService';

@Injectable()
export class UserImportService {
    public branchData: any;
    public costCentreData: any;
    public sectionData: any;
    public departmentData: any;
    public importResult = new Array<UserImportResult>();

    constructor(
        private readonly userService: UserService,
        private readonly userInfoService: UserInfoService
    ) {}

    // proess the imported user data
    public processImportData(user: any,importData: [UserCsvDto]) {


        //get all the the user for this tenant
        return this.userService.findByFilter(['(TENANT_GUID='+user.TENANT_GUID+')'])
            .pipe(
               map(res => {
                    const existingUsers: [UserModel] = res.data.resource;  
                    return existingUsers;
               }),
               map(res => this.filterExistingUser(importData,res)),
               map(res => this.filterDuplicateUser(res)),
               mergeMap(successUser => this.saveImportList(successUser,user)),
               mergeMap(successUser => this.saveInfoDataList(successUser,user))

            )
    }

    private saveImportList(importData: Array<UserCsvDto>,user: any) {

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

        return this.userService.createByModel(userResourceArray,[],[],['EMAIL,USER_GUID'])
            .pipe(map(res => {
                if(res.status==200) {
                    const saveUser =  res.data.resource;

                    return this.filterSaveUser(saveUser,importData);
                }
            }))

    }

    private saveInfoDataList(importData: Array<UserCsvDto>,user:any) {
        
        const userInfoResourceArray = new Resource(new Array);

        importData.forEach(element => {

            if(element.ID!=null||element.ID!='') {
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
                
                userInfoModel.JOIN_DATE = element.JOIN_DATE;
                userInfoModel.CONFIRMATION_DATE = element.CONFIRMATION_DATE;
                userInfoModel.RESIGNATION_DATE = element.RESIGNATION_DATE;
                
                userInfoResourceArray.resource.push(userInfoModel);
            }
            
        })

        return this.userInfoService.createByModel(userInfoResourceArray,[],[],['USER_INFO_GUID','USER_GUID'])
            .pipe(map(res => {
                if(res.status==200) {
                    const saveUser =  res.data.resource;

                    return this.filterSaveUserByID(saveUser,importData);
                }
            }))
    }

    private filterDuplicateUser(importData: Array<UserCsvDto>) {
        const duplicateUser = new UserImportResult();
        duplicateUser.category = "Duplicate";

        const successList = new Array<UserCsvDto>();

        // remove existing users from csv list
        importData.forEach(element => {

            if(successList.find(x=>x.STAFF_EMAIL.toUpperCase()===element.STAFF_EMAIL.toUpperCase())) {
                duplicateUser.data.push(new UserImport('',element.STAFF_EMAIL,element.STAFF_ID,element.FULLNAME));
            } else {
                successList.push(element);
            }

        });

        this.importResult.push(duplicateUser);

        return successList;
    }

    private filterExistingUser(importData: [UserCsvDto],existingUsers:[UserModel]) {

        const existedUser = new UserImportResult();
        existedUser.category = "ExistingUser";

        const successList = new Array<UserCsvDto>();

        // remove existing users from csv list
        importData.forEach(element => {

            if(existingUsers.find(x=>x.EMAIL.toUpperCase()===element.STAFF_EMAIL.toUpperCase())) {
                existedUser.data.push(new UserImport('',element.STAFF_EMAIL,element.STAFF_ID,element.FULLNAME));
            } else {
                successList.push(element);
            }

        });

        this.importResult.push(existedUser);

        return successList;

    }

    private filterSaveUser(saveUser: any, importData: Array<UserCsvDto>): Array<UserCsvDto> {
        const failUser = new UserImportResult();
        failUser.category = "Fail";

        const successList = new Array<UserCsvDto>();

        // remove existing users from csv list
        importData.forEach(element => {

            const checkUser = saveUser.find(x=>x.EMAIL.toUpperCase()===element.STAFF_EMAIL.toUpperCase())
            if(checkUser) {
                element.ID = checkUser.USER_GUID;
                successList.push(element);

            } else {
                failUser.data.push(new UserImport('',element.STAFF_EMAIL,element.STAFF_ID,element.FULLNAME));
            }

        });

        this.importResult.push(failUser);

        return successList;
    }

    private filterSaveUserByID(saveUser: any, importData: Array<UserCsvDto>) {
        const failUser = new UserImportResult();
        failUser.category = "Fail";

        const successUser = new UserImportResult();
        successUser.category = "Success";

        const successList = new Array<UserCsvDto>();

        // remove existing users from csv list
        importData.forEach(element => {

            const checkUser = saveUser.find(x=>x.USER_GUID.toUpperCase()===element.ID.toUpperCase())
            if(checkUser) {
                element.ID = checkUser.USER_GUID;
                successList.push(element);
                successUser.data.push(new UserImport('',element.STAFF_EMAIL,element.STAFF_ID,element.FULLNAME));


            } else {
                failUser.data.push(new UserImport('',element.STAFF_EMAIL,element.STAFF_ID,element.FULLNAME));
            }

        });

        this.importResult.push(successUser);
        this.importResult.push(failUser);

        return this.importResult;
    }

}