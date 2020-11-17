import { Injectable } from '@nestjs/common';
import { UserLeaveEntitlementDbService } from '../db/user-leave-entitlement.db.service';
import { UserLeaveEntitlementSummaryDbService } from '../db/user-leave-summary.db.service';
import { AssignLeavePolicyDTO } from '../dto/leave-entitlement/assign-leave-policy.dto';
import { UserprofileDbService } from '../db/userprofile.db.service';
import { map, filter, switchMap, mergeMap, find } from 'rxjs/operators';
import { LeavetypeEntitlementDbService } from 'src/admin/leavetype-entitlement/db/leavetype-entitlement.db.service';
import { UserLeaveEntitlementModel } from '../model/user-leave-entitlement.model';
import { v1 } from 'uuid';
import { LeaveTypeEntitlementModel } from 'src/admin/leavetype-entitlement/model/leavetype_entitlement.model';
import { Resource } from 'src/common/model/resource.model';
import { IDbService } from 'src/interface/IDbService';
import * as moment from 'moment';
import { of, forkJoin } from 'rxjs';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { UserInfoModel } from 'src/admin/user-info/model/user-info.model';
import { ServiceYearCalc } from 'src/common/policy/entitlement-type/services/service-year-calculation-service/serviceYearCalc.service';
import { ProratedDateEndYearService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/proratedDateEndYear.service';
import { ProratedDateCurrentMonthService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/proratedDateCurrentMonth.service';
import { UserEntitlementAssignPolicy } from './userentitlement-assign-policy.service';
import { UserEntitlementAssignEntitlement } from './userentitlement-assign-entitlement.service';
// import { UpdateUserLeaveEntitlementDTO } from '../dto/leave-entitlement/update-user-leave-entitlement.dto';
import { CreateReplacementLeaveDTO } from '../dto/leave-entitlement/create-replacement-leave.dto';
import { EntitlementRoundingService } from 'src/common/policy/entitlement-rounding/services/entitlement-rounding.service';
import { LeaveTypePropertiesXmlDTO } from 'src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto';
import { CreateEntitlementClaimDTO } from '../dto/leave-entitlement/create-entitlement-claim.dto';
/** XMLparser from zen library  */
var { convertXMLToJson, convertJsonToXML } = require('@zencloudservices/xmlparser');

/**
 * Service for user leave entitlement
 *
 * @export
 * @class UserLeaveEntitlementService
 */
@Injectable()
export class UserLeaveEntitlementService {

    /**
     *Creates an instance of UserLeaveEntitlementService.
     * @param {UserLeaveEntitlementSummaryDbService} userLeaveEntitlementSummaryDbService
     * @param {UserLeaveEntitlementDbService} userLeaveEntitlementDbService
     * @param {UserprofileDbService} userDbService
     * @param {LeavetypeEntitlementDbService} leaveEntitlementDbService
     * @param {UserInfoService} userInfoDbService
     * @param {ServiceYearCalc} serviceYearCalcService
     * @param {ProratedDateEndYearService} proratedMonthEndYearService
     * @memberof UserLeaveEntitlementService
     */
    constructor(
        private readonly userLeaveEntitlementSummaryDbService: UserLeaveEntitlementSummaryDbService,
        private readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService,
        // private readonly userDbService: UserprofileDbService,
        // private readonly leaveEntitlementDbService: LeavetypeEntitlementDbService,
        // private readonly userInfoDbService: UserInfoService,
        private readonly userEntitlementAssignEntitlement: UserEntitlementAssignEntitlement,
        // private readonly serviceYearCalcService: ServiceYearCalc,
        // private readonly proratedMonthEndYearService: ProratedDateEndYearService,
        // private readonly proratedMonthCurrentMonthService: ProratedDateCurrentMonthService,
        private readonly entitlementRoundingService: EntitlementRoundingService
    ) { }

    public assignEntitlementClaim([entitlementClaim, user]: [CreateEntitlementClaimDTO, any]) {
        // let resource = new Resource(new Array);
        entitlementClaim.data.forEach(element => {
            this.userLeaveEntitlementDbService.findByFilterV2([], [`(TENANT_GUID=${user.TENANT_GUID})`, `(USER_GUID=${element.userId})`, `(PARENT_FLAG=1)`, `(YEAR=${new Date().getFullYear()})`]).pipe(map(res => {
                console.log(res);
                let model = new UserLeaveEntitlementModel();
                let resource = new Resource(new Array);
                model.USER_LEAVE_ENTITLEMENT_GUID = v1();
                model.USER_GUID = element.userId;
                model.LEAVE_TYPE_GUID = element.leaveTypeId;
                model.ENTITLEMENT_GUID = res[0].ENTITLEMENT_GUID;
                model.YEAR = res[0].YEAR;
                model.DAYS_ADDED = parseFloat(element.noOfDays);
                model.CF_FLAG = 0;
                model.PARENT_FLAG = 0;
                model.EXPIREDATE = new Date(element.expiredDate);
                model.REMARKS = 'REPLACEMENT LEAVE';
                model.PROPERTIES_XML = res[0].PROPERTIES_XML;
                model.CREATION_USER_GUID = user.USER_GUID;
                model.TENANT_GUID = user.TENANT_GUID;
                model.ACTIVE_FLAG = 1;

                resource.resource.push(model);
                console.log(resource);
                this.userLeaveEntitlementDbService.createByModel(resource, [], [], []).subscribe(
                    data => { console.log(data.data.resource); },
                    err => { console.log(err); }
                );
            })).subscribe(
                data => { //console.log(data); 
                },
                err => { //console.log(err); 
                }
            );
        });
        // console.log(resource);
        return of(entitlementClaim);
    }

    // /**
    //  * Method get entitlement list
    //  *
    //  * @param {string} tenantId
    //  * @param {string} userId
    //  * @returns
    //  * @memberof UserLeaveEntitlementService
    //  */
    // public getEntitlementListTemp(tenantId: string, userId: string) {
    //     const userFilter = ['(USER_GUID=' + userId + ')', '(TENANT_GUID=' + tenantId + ')'];
    //     const fields = ['LEAVE_TYPE_GUID', 'ENTITLEMENT_GUID', 'ABBR', 'LEAVE_CODE', 'ENTITLED_DAYS', 'TOTAL_APPROVED', 'TOTAL_PENDING', 'BALANCE_DAYS'];

    //     return this.userLeaveEntitlementSummaryDbService.findByFilterV2(fields, userFilter);
    // }
    /**
         * Method get entitlement list
         *
         * @param {string} tenantId
         * @param {string} userId
         * @returns
         * @memberof UserLeaveEntitlementService
         */
    public getEntitlementList(tenantId: string, userId: string) {
        const userFilter = ['(USER_GUID=' + userId + ')', '(TENANT_GUID=' + tenantId + ')', '(YEAR=' + moment().format('YYYY') + ')'];
        const fields = ['USER_LEAVE_ENTITLEMENT_GUID', 'JOIN_DATE', 'CONFIRMATION_DATE', 'LEAVE_TYPE_GUID', 'ENTITLEMENT_GUID', 'ABBR', 'LEAVE_CODE', 'ENTITLED_DAYS', 'ADJUSTMENT_DAYS', 'TOTAL_APPROVED', 'TOTAL_PENDING', 'BALANCE_DAYS'];

        return this.userLeaveEntitlementSummaryDbService.findByFilterV2(fields, userFilter).pipe(
            mergeMap(res => {
                if (res.length == 0)
                    return of([]);

                let arrTemp = [];
                res.forEach(element => {
                    arrTemp.push(element.ENTITLEMENT_GUID);
                });
                let entitlementPolicy = this.userEntitlementAssignEntitlement.leaveEntitlementDbService.findByFilterV2([], ['(ENTITLEMENT_GUID IN (' + arrTemp + '))']);
                // return { res, entitlementPolicy };
                return forkJoin(of(res), entitlementPolicy);
            }), map(res => {
                if (res.length == 0)
                    return [];

                let entitlementData = res[0];
                let leavetypePolicy = res[1];

                let MCData = entitlementData.find(x => x.ABBR === 'ML');
                entitlementData.forEach(element => {
                    let findData = leavetypePolicy.find(x => x.ENTITLEMENT_GUID === element.ENTITLEMENT_GUID);
                    let leavePolicy = convertXMLToJson(findData.PROPERTIES_XML);

                    let dateIndicator = this.dateToValidate([element.JOIN_DATE, element.CONFIRMATION_DATE, leavePolicy]);


                    let { entitledDaysFinal, totalentitled } = this.entitledCount([dateIndicator, leavePolicy]);
                    element.ENTITLED_DAYS = totalentitled;

                    // console.log(element.ENTITLED_DAYS);
                    // if (leavePolicy.leaveEntitlementType.toUpperCase() == ('Prorated from date-of-confirm to current month').toUpperCase() || leavePolicy.leaveEntitlementType.toUpperCase() == ('Prorated from date-of-join to current month').toUpperCase()) {
                    //     let currentmonth = moment().format('M') as any;
                    //     // element.ENTITLED_DAYS = this.entitlementRoundingService.leaveEntitlementRounding(element.ENTITLED_DAYS, leavePolicy.leaveEntitlementRounding);

                    //     let earnedLeave = (element.ENTITLED_DAYS / 12) * currentmonth;
                    //     // earnedLeave = this.entitlementRoundingService.leaveEntitlementRounding(earnedLeave, leavePolicy.leaveEntitlementRounding);
                    //     // earnedLeave = (Math.floor(earnedLeave * 4) / 4);
                    //     element.EARNED_LEAVE = earnedLeave;
                    // } else {
                    //     // element.ENTITLED_DAYS = this.entitlementRoundingService.leaveEntitlementRounding(element.ENTITLED_DAYS, leavePolicy.leaveEntitlementRounding);
                    element.EARNED_LEAVE = entitledDaysFinal;//element.ENTITLED_DAYS;
                    //     // element.EARNED_LEAVE = this.entitlementRoundingService.leaveEntitlementRounding(element.EARNED_LEAVE, leavePolicy.leaveEntitlementRounding);
                    // }
                    // console.log(element.EARNED_LEAVE);
                    element.EARNED_LEAVE = this.entitlementRoundingService.leaveEntitlementRounding(element.EARNED_LEAVE, leavePolicy.leaveEntitlementRounding);
                    // console.log(element.EARNED_LEAVE);
                    if (element.ABBR == 'HL') {
                        element.TOTAL_PENDING = element.TOTAL_PENDING + MCData.TOTAL_PENDING;
                        element.TOTAL_APPROVED = element.TOTAL_APPROVED + MCData.TOTAL_APPROVED;
                        element.ADJUSTMENT_DAYS = MCData.ADJUSTMENT_DAYS;
                    }

                    element.POLICY_ROUNDING = leavePolicy.leaveEntitlementRounding.toLowerCase();
                    element.POLICY_TYPE = leavePolicy.leaveEntitlementType.toLowerCase();
                    element.BALANCE_DAYS = (element.EARNED_LEAVE - element.TOTAL_APPROVED - element.TOTAL_PENDING);
                    // element.BALANCE_DAYS = this.entitlementRoundingService.leaveEntitlementRounding(element.BALANCE_DAYS, leavePolicy.leaveEntitlementRounding);
                    // element.ADJUSTMENT_DAYS = element.ADJUSTMENT_DAYS;
                    element.TOTAL_APPROVED = element.TOTAL_APPROVED.toFixed(2);
                    element.TOTAL_PENDING = element.TOTAL_PENDING.toFixed(2);

                    element.EARNED_LEAVE = element.EARNED_LEAVE.toFixed(2);

                    // console.log(element.ENTITLED_DAYS);
                    element.ENTITLED_DAYS = this.entitlementRoundingService.leaveEntitlementRounding(element.ENTITLED_DAYS, leavePolicy.leaveEntitlementRounding);
                    // console.log(element.ENTITLED_DAYS);
                    element.ADJUSTMENT_DAYS = element.ADJUSTMENT_DAYS ? element.ADJUSTMENT_DAYS : 0;

                    element.ENTITLED_DAYS = element.ENTITLED_DAYS.toFixed(2);
                    element.BALANCE_DAYS = parseFloat(element.BALANCE_DAYS.toFixed(2)) + parseFloat(element.ADJUSTMENT_DAYS);

                });
                return entitlementData;
            })
        );
    }

    public dateToValidate([dateJoin, dateConfirm, policyEntitlement]: [any, any, LeaveTypePropertiesXmlDTO]) {
        if (policyEntitlement.leaveEntitlementType.toUpperCase() == "PRORATED FROM DATE-OF-CONFIRM TO CURRENT MONTH" || policyEntitlement.leaveEntitlementType.toUpperCase() == "PRORATED FROM DATE-OF-CONFIRM TO END OF YEAR") {
            return dateConfirm;
        }
        else {
            return dateJoin;
        }
    }

    public entitledCount([dateOfSet, policyJson]: [any, LeaveTypePropertiesXmlDTO]) {
        let totalentitled = 0;
        let entitledTillMonth = 0;
        for (var i = 1; i <= 12; i++) {

            var d = new Date(new Date().getFullYear(), i, 1, 1);

            let yearOfService = moment.duration(moment(d).diff(dateOfSet)).asMonths();

            yearOfService = yearOfService / 12;

            policyJson.levels.leaveEntitlement = Array.isArray(policyJson.levels.leaveEntitlement) ? policyJson.levels.leaveEntitlement : [policyJson.levels.leaveEntitlement];
            let currentLevel = policyJson.levels.leaveEntitlement.find(x => x.serviceYearFrom <= yearOfService && x.serviceYearTo > yearOfService);

            if (currentLevel != undefined) {

                let totalDaysInMonth = moment(d).subtract(1, 'days').format('DD');

                let daysOfService = moment.duration(moment(d).diff(dateOfSet)).asDays();

                let byMonthEntitled = currentLevel.entitledDays / 12;

                if (daysOfService <= parseInt(totalDaysInMonth)) {
                    byMonthEntitled = byMonthEntitled / parseInt(totalDaysInMonth) * daysOfService;
                }

                totalentitled += byMonthEntitled;

                if (new Date().getMonth() == d.getMonth()) {
                    entitledTillMonth = totalentitled;
                }

            }

        }

        let yearOfServiceFull = moment.duration(moment().diff(dateOfSet)).asYears();

        let currentLevel = policyJson.levels.leaveEntitlement.find(x => x.serviceYearFrom <= yearOfServiceFull && x.serviceYearTo > yearOfServiceFull);

        let monthOfService = moment.duration(moment().diff(dateOfSet)).asMonths();

        let after12Month = 0;
        if (monthOfService > 12) {
            let yearService = (monthOfService - 12) / 12;

            let levelAfterDeduct = policyJson.levels.leaveEntitlement.find(x => x.serviceYearFrom <= yearService && x.serviceYearTo > yearService);
            after12Month = levelAfterDeduct.entitledDays;
        }

        let entitledDaysFinal = 0;

        if (policyJson.leaveEntitlementType.toUpperCase() == "ENTITLED IN FULL") {
            entitledDaysFinal = currentLevel.entitledDays;
            totalentitled = currentLevel.entitledDays;
        } else if (policyJson.leaveEntitlementType.toUpperCase() == "PRORATED FROM DATE-OF-JOIN TO CURRENT MONTH" || policyJson.leaveEntitlementType.toUpperCase() == "PRORATED FROM DATE-OF-CONFIRM TO CURRENT MONTH") {
            entitledDaysFinal = entitledTillMonth;
        } else if (policyJson.leaveEntitlementType.toUpperCase() == "PRORATED FROM DATE-OF-JOIN TO END OF YEAR" || policyJson.leaveEntitlementType.toUpperCase() == "PRORATED FROM DATE-OF-CONFIRM TO END OF YEAR") {
            entitledDaysFinal = totalentitled;
        } else if (policyJson.leaveEntitlementType.toUpperCase() == "LEAVE ENTITLED AFTER 12 MONTHS") {
            entitledDaysFinal = after12Month;
            totalentitled = entitledDaysFinal;
        }

        return { entitledDaysFinal, totalentitled };
    }

    /**
     * Method to assign entitlement
     * In one time, only 1 policy can active for each type of main leave
     *
     * @param {*} user
     * @param {AssignLeavePolicyDTO} data
     * @returns
     * @memberof UserLeaveEntitlementService
     */
    public assignEntitlement([user, data, process]: [any, any, string]) {
        if (process == 'replacement') {
            return this.userEntitlementAssignEntitlement.assignReplacementLeave(user, data);
        } else {
            // return this.userEntitlementAssignEntitlement.assignEntitlement(user, data);
            return this.userEntitlementAssignEntitlement.assignLeaveEntitlement(user, data);
        }
    }

    // public updateLeaveEntitlement(user: any, d: UpdateUserLeaveEntitlementDTO) {
    //     const resource = new Resource(new Array);
    //     const data = new UserLeaveEntitlementModel();

    //     data.USER_GUID = d.userGuid;
    //     data.LEAVE_TYPE_GUID = d.leavetypeGuid;
    //     data.ENTITLEMENT_GUID = d.leavetypeEntitlementGuid;
    //     data.YEAR = d.year;
    //     data.DAYS_ADDED = d.daysAdded;
    //     data.CF_FLAG = d.cfFlag;
    //     data.PARENT_FLAG = d.parentFlag;
    //     data.EXPIREDATE = d.expiredDate;
    //     data.REMARKS = d.remarks;
    //     data.PROPERTIES_XML = d.propertiesXML;
    //     data.ACTIVE_FLAG = d.activeFlag;
    //     data.UPDATE_TS = new Date().toISOString();
    //     data.UPDATE_USER_GUID = user.USER_GUID;

    //     resource.resource.push(data);

    //     return this.userEntitlementAssignEntitlement.userLeaveEntitlementDbService.updateByModel(resource, [], ['(USER_LEAVE_ENTITLEMENT_GUID=' + d.userLeaveEntitlementGuid + ')'], ['USER_GUID', 'LEAVE_TYPE_GUID', 'ENTITLEMENT_GUID', 'USER_LEAVE_ENTITLEMENT_GUID']);
    // }

    /**
     * Delete leave entitlement
     *
     * @param {*} user
     * @param {string} userleave_entitlement_guid
     * @returns
     * @memberof UserLeaveEntitlementService
     */
    public deleteLeaveEntitlement(user: any, userleave_entitlement_guid: string) {
        const resource = new Resource(new Array);
        const data = new UserLeaveEntitlementModel();

        data.DELETED_AT = new Date().toISOString();
        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;
        data.ACTIVE_FLAG = 0;

        resource.resource.push(data);

        return this.userEntitlementAssignEntitlement.userLeaveEntitlementDbService.updateByModel(resource, [], ['(USER_LEAVE_ENTITLEMENT_GUID=' + userleave_entitlement_guid + ')'], ['USER_GUID', 'LEAVE_TYPE_GUID', 'ENTITLEMENT_GUID']);
    }

    // // in one time, only 1 policy can active for each type of main leave
    // /**
    //  * Method to assign entitlement
    //  * In one time, only 1 policy can active for each type of main leave
    //  *
    //  * @param {*} user
    //  * @param {AssignLeavePolicyDTO} data
    //  * @returns
    //  * @memberof UserLeaveEntitlementService
    //  */
    // public assignEntitlement(user: any, data: AssignLeavePolicyDTO) {

    //     //check if the user belong to this tenant
    //     const userFilter = ['(USER_GUID IN (' + data.userId + '))', '(TENANT_GUID=' + user.TENANT_GUID + ')']

    //     return this.dbSearch(this.userDbService, userFilter)
    //         .pipe(
    //             filter(x => x != null),
    //             switchMap(() => {
    //                 //check if current leavetype has active policy
    //                 const userEntitlementFilter = [
    //                     '(TENANT_GUID=' + user.TENANT_GUID + ')', '(ENTITLEMENT_GUID=' + data.leaveEntitlementId + ')',
    //                     '(LEAVE_TYPE_GUID=' + data.leaveTypeId + ')', '(USER_GUID IN (' + data.userId + '))', '(ACTIVE_FLAG=1)'
    //                 ]

    //                 const dataTemp = this.dbSearch(this.userLeaveEntitlementDbService, userEntitlementFilter);

    //                 return dataTemp;

    //             }),
    //             filter(x => x == null),
    //             switchMap(() => {

    //                 // check if combination of main leave and entitlement def exist
    //                 const entitlementFilter = [
    //                     '(TENANT_GUID=' + user.TENANT_GUID + ')', '(ENTITLEMENT_GUID=' + data.leaveEntitlementId + ')',
    //                     '(LEAVE_TYPE_GUID=' + data.leaveTypeId + ')', '(ACTIVE_FLAG=true)'
    //                 ];

    //                 return this.dbSearch(this.leaveEntitlementDbService, entitlementFilter);
    //             }),
    //             filter(x => x != null),
    //             mergeMap((res: LeaveTypeEntitlementModel) => {

    //                 const userInfoFilter = ['(TENANT_GUID=' + user.TENANT_GUID + ')', '(USER_GUID IN (' + data.userId + '))']
    //                 // console.log(userInfoFilter);
    //                 return this.dbSearch(this.userInfoDbService, userInfoFilter)
    //                     .pipe(map((userInfoResult) => {
    //                         // console.log(res);
    //                         return { res, userInfoResult }
    //                     }))
    //             }),
    //             mergeMap((res) => {
    //                 // console.log(res.res);
    //                 return this.assignPolicyProcess(res, user, data);

    //             })
    //         )

    // }

    // /**
    //  * Method assign policy process
    //  *
    //  * @param {*} res
    //  * @param {*} user
    //  * @param {*} data
    //  * @returns
    //  * @memberof UserLeaveEntitlementService
    //  */
    // public assignPolicyProcess(res, user, data) {
    //     // console.log(user);
    //     // console.log(data);

    //     const { length } = data.userId;
    //     const resource = new Resource(new Array());

    //     // console.log(length);
    //     for (let i = 0; i < length; i++) {
    //         // console.log(data.userId[i]);
    //         const user = res.userInfoResult.find(x => x.USER_GUID.toString() === data.userId[i].toString());
    //         // console.log(user);
    //         const dateOfJoin = new Date(user.JOIN_DATE);
    //         // get the service year
    //         const serviceYear = this.serviceYearCalcService.calculateEmployeeServiceYear(dateOfJoin);

    //         // console.log(res.res[0].PROPERTIES_XML);

    //         const policy = convertXMLToJson(res.res[0].PROPERTIES_XML);


    //         //get the entitlement days
    //         const entitlementDay = this.proratedMonthEndYearService.calculateEntitledLeave(dateOfJoin, serviceYear, policy);

    //         if (entitlementDay == 0 || entitlementDay == undefined) {
    //             return of(null);
    //         }

    //         // assign new policy to user
    //         const entitlementModel = new UserLeaveEntitlementModel();
    //         entitlementModel.USER_LEAVE_ENTITLEMENT_GUID = v1();
    //         entitlementModel.LEAVE_TYPE_GUID = data.leaveTypeId;
    //         entitlementModel.ENTITLEMENT_GUID = data.leaveEntitlementId;
    //         entitlementModel.USER_GUID = data.userId[i];

    //         entitlementModel.PARENT_FLAG = 1;
    //         entitlementModel.CF_FLAG = 0;
    //         entitlementModel.PROPERTIES_XML = res.res[0].PROPERTIES_XML;
    //         entitlementModel.YEAR = moment().year();
    //         entitlementModel.REMARKS = null;
    //         entitlementModel.ACTIVE_FLAG = 1;

    //         entitlementModel.TENANT_GUID = user.TENANT_GUID;
    //         entitlementModel.CREATION_USER_GUID = user.USER_GUID;

    //         entitlementModel.DAYS_ADDED = entitlementDay;



    //         resource.resource.push(entitlementModel);

    //     }

    //     // console.log(resource);

    //     // const dateOfJoin = new Date(res.userInfoResult.JOIN_DATE);
    //     // // get the service year
    //     // const serviceYear = this.serviceYearCalcService.calculateEmployeeServiceYear(dateOfJoin);

    //     // const policy = convertXMLToJson(res.res.PROPERTIES_XML);

    //     // // //get the entitlement days
    //     // const entitlementDay = this.proratedMonthEndYearService.calculateEntitledLeave(dateOfJoin, serviceYear, policy);

    //     // if (entitlementDay == 0 || entitlementDay == undefined) {
    //     //     return of(null);
    //     // }

    //     // // assign new policy to user
    //     // const entitlementModel = new UserLeaveEntitlementModel();
    //     // entitlementModel.USER_LEAVE_ENTITLEMENT_GUID = v1();
    //     // entitlementModel.LEAVE_TYPE_GUID = data.leaveTypeId;
    //     // entitlementModel.ENTITLEMENT_GUID = data.leaveEntitlementId;
    //     // entitlementModel.USER_GUID = data.userId;

    //     // entitlementModel.PARENT_FLAG = 1;
    //     // entitlementModel.CF_FLAG = 0;
    //     // entitlementModel.PROPERTIES_XML = res.res.PROPERTIES_XML;
    //     // entitlementModel.YEAR = moment().year();
    //     // entitlementModel.REMARKS = 'this is remark';
    //     // entitlementModel.ACTIVE_FLAG = 1;

    //     // entitlementModel.TENANT_GUID = user.TENANT_GUID;
    //     // entitlementModel.CREATION_USER_GUID = user.USER_GUID;

    //     // entitlementModel.DAYS_ADDED = entitlementDay;

    //     // const resource = new Resource(new Array());

    //     // resource.resource.push(entitlementModel);

    //     return this.userLeaveEntitlementDbService.createByModel(resource, [], [], [])
    //         .pipe(map(res => {
    //             if (res.status == 200) {
    //                 return res.data.resource;
    //             }
    //         }))
    // }

    // /**
    //  * Method db search
    //  *
    //  * @private
    //  * @param {IDbService} IDbService
    //  * @param {string[]} filter
    //  * @returns
    //  * @memberof UserLeaveEntitlementService
    //  */
    // private dbSearch(IDbService: IDbService, filter: string[]) {
    //     return IDbService.findByFilterV2([], filter)
    //         .pipe(
    //             map(res => {
    //                 if (res.length > 0) {
    //                     return res;
    //                 }

    //             })
    //         )
    // }
}