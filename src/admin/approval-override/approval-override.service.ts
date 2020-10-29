import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { LeaveTransactionDbService } from 'src/api/leave/db/leave-transaction.db.service';
import { Observable, pipe, of, forkJoin } from 'rxjs';
import { CommonFunctionService } from '../../common/helper/common-function.services';
import { UpdateApprovalDTO } from './dto/update-approval.dto';
import { Resource } from 'src/common/model/resource.model';
import { UserService } from '../user/user.service';
import { map, mergeMap, find } from 'rxjs/operators';
import { EmailNodemailerService } from 'src/common/helper/email-nodemailer.service';
import { UserInfoService } from '../user-info/user-info.service';
import { threadId } from 'worker_threads';
import { UserprofileDbService } from 'src/api/userprofile/db/userprofile.db.service';
import { CompanyDbService } from '../company/company.service';
import { LeavetypeService } from '../leavetype/leavetype.service';
import { PendingLeaveService } from './pending-leave.service';
import { CompanyModel } from '../company/model/company.model';
import { LeaveTypeModel } from '../leavetype/model/leavetype.model';
import { LeaveTransactionLogDbService } from 'src/api/leave/db/leave-transaction-log.db.service';
import { ApprovalService } from '../../common/approval/service/approval.service';
import { runServiceCallback } from 'src/common/helper/basic-functions';
/** XMLparser from zen library  */
var { convertXMLToJson } = require('@zencloudservices/xmlparser');

/**
 * Chain reference 4
 *
 * @export
 * @class ApprovalOverrideServiceRef4
 */
@Injectable()
export class ApprovalOverrideServiceRef4 {
  /**
   *Creates an instance of ApprovalOverrideServiceRef4.
   * @param {UserInfoService} userInfoService userInfoService
   * @param {UserService} userService userService
   * @memberof ApprovalOverrideServiceRef4
   */
  constructor(
    public userInfoService: UserInfoService,
    public userService: UserService) {
  }
}
/**
 * Chain reference 2
 *
 * @export
 * @class ApprovalOverrideServiceRef2
 */
@Injectable()
export class ApprovalOverrideServiceRef2 {
  /**
   *Creates an instance of ApprovalOverrideServiceRef2.
   * @param {LeaveTransactionDbService} leaveTransactionDbService leaveTransactionDbService
   * @param {CommonFunctionService} commonFunctionService commonFunctionService
   * @memberof ApprovalOverrideServiceRef2
   */
  constructor(
    public leaveTransactionDbService: LeaveTransactionDbService,
    public commonFunctionService: CommonFunctionService,
    public approvalService: ApprovalService) {
  }
}
/**
 * Chain reference 1
 *
 * @export
 * @class ApprovalOverrideServiceRef1
 */
@Injectable()
export class ApprovalOverrideServiceRef1 {
  /**
   *Creates an instance of ApprovalOverrideServiceRef1.
   * @param {EmailNodemailerService} emailNodemailerService EmailNodemailerService
   * @param {ApprovalOverrideServiceRef4} approvalOverrideServiceRef4 approvalOverrideServiceRef4
   * @memberof ApprovalOverrideServiceRef1
   */
  constructor(
    public emailNodemailerService: EmailNodemailerService,
    public approvalOverrideServiceRef4: ApprovalOverrideServiceRef4) {
  }
}

/**
 * Service for approval override
 *
 * @export
 * @class ApprovalOverrideService
 */
@Injectable()
export class ApprovalOverrideService {
  // /**
  //  *Creates an instance of ApprovalOverrideService.
  //  * @param {LeaveTransactionDbService} leaveTransactionDbService
  //  * @param {CommonFunctionService} commonFunctionService
  //  * @memberof ApprovalOverrideService
  //  */
  // constructor(
  //   private readonly leaveTransactionDbService: LeaveTransactionDbService,
  //   private readonly commonFunctionService: CommonFunctionService,
  //   private readonly userService: UserService,
  //   private readonly emailNodemailerService: EmailNodemailerService,
  //   private readonly userInfoService: UserInfoService) {
  // }

  /**
   *Creates an instance of ApprovalOverrideService.
   * @param {ApprovalOverrideServiceRef1}  approvalOverrideServiceRef1 approvalOverrideServiceRef1
   * @param {ApprovalOverrideServiceRef2} approvalOverrideServiceRef2 approvalOverrideServiceRef2
   * @memberof ApprovalOverrideService
   */
  constructor(
    private readonly approvalOverrideServiceRef1: ApprovalOverrideServiceRef1,
    private readonly approvalOverrideServiceRef2: ApprovalOverrideServiceRef2,
    // private readonly userprofileDbService: UserprofileDbService,
    // private readonly companyDbService: CompanyDbService,
    // private readonly leavetypeService: LeavetypeService,
    private readonly pendingLeaveService: PendingLeaveService,
    private readonly leaveTransactionLogDbService: LeaveTransactionLogDbService,
    private readonly approvalService: ApprovalService) {
  }

  /**
   * Find all pending leave
   *
   * @param {string} TENANT_GUID
   * @returns {Observable<any>}
   * @memberof ApprovalOverrideService
   */
  public findAllPendingLeave(TENANT_GUID: string): Observable<any> {
    let method = this.approvalOverrideServiceRef2.leaveTransactionDbService.findAll(TENANT_GUID);
    return this.getLeaveData([method, TENANT_GUID]);
  }

  /**
   * Get all own leave
   *
   * @param {[string, string]} [USER_GUID, TENANT_GUID]
   * @returns {Observable<any>}
   * @memberof ApprovalOverrideService
   */
  public findAllOwnLeave([USER_GUID, TENANT_GUID]: [string, string]): Observable<any> {
    let method = this.approvalOverrideServiceRef2.leaveTransactionDbService.findOwn(USER_GUID);
    return this.getLeaveData([method, TENANT_GUID]);
  }

  /**
   * Run query get leave
   *
   * @private
   * @param {[Observable<any>, string]} [method, tenantId]
   * @returns
   * @memberof ApprovalOverrideService
   */
  private getLeaveData([method, tenantId]: [Observable<any>, string]) {
    return method.pipe(
      mergeMap(async res => {

        if (res.status == 200 && res.data.resource.length > 0) {
          return await this.getPendingLeaveData([res, tenantId]);
        } else {
          throw { "status": "No leave applied" };
        }
      }), map(res => {
        let finalData = [];

        res.forEach(element => {
          let dataRes = {};
          let personal = element.userData;
          dataRes['leaveTransactionId'] = element.LEAVE_TRANSACTION_GUID;
          dataRes['entitlementId'] = element.ENTITLEMENT_GUID;
          dataRes['employeeName'] = personal.FULLNAME;
          dataRes['companyId'] = element.TENANT_COMPANY_GUID;
          dataRes['staffNumber'] = personal.STAFF_ID;
          dataRes['status'] = element.STATUS;
          dataRes['startDate'] = element.START_DATE;
          dataRes['endDate'] = element.END_DATE;
          dataRes['noOfDays'] = element.NO_OF_DAYS;
          dataRes['timeSlot'] = element.TIME_SLOT;
          dataRes['dateApplied'] = element.CREATION_TS;
          dataRes['reason'] = element.REASON;
          dataRes['leaveTypeName'] = element.leavetypeName;
          dataRes['leaveTypeId'] = element.LEAVE_TYPE_GUID;
          dataRes['leaveTypeAbbr'] = element.leavetypeAbbr;
          dataRes['departmentName'] = personal.DEPARTMENT;
          dataRes['companyName'] = element.companyName;

          finalData.push(dataRes);
        });

        return finalData;
      }));
  }

  /**
   * Get pending leave data
   *
   * @param {*} [res, TENANT_GUID]
   * @returns
   * @memberof ApprovalOverrideService
   */
  public async getPendingLeaveData([res, TENANT_GUID]) {
    let userGuid = [];
    res.data.resource.forEach(element => {
      userGuid.push(element.USER_GUID);
    });

    let companyList = await this.pendingLeaveService.getCompanyList(TENANT_GUID) as CompanyModel[];
    let leaveTypeList = await this.pendingLeaveService.getLeavetypeList(TENANT_GUID) as LeaveTypeModel[];
    let resultAll = await this.pendingLeaveService.getUserInfo(userGuid) as any[];

    for (let i = 0; i < res.data.resource.length; i++) {
      let findData = resultAll.find(x => x.USER_GUID === res.data.resource[i].USER_GUID);
      let findCompanyData = companyList.find(x => x.TENANT_COMPANY_GUID === findData.TENANT_COMPANY_GUID);
      let findLeaveData = leaveTypeList.find(x => x.LEAVE_TYPE_GUID === res.data.resource[i].LEAVE_TYPE_GUID);
      if (!findLeaveData) {
        findLeaveData['CODE'] = null;
        findLeaveData['ABBR'] = null;
      }
      res.data.resource[i].userData = findData;
      res.data.resource[i].companyName = findCompanyData.NAME;
      res.data.resource[i].leavetypeName = findLeaveData.CODE;
      res.data.resource[i].leavetypeAbbr = findLeaveData.ABBR;
    }
    return await res.data.resource;
  }

  /**
   * Update approval override
   *
   * @param {*} user
   * @param {UpdateApprovalDTO} data
   * @returns
   * @memberof ApprovalOverrideService
   */
  public updateToEmployee(user: any, data: UpdateApprovalDTO) {
    let result = this.approvalOverrideServiceRef2.leaveTransactionDbService.updateToEmployee(user, data);
    result.pipe(
      map(res => {
        if (res.status == 200) {
          data.leaveTransactionId.forEach(element => {
            this.leaveTransactionLogDbService.create([element, data.status, 'APPROVAL_OVERRIDE', data.remark, user.USER_GUID, user.TENANT_GUID]).subscribe(
              data => { /*console.log(data);*/ }, err => { /*console.log(err);*/ }
            );
          });
        }

        return res;
      })
    ).subscribe(data1 => {
      data1.data.resource.forEach(element => {
        this.checkMailAvailable([user, element, data]);
      });
    });
    return result;
  }

  /**
   * Check mail if available
   *
   * @param {*} user
   * @param {*} element
   * @memberof ApprovalOverrideService
   */
  public checkMailAvailable([user, element, data]) {
    this.approvalService.leaveTransactionService.findByFilterV2([], [`(LEAVE_TRANSACTION_GUID=${element.LEAVE_TRANSACTION_GUID})`]).pipe(
      mergeMap(async res => {

        let leavetypeData = await runServiceCallback(this.approvalService.leavetypeService.findByFilterV2([], [`(LEAVE_TYPE_GUID=${res[0].LEAVE_TYPE_GUID})`])) as any[];

        let applierData = await runServiceCallback(this.approvalService.userprofileDbService.findByFilterV2([], [`(USER_GUID=${element.USER_GUID})`]));

        let managerData = await runServiceCallback(this.approvalService.userprofileDbService.findByFilterV2([], [`(USER_GUID=${applierData[0].MANAGER_USER_GUID})`]).pipe(
          map(res => { return res[0]; })
        )) as any;

        let approverData = await runServiceCallback(this.approvalService.userprofileDbService.findByFilterV2([], [`(USER_GUID=${user.USER_GUID})`])) as any;

        let workingHoursData = await runServiceCallback(this.approvalService.workingHoursDbService.findByFilterV2([], [`(WORKING_HOURS_GUID=${applierData[0].WORKING_HOURS_GUID})`]).pipe(
          map(res => { return res[0]; })
        )) as any;

        workingHoursData = convertXMLToJson(workingHoursData.PROPERTIES_XML);

        workingHoursData = workingHoursData.property;
        let timeDetails = res[0].TIME_SLOT == 'AM' ? workingHoursData.halfday.AM :
          res[0].TIME_SLOT == 'PM' ? workingHoursData.halfday.PM :
            res[0].TIME_SLOT == 'Q1' ? workingHoursData.quarterday.Q1 :
              res[0].TIME_SLOT == 'Q2' ? workingHoursData.quarterday.Q2 :
                res[0].TIME_SLOT == 'Q3' ? workingHoursData.quarterday.Q3 :
                  res[0].TIME_SLOT == 'Q4' ? workingHoursData.quarterday.PQ4 :
                    workingHoursData.fullday;

        if (res[0].STATUS == 'APPROVED') {
          this.approvalService.setupEmailApprove([res[0], res[0], applierData[0], managerData, timeDetails, leavetypeData, data.remark])
        } else if (element.STATUS == 'CANCELLED' || element.STATUS == 'REJECTED') {
          this.approvalService.setupEmailCancel([applierData, leavetypeData, res[0], managerData, data.remark, res[0], approverData[0], timeDetails])
        }
        return res;
      })
    ).subscribe(data => { }, err => { })

    // let leaveTransaction = element;
    // if (element.STATUS == 'APPROVED') {
    //   let userData = this.approvalOverrideServiceRef1.approvalOverrideServiceRef4.userInfoService.findOne(element.USER_GUID, user.TENANT_GUID).subscribe(
    //     data => {
    //       let tempData = data.data.resource[0];
    //       this.sendEmailToNotifier(user, tempData);
    //     }, err => { }
    //   );
    //   let data, res2;
    //   leaveTransaction, data, applierData, managerData, timeDetails, leavetypeData, leaveTransactionReason
    //   this.approvalService.setupEmailApprove([leaveTransaction, data, res2, '', '', '', '']);
    // } else if (element.STATUS == 'CANCELLED' || element.STATUS == 'REJECTED') {
    //   let res2, leavetypeData, managerData, leaveTransactionReason, data = null;
    //   // this.approvalService.setupEmailCancel([res2, leavetypeData, leaveTransaction, managerData, leaveTransactionReason, data])
    // }
  }

  /**
   * Send email to email available
   *
   * @param {*} user
   * @param {*} tempData
   * @memberof ApprovalOverrideService
   */
  public sendEmailToNotifier(user, tempData) {
    if (tempData.PROPERTIES_XML != null && tempData.PROPERTIES_XML != '' && tempData.PROPERTIES_XML != undefined) {
      let dataObj = convertXMLToJson(tempData.PROPERTIES_XML);
      if (dataObj.root.notificationRule) {
        this.sendEmailNotify([user, dataObj.root.notificationRule, tempData.FULLNAME]);
      }
    }
  }

  /**
   * Method to send email notify
   *
   * @param {*} user
   * @param {string[]} userId
   * @returns {Observable<any>}
   * @memberof ApprovalOverrideService
   */
  public sendEmailNotify([user, userId, fullname]: [any, string[], string]): Observable<any> {
    let successList = [];
    let failedList = [];
    successList = userId;
    successList.forEach(element => {
      this.sendEmailV2([element, fullname]);
    });
    return of(successList);

    // let emailArr = this.approvalOverrideServiceRef1.approvalOverrideServiceRef4.userService.findEmail(userId).pipe(
    //   map(res => {
    //     userId.forEach(element => {
    //       let emailToSend = res.data.resource.find(x => x.USER_GUID.toString() === element.toString());
    //       if (emailToSend) {
    //         successList.push(emailToSend);
    //       } else {
    //         failedList.push(element.toString());
    //       }
    //     });
    //     return { successList, failedList };
    //   }), map(res => {
    //     res.successList.forEach(element => {
    //       this.sendEmailV2(element.EMAIL, "Farah");
    //     });
    //     return res;
    //   })).subscribe(data => {
    //     return data;
    //   }, err => {
    //     return err;
    //   })

    // return of(emailArr);
  }

  /**
   * Method to send email
   *
   * @private
   * @param {string} email
   * @param {string} token
   * @returns
   * @memberof ApprovalOverrideService
   */
  private sendEmailV2([email, fullname]: [string, string]) {
    let results = this.approvalOverrideServiceRef1.emailNodemailerService.mailProcessApprove([email, fullname, null, null]);
    return results;
  }

}