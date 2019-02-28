import { Injectable } from '@nestjs/common';
import { UserCsvDto } from './dto/user-csv.dto';
import { v1 } from 'uuid';
import { UserModel } from '../user/model/user.model';
import { UserService } from '../user/user.service';
import { map,flatMap, catchError} from 'rxjs/operators';
import { forkJoin, of,Observable } from 'rxjs';
import { UserImport } from './dto/user-import';
import { BranchService } from '../branch/branch.service';
import { CostcentreService } from '../costcentre/costcentre.service';
import { SectionService } from '../section/section.service';
import { Resource } from 'src/common/model/resource.model';
import { UserImportResult } from './dto/user-import-result.dto';

@Injectable()
export class UserImportService {
    private _userImport: [UserCsvDto];
    public branchData: any;
    public costCentreData: any;
    public sectionData: any;
    private _user: any;

    constructor(
        private readonly userService: UserService,
        private readonly branchService: BranchService,
        private readonly costCentreService: CostcentreService,
        private readonly sectionService: SectionService
        ) {}

    // proess the imported user data
    public processImportData(user: any,importData: [UserCsvDto]) {

        // set the public userimport data
        this._userImport = importData;

        //set the public user data
        this._user = user;

        //get all the the user for this tenant
        return this.userService.findByFilter(['(TENANT_GUID='+user.TENANT_GUID+')'])
            .pipe(
                flatMap(res=>this.buildUserMain(user,res.data.resource,importData)),
                map(res=>this.buildUserImportResult(res)),
                map((resultStatus) => {
                    
                    //get the general data
                    const generalObservable = [
                        this.branchService.findAll(user.USER_GUID,user.TENANT_GUID).pipe(map(res=>res),catchError(e=>of(e))),
                        this.costCentreService.findAll(user.USER_GUID,user.TENANT_GUID).pipe(map(res=>res),catchError(e=>of(e))),
                        this.sectionService.findAll(user.USER_GUID,user.TENANT_GUID).pipe(map(res=>res),catchError(e=>of(e)))
                    ];

                   
                    return forkJoin(generalObservable)
                                .pipe(
                                    flatMap(res=>this.processUserInfo(resultStatus,res)),
                                    map(()=>{return resultStatus})
                                )


                })
            )

    }

    // build the data to be inserted into main user table
    private buildUserMain(user: any, res: any, importData: [UserCsvDto]) {
        
        const resourceArray = new Resource(new Array);
        const existingUser = new Array<UserCsvDto>();

        importData.forEach(element => {
        
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
                existingUser.push(element)
            }
        });

        const obs$ = [];

        if(resourceArray.resource.length>0) {
            obs$.push(this.userService.createByModel(resourceArray).pipe(map(res=>res.data.resource)));
        } else {
            obs$.push(of(null));
        }

        obs$.push(of(existingUser));
        
        return forkJoin(obs$);
    }

    // build the import result
    // result is divided into fail and success
    private buildUserImportResult(res: any) {
        const resultStatus = new UserImportResult();

        const saved = res[0];
            if(saved!=null) {
                saved.forEach(element => {
                    resultStatus.SUCCESS.push(new UserImport(element.USER_GUID,element.EMAIL,'','SUCCESS'))  
            });
        }

        const nonSaved = res[1];
        nonSaved.forEach(element => {
            resultStatus.FAIL.push(new UserImport('',element.STAFF_EMAIL,'','FAIL'))  
        })

        return resultStatus;

    }

    private processUserInfo(resultStatus: UserImportResult, generalResult: any) {

        //console.log(resultStatus);
        this.branchData = generalResult[0].data==undefined?[]:generalResult[0].data.resource;
        this.costCentreData = generalResult[1].data==undefined?[]:generalResult[1].data.resource;
        this.sectionData = generalResult[2].data==undefined?[]:generalResult[2].data.resource;

        const generalData$ = [];

        //for success user, we need to process their other information
        this._userImport.forEach(element => {

            if(resultStatus.SUCCESS.find(x=>x.EMAIL.toLowerCase()===element.STAFF_EMAIL.toLowerCase()!=null)) {

                if(this.branchData.length>1)
                    generalData$.push(this.buildUserInfo(this.branchData.data.resource[0],"BRANCH_GUID",'BRANCH',element,this.branchService));

                if(this.costCentreData.length>1)
                    generalData$.push(this.buildUserInfo(this.sectionData.data.resource[0],"SECTION_GUID",'DEPARTMENT',element,this.sectionService));

                if(this.sectionData.length>1)
                    generalData$.push(this.buildUserInfo(this.costCentreData.data.resource[0],"COST_CENTRE_GUID",'COST_CENTRE',element,this.costCentreService));
            }

        })

        
        if(generalData$.length>1) {
            return forkJoin(generalData$)
                    .pipe(
                        map(()=>{return resultStatus})
                    );
        }

        return of(resultStatus);
    }

    private buildUserInfo(sourceData: Array<any>,data_GUID: string, data_name: string,element: UserCsvDto, dataService: any): Observable<any> {

        const checkData = sourceData.find(item => item.NAME.toLowerCase() === element[data_name].toLowerCase());

        if(element[data_name]!="") {

            if(checkData!=null||checkData!=undefined) {
                //branch already exist in database
                element[data_name] = checkData[data_GUID];
                return of(element);
            } else {
                //data not exist
                //we need to create new data
                //add new data into source data array
                return dataService.create(this._user,element[data_name])
                            .pipe(
                                map(
                                    (data: any) => {
                                        const result = data.data.resource[0];
                                        element[data_name] = result[data_GUID];

                                        sourceData.push(result);
                                        return element;
                                    }
                                )
                            )
            }


        } else {

            return of(element);
        }
    }
}
