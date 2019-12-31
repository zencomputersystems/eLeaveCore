import { Injectable } from '@nestjs/common';
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
    public commonFunctionService: CommonFunctionService) {
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
    private readonly pendingLeaveService: PendingLeaveService) {
  }

  /**
   * Find all pending leave
   *
   * @param {string} TENANT_GUID
   * @returns {Observable<any>}
   * @memberof ApprovalOverrideService
   */
  public findAllPendingLeave(TENANT_GUID: string): Observable<any> {
    return this.approvalOverrideServiceRef2.leaveTransactionDbService.findAll(TENANT_GUID).pipe(
      mergeMap(async res => {
        if (res.status == 200 && res.data.resource.length > 0) {
          return await this.getPendingLeaveData([res, TENANT_GUID]);
        }
      }), map(res => {
        let finalData = [];

        res.forEach(element => {
          let dataRes = {};
          let personal = element.userData;
          dataRes['leaveTransactionId'] = element.LEAVE_TRANSACTION_GUID;
          dataRes['employeeName'] = personal.FULLNAME;
          dataRes['staffNumber'] = personal.STAFF_ID;
          dataRes['status'] = element.STATUS;
          dataRes['startDate'] = element.START_DATE;
          dataRes['endDate'] = element.END_DATE;
          dataRes['noOfDays'] = element.NO_OF_DAYS;
          dataRes['timeSlot'] = element.TIME_SLOT;
          dataRes['dateApplied'] = element.CREATION_TS;
          dataRes['leaveTypeAbbr'] = element.leavetypeAbbr;
          dataRes['departmentName'] = personal.DEPARTMENT;
          dataRes['companyName'] = element.companyName;

          finalData.push(dataRes);
        });

        return finalData;
      }));
  }

  public async getPendingLeaveData([res, TENANT_GUID]) {
    let userGuid = [];
    res.data.resource.forEach(element => {
      userGuid.push(element.USER_GUID);
    });

    let companyList = await this.pendingLeaveService.getCompanyList(TENANT_GUID) as any[];
    let leaveTypeList = await this.pendingLeaveService.getLeavetypeList(TENANT_GUID) as any[];
    let resultAll = await this.pendingLeaveService.getUserInfo(userGuid) as any[];

    for (let i = 0; i < res.data.resource.length; i++) {
      let findData = resultAll.find(x => x.USER_GUID === res.data.resource[i].USER_GUID);
      let findCompanyData = companyList.find(x => x.TENANT_COMPANY_GUID === findData.TENANT_COMPANY_GUID);
      let findLeaveData = leaveTypeList.find(x => x.LEAVE_TYPE_GUID === res.data.resource[i].LEAVE_TYPE_GUID);

      res.data.resource[i].userData = findData;
      res.data.resource[i].companyName = findCompanyData.NAME;
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
    result.subscribe(data => {
      data.data.resource.forEach(element => {
        this.checkMailAvailable(user, element);
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
  public checkMailAvailable(user, element) {
    if (element.status == 'APPROVE') {
      let userData = this.approvalOverrideServiceRef1.approvalOverrideServiceRef4.userInfoService.findOne(element.USER_GUID, user.TENANT_GUID).subscribe(
        data => {
          let tempData = data.data.resource[0];
          this.sendEmailToNotifier(user, tempData);
        }, err => { }
      );
    }
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
      if (dataObj.notificationRule) {
        this.sendEmailNotify(user, dataObj.notificationRule);
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
  public sendEmailNotify(user: any, userId: string[]): Observable<any> {
    let successList = [];
    let failedList = [];

    let emailArr = this.approvalOverrideServiceRef1.approvalOverrideServiceRef4.userService.findEmail(userId).pipe(
      map(res => {
        userId.forEach(element => {
          let emailToSend = res.data.resource.find(x => x.USER_GUID.toString() === element.toString());
          if (emailToSend) {
            successList.push(emailToSend);
          } else {
            failedList.push(element.toString());
          }
        });
        return { successList, failedList };
      }), map(res => {
        res.successList.forEach(element => {
          this.sendEmailV2(element.EMAIL, "Farah");
        });
        return res;
      })).subscribe(data => {
        return data;
      }, err => {
        return err;
      })

    return of(emailArr);
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
  private sendEmailV2(email: string, token: string) {
    let results = this.approvalOverrideServiceRef1.emailNodemailerService.mailProcessApprove(email, token);
    return results;
  }

}