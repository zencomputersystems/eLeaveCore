import { Injectable } from '@nestjs/common';
import { UserCsvDto } from './dto/user-csv.dto';
import { v1 } from 'uuid';
import { UserModel } from '../user/model/user.model';
import { UserService } from '../user/user.service';
import { map, switchMap, mergeMap, flatMap, concatMap } from 'rxjs/operators';
import { forkJoin, of, empty, from, combineLatest, Observable } from 'rxjs';
import { UserImport } from './dto/user-import';
import {groupBy} from 'lodash';
import { BranchService } from '../branch/branch.service';
import { CostcentreService } from '../costcentre/costcentre.service';
import { SectionService } from '../section/section.service';

@Injectable()
export class UserImportService {
    public globalUserImport: [UserCsvDto];
    public branchData: any;
    public costCentreData: any;
    public sectionData: any;
    public user: any;

    constructor(
        private readonly userService: UserService,
        private readonly branchService: BranchService,
        private readonly costCentreService: CostcentreService,
        private readonly sectionService: SectionService
        ) {}

    processUserInfo(data: any, generalResult: any) {
        this.branchData = generalResult[0].data.resource;
        this.costCentreData = generalResult[1].data.resource
        this.sectionData = generalResult[2].data.resource;
        const userimportResult = data;

        //group user based on their import status
        const groupUserByStatus = groupBy(userimportResult, function(data) {
            return data.STATUS;
        });


        const generalData$ = [];

        //for success user, we need to process their other information
        this.globalUserImport.forEach(element => {
            generalData$.push(this.buildUserInfo(this.branchData,"BRANCH_GUID",'BRANCH',element,this.branchService));
            generalData$.push(this.buildUserInfo(this.sectionData,"SECTION_GUID",'DEPARTMENT',element,this.sectionService));
            generalData$.push(this.buildUserInfo(this.costCentreData,"COST_CENTRE_GUID",'COST_CENTRE',element,this.costCentreService));

        })

        return forkJoin(generalData$)
                .pipe(
                    map(()=>{
                        return groupUserByStatus;
                    })
                );
    }

    getGeneralData(): Observable<any> {
        const generalObservable = [
            this.branchService.findAll(this.user.USER_GUID,this.user.TENANT_GUID),
            this.costCentreService.findAll(this.user.USER_GUID,this.user.TENANT_GUID),
            this.sectionService.findAll(this.user.USER_GUID,this.user.TENANT_GUID)
        ];

        return forkJoin(generalObservable);
    }

    processImportList(user: any,data: [UserCsvDto]) {
        this.globalUserImport = data;
        this.user = user;

        return this.getGeneralData()
            .pipe(
                switchMap(generalResult=>{
                    const userMainObservable = [];
                    data.forEach(element => {
                        // just create the Observable here but don't subscribe yet
                        userMainObservable.push(this.buildUserMain(user,element.STAFF_EMAIL));
                    });

                    const t = [];
                    //process the main user
                    return forkJoin(userMainObservable)
                        .pipe(
                            map(res => this.processUserInfo(res,generalResult))
                        )    
                })
            )
    }


    private buildUserInfo(sourceData: Array<any>,data_GUID: string, data_name: string,element: UserCsvDto, dataService: any) {
        
        const checkData = sourceData.find(item => item.NAME.toLowerCase() === element[data_name].toLowerCase());

        if(element[data_name]!="") {

            if(checkData!=null) {
                //branch already exist in database
                element[data_name] = checkData[data_GUID];
                return of(element);
            } else {
                //data not exist
                //we need to create new data
                //add new data into source data array
                return  dataService.create(this.user,element[data_name])
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

        }

        return of(element);
    }

    //save data into USER_MAIN table
    private buildUserMain(user: any,email: string) {
        
        // before saving new user, we need to check if the ACTIVATION_FLAG is ACTIVE
        // if active, check if same email exist and that ACTIVATION_FLAG is NOT ACITVE in table 
        // if same activated email exist, we will not proceed with the insertion
        const filters = ['(EMAIL='+email+')','(TENANT_GUID='+user.TENANT_GUID+')'];

        return this.userService.findByFilter(filters)
            .pipe(
                flatMap(
                    res => {
                        
                        if(res.data.resource.length>0)
                        {
                            //remove user from global array
                            //this.globalUserImport.splice(this.globalUserImport.findIndex(item=>item.STAFF_EMAIL==email),1);

                            return of(email);
                        }
                        
                        if(res!=null||res!=undefined) {
                            const data = new UserModel();
    
                            data.USER_GUID = v1();
                            data.ACTIVATION_FLAG = 0;
                            data.CREATION_TS = new Date().toISOString();
                            data.CREATION_USER_GUID = user.USER_GUID;
                            data.TENANT_GUID = user.TENANT_GUID;
                            data.IS_TENANT_ADMIN = "";
                            data.LOGIN_ID = email;
                            data.EMAIL = email;
    
                            return this.userService.createByModel(data);
                        }
                    }
                ),
                map(
                    (res) => {
                       
                        if(typeof res == 'string') {
                            return new UserImport('',res,'','FAIL');
                        } else {
                            const qResult = res.data.resource[0];
    
                            return new UserImport(qResult.USER_GUID,qResult.EMAIL,'','SUCCESS');
                        }
                    }
                )
            )
    }
}
