import { Injectable } from '@nestjs/common';
import { UserCsvDto } from './dto/user-csv.dto';
import { v1 } from 'uuid';
import { UserModel } from '../user/model/user.model';
import { UserService } from '../user/user.service';
import { map,flatMap, catchError, filter, concatMap, mergeMap, zipAll, combineLatest, switchMap} from 'rxjs/operators';
import { forkJoin, of,Observable, empty, throwError, from, zip, pipe } from 'rxjs';
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
    private _existingUser = new Array<UserCsvDto>(); // store existing user list
    private _successUser = new Array<UserCsvDto>();

    constructor(
        private readonly userService: UserService,
        private readonly branchService: BranchService,
        private readonly costCentreService: CostcentreService,
        private readonly sectionService: SectionService,
        private readonly departmentService: DepartmentService,
        private readonly companyService: CompanyService,
        private readonly userInfoService: UserInfoService,
        private readonly xmlParserService: XMLParserService
        ) {}

    // proess the imported user data
    public processImportData(user: any,importData: [UserCsvDto]) {


        //get all the the user for this tenant
        return this.userService.findByFilter(['(TENANT_GUID='+user.TENANT_GUID+')'])
            .pipe(
                flatMap(res=>this.buildUserMain(user,res.data.resource,importData)),
                filter(res=>res!==null),
                flatMap(successUser => {
                    const successList = this.filterSuccessUser(successUser,importData);

                    const obs$ = [];

                    successList.forEach(element => {
                        obs$.push(this.buildGeneralData(element,user));
                    });

                    return forkJoin(from(obs$)
                            .pipe(
                                switchMap(res=>{
                                    return res;
                                })
                            ));

                })
            )
    }

    private buildGeneralData(data: UserImportSuccessDTO,user: any) {

        //this.test(this.branchService,user,"BRANCH");

        //return this.buildBranch(data.USER_IMPORT.BRANCH,user)
        const branchfilters = ['(NAME ='+data.USER_IMPORT.BRANCH+')','(TENANT_GUID='+user.TENANT_GUID+')'];

        return this.saveGeneralData(this.branchService,user,"NAME",data.USER_IMPORT.BRANCH,"BRANCH_GUID",branchfilters)
                .pipe(
                    map((branchResult:any) => {
                        data.USER_IMPORT.BRANCH = branchResult;

                        return data;
                    }),
                    switchMap(userData => {
                        const filters = ['(NAME='+data.USER_IMPORT.DEPARTMENT+')','(TENANT_GUID='+user.TENANT_GUID+')'];
                        return this.saveGeneralData(this.departmentService,user,"NAME",data.USER_IMPORT.DEPARTMENT,"DEPARTMENT_GUID",filters)
                                .pipe(map((departmentResult: any) => {
                                    userData.USER_IMPORT.DEPARTMENT = departmentResult;

                                    return userData;
                                }))
                    }),
                    switchMap(userData => {
                        const filters = ['(NAME='+data.USER_IMPORT.COMPANY+')','(TENANT_GUID='+user.TENANT_GUID+')'];

                        return this.saveGeneralData(this.companyService,user,"NAME",data.USER_IMPORT.COMPANY,"TENANT_COMPANY_GUID",filters)
                            .pipe(map((companyResult : any) => {
                                userData.USER_IMPORT.COMPANY = companyResult;

                                return userData;
                            }))
                    }),
                    switchMap(userData => {
                        return this.buildUserInfo(userData,user)
                            .pipe(map(userInfoResult => {

                                this._successUser.push(userInfoResult.USER_IMPORT);

                                return this._successUser;
                            }))
                    })
                )
    }

    private buildUserInfo(userData: UserImportSuccessDTO,user: any) {


        const userModelData = new UserInfoModel();

        userModelData.USER_INFO_GUID = v1();
        userModelData.USER_GUID = userData.USER_ID;
        userModelData.TENANT_GUID = user.TENANT_GUID;
        userModelData.FULLNAME = userData.USER_IMPORT.FULLNAME;
        userModelData.CREATION_USER_GUID = user.USER_GUID;

        const resource = new Resource(new Array);

        resource.resource.push(userModelData);

        return this.userInfoService.createByModel(resource,[],[],[])
                .pipe(map(()=>{return userData}))

    }

    // build the data to be inserted into main user table
    private buildUserMain(user: any, res: any, importData: [UserCsvDto]) {
        
        const resourceArray = new Resource(new Array);


        importData.forEach(element => {
        
            // find user in database data
            const checkUserExistInDB = res.find(x=>x.EMAIL.toLowerCase()===element.STAFF_EMAIL.toLowerCase());

            if(checkUserExistInDB==null) {
                //user does not exist in database
                //create new user
                const data = new UserModel();
    
                data.USER_GUID = v1();
                data.ACTIVATION_FLAG = 0;
                data.CREATION_TS = new Date().toISOString();
                data.CREATION_USER_GUID = user.USER_GUID;
                data.TENANT_GUID = user.TENANT_GUID;
                data.IS_TENANT_ADMIN = "";
                data.LOGIN_ID = element.STAFF_EMAIL;
                data.EMAIL = element.STAFF_EMAIL;
                
                resourceArray.resource.push(data);

            } else {
                this._existingUser.push(element)
            }
        });


        if(resourceArray.resource.length>0) {
            // update user table with imported list
            return this.userService.createByModel(resourceArray,[],[],['EMAIL,USER_GUID']).pipe(map(res=>res.data.resource));
        } else {
            return of(null);
        }
    }

    // filter success user from main list
    private filterSuccessUser(saveUser: any, importList: [UserCsvDto]) {
        
        const successUser = new Array<UserImportSuccessDTO>();

        saveUser.forEach(element => {
            const checkUser = importList.find(x => x.STAFF_EMAIL.toLowerCase()===element.EMAIL.toLowerCase());
            if(checkUser!=undefined||checkUser!=null) {
                
                const success = new UserImportSuccessDTO(element.USER_GUID,checkUser);
                successUser.push(success);
            }
        });

        return successUser;
    }

    private saveGeneralData(
        dbService: IDbService,
        user: any,
        filterProperty: any,
        searchElement: any,
        selectElement: any,
        filters: string[]) {


        return dbService.findByFilter([],filters)
        .pipe(
            switchMap(res => {

                if(res.status==200) {

                    const d = res.data.resource.find(x => x[filterProperty].toLowerCase()==searchElement.toLowerCase());

                    if(d==undefined||d==null) {
                        return dbService.create(user,searchElement)
                                .pipe(
                                    map((result: any) => {
                                        return result.data.resource[0][selectElement];
                                    })
                                )
                    } else {
                        return of(d[selectElement]);
                    }
                }
            })
        );   
    }









    // private getUniqueData(source: any[],element: string) {
    //     // get unique branch name
    //     const uniqueData = source.map(item => item[element])
    //                             .filter((value, index, self) => self.indexOf(value) === index)

    //     return uniqueData;
    // }

    // // build the import result
    // // result is divided into fail and success
    // private buildUserImportResult(res: any) {
    //     const resultStatus = new UserImportResult();

    //     const saved = res[0];
    //         if(saved!=null) {
    //             saved.forEach(element => {
    //                 resultStatus.SUCCESS.push(new UserImport(element.USER_GUID,element.EMAIL,'','SUCCESS'))  
    //         });
    //     }

    //     const nonSaved = res[1];
    //     nonSaved.forEach(element => {
    //         resultStatus.FAIL.push(new UserImport('',element.STAFF_EMAIL,'','FAIL'))  
    //     })

    //     return resultStatus;

    // }



    // private buildInfo(sourceData: Array<any>,data_GUID: string, data_name: string,element: UserCsvDto, dataService: any): Observable<any> {

    //     const checkData = sourceData.find(item => item.NAME.toLowerCase() === element[data_name].toLowerCase());

    //     if(element[data_name]!="") {

    //         if(checkData!=null||checkData!=undefined) {
    //             //branch already exist in database
    //             element[data_name] = checkData[data_GUID];
    //             return of(element);
    //         } else {
    //             //data not exist
    //             //we need to create new data
    //             //add new data into source data array
    //             return dataService.create(this._user,element[data_name])
    //                         .pipe(
    //                             map(
    //                                 (data: any) => {
    //                                     const result = data.data.resource[0];
    //                                     element[data_name] = result[data_GUID];

    //                                     sourceData.push(result);
    //                                     return element;
    //                                 }
    //                             )
    //                         )
    //         }


    //     } else {

    //         return of(element);
    //     }
    // }
}
