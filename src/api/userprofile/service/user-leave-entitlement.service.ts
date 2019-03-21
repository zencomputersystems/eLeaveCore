import { Injectable } from "@nestjs/common";
import { UserLeaveEntitlementDbService } from "../db/user-leave-entitlement.db.service";
import { AssignLeavePolicyDTO } from "../dto/leave-entitlement/assign-leave-policy.dto";
import { UserprofileDbService } from "../db/userprofile.db.service";
import { map, filter, switchMap, mergeMap } from "rxjs/operators";
import { LeavetypeEntitlementDbService } from "src/admin/leavetype-entitlement/db/leavetype-entitlement.db.service";
import { UserLeaveEntitlementModel } from "../model/user-leave-entitlement.model";
import { v1 } from "uuid";
import { LeaveTypeEntitlementModel } from "src/admin/leavetype-entitlement/model/leavetype_entitlement.model";
import { Resource } from "src/common/model/resource.model";
import { XMLParserService } from "src/common/helper/xml-parser.service";
import { IDbService } from "src/interface/IDbService";
import * as moment from 'moment';
import { of } from "rxjs";
import { UserInfoService } from "src/admin/user-info/user-info.service";
import { UserInfoModel } from "src/admin/user-info/model/user-info.model";
import { IYearEntitleCalcService } from "src/admin/leavetype-entitlement/interface/iYearEntitleCalc";
import { DayToDayService } from "src/admin/leavetype-entitlement/services/year-entitlement-calculation-service/dayToDay.service";

@Injectable()
export class UserLeaveEntitlementService {
    
    constructor(
        private readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService,
        private readonly userDbService: UserprofileDbService,
        private readonly leaveEntitlementDbService: LeavetypeEntitlementDbService,
        private readonly xmlParserService: XMLParserService,
        private readonly userInfoDbService: UserInfoService,
        private readonly dayToDayService: DayToDayService
    ) {}

    public getEntitlementList(user: any) {

    }

    // in one time, only 1 policy can active for each type of main leave
    public assignEntitlement(user: any,data: AssignLeavePolicyDTO) {

        //check if the user belong to this tenant
        const userFilter = ['(USER_GUID='+data.userId+')','(TENANT_GUID='+user.TENANT_GUID+')']

        return this.dbSearch(this.userDbService,userFilter)
            .pipe(
                filter(x=>x!=null),
                switchMap(() => {

                    //check if current leavetype has active policy
                    const userEntitlementFilter = [
                        '(TENANT_GUID='+user.TENANT_GUID+')',
                        '(ENTITLEMENT_GUID='+data.leaveEntitlementId+')',
                        '(LEAVE_TYPE_GUID='+data.leaveTypeId+')',
                        '(USER_GUID='+data.userId+')',
                        '(ACTIVE_FLAG=1)'
                    ]

                    return this.dbSearch(this.userLeaveEntitlementDbService,userEntitlementFilter)
                   
                }),
                filter(x=>x==null),
                switchMap(() => {

                    // check if combination of main leave and entitlement def exist
                    const entitlementFilter = [
                        '(TENANT_GUID='+user.TENANT_GUID+')',
                        '(ENTITLEMENT_GUID='+data.leaveEntitlementId+')',
                        '(LEAVE_TYPE_GUID='+data.leaveTypeId+')',
                        '(ACTIVE_FLAG=true)'
                    ];


                    return this.dbSearch(this.leaveEntitlementDbService,entitlementFilter);
                }),
                filter(x=>x!=null),
                mergeMap((res: LeaveTypeEntitlementModel) => {

                    const userInfoFilter = [
                        '(TENANT_GUID='+user.TENANT_GUID+')',
                        '(USER_GUID='+data.userId+')'
                    ]
                    return this.dbSearch(this.userInfoDbService,userInfoFilter)
                            .pipe(map((userInfoResult: UserInfoModel) => {
                                return {res, userInfoResult}
                            }))
                }),
                mergeMap((res) => {

                    const dateOfJoin = new Date(res.userInfoResult.JOIN_DATE);
                    // get the service year
                    const serviceYear = this.calculateServiceYear(dateOfJoin);


                    // //get the entitlement days
                    // const entitlementDay = this.calculateEntitleLeave(res.res.PROPERTIES_XML,serviceYear,dateOfJoin);

                    const entitlementDay = this.dayToDayService.calculateYearlyEntitlement(dateOfJoin,serviceYear,res.res.PROPERTIES_XML)

                    if(entitlementDay==0 || entitlementDay==undefined) {
                        return of(null);
                    }

                    // assign new policy to user
                    const entitlementModel = new UserLeaveEntitlementModel();
                    entitlementModel.USER_LEAVE_ENTITLEMENT_GUID = v1();
                    entitlementModel.LEAVE_TYPE_GUID = data.leaveTypeId;
                    entitlementModel.ENTITLEMENT_GUID = data.leaveEntitlementId;
                    entitlementModel.USER_GUID = data.userId;

                    entitlementModel.PARENT_FLAG = 1;
                    entitlementModel.CF_FLAG = 0;
                    entitlementModel.PROPERTIES_XML = res.res.PROPERTIES_XML;
                    entitlementModel.YEAR = moment().year();
                    entitlementModel.REMARKS = 'this is remark';
                    entitlementModel.ACTIVE_FLAG = 1;
                    
                    entitlementModel.TENANT_GUID = user.TENANT_GUID;
                    entitlementModel.CREATION_USER_GUID = user.USER_GUID;

                    entitlementModel.DAYS_ADDED = entitlementDay;

                    const resource = new Resource(new Array());

                    resource.resource.push(entitlementModel);

                    return this.userLeaveEntitlementDbService.createByModel(resource,[],[],[])
                        .pipe(map(res => {
                            if(res.status==200) {
                                return res.data.resource[0];
                            }
                        }))
                    
                })
            )

    }

    public calculateEntitleLeave(xml: string, yearOfService: number,dateOfJoin: Date) {

        // month join
        const monthJoin = dateOfJoin.getMonth();

        const xmlToJson = this.xmlParserService.convertXMLToJson(xml);

        const checkArray = xmlToJson.levels.leaveEntitlement instanceof Array;

        let entitledDay;

        if(checkArray) {
            //find the entitle day for this service year
            entitledDay = xmlToJson.levels.leaveEntitlement.find(x=>yearOfService>=x.service_year_from&&yearOfService<=x.service_year_to);
        } else {
            if(yearOfService>=xmlToJson.levels.leaveEntitlement.service_year_from&&yearOfService<=xmlToJson.levels.leaveEntitlement.service_year_to) {
                entitledDay = xmlToJson.levels.leaveEntitlement;
            }
        }

        if(entitledDay) {
            return (entitledDay.entitled_days/12)*(12-monthJoin);
        } else {
            return undefined;
        }
    }


    // calculate the year of service
    // return year of service
    public calculateServiceYear(dateOfJoin: Date) {
        let dateJoin = moment(dateOfJoin,'YYYY-MM-DD');
        let now = moment();

        let serviceYear = moment.duration(now.diff(dateJoin)).asYears()

        return Math.ceil(serviceYear);
    }

    private dbSearch(IDbService: IDbService, filter: string[]) {
        return IDbService.findByFilter([],filter)
                .pipe(
                    map(res => {
                        if(res.status==200) {
                            const result = res.data.resource;

                            if(result.length > 0) {
                                return result[0];
                            }
                        }
                    })
                )
    }
}