import { Injectable } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { LeaveTransactionDbService } from 'src/api/leave/db/leave-transaction.db.service';
import { Observable, pipe, of, forkJoin } from 'rxjs';
import { CommonFunctionService } from '../../common/helper/common-function.services';
import { UpdateApprovalDTO } from './dto/update-approval.dto';
import { Resource } from 'src/common/model/resource.model';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import { EmailNodemailerService } from 'src/common/helper/email-nodemailer.service';
import { UserInfoService } from '../user-info/user-info.service';
import { XMLParserService } from '../../common/helper/xml-parser.service';
import { threadId } from 'worker_threads';

/**
 * Service for approval override
 *
 * @export
 * @class ApprovalOverrideService
 */
@Injectable()
export class ApprovalOverrideService {
  /**
   *Creates an instance of ApprovalOverrideService.
   * @param {LeaveTransactionDbService} leaveTransactionDbService
   * @param {CommonFunctionService} commonFunctionService
   * @memberof ApprovalOverrideService
   */
  constructor(
    private readonly leaveTransactionDbService: LeaveTransactionDbService,
    private readonly commonFunctionService: CommonFunctionService,
    private readonly userService: UserService,
    private readonly emailNodemailerService: EmailNodemailerService,
    private readonly userInfoService: UserInfoService,
    private readonly xmlParserService: XMLParserService) {
  }

  /**
   * Find all pending leave
   *
   * @param {string} TENANT_GUID
   * @returns {Observable<any>}
   * @memberof ApprovalOverrideService
   */
  public findAllPendingLeave(TENANT_GUID: string): Observable<any> {
    let result = this.leaveTransactionDbService.findAll(TENANT_GUID);
    return this.commonFunctionService.getListData(result);
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
    let result = this.leaveTransactionDbService.updateToEmployee(user, data);

    result.subscribe(data => {
      data.data.resource.forEach(element => {
        // console.log(element.USER_GUID);
        let userguid = '4C693DBE-4CC0-4DD1-9708-5E8FDFE35A83';
        let userData = this.userInfoService.findOne(userguid, user.TENANT_GUID).subscribe(
          data => {
            let tempData = data.data.resource[0];
            // console.log(tempData);
            // console.log(tempData.PROPERTIES_XML);
            let dataObj = this.xmlParserService.convertXMLToJson(tempData.PROPERTIES_XML);
            // console.log(dataObj.email);
            // console.log(dataObj.notificationRule);
            if (dataObj.notificationRule) {
              this.sendEmailNotify(user, dataObj.notificationRule);
            } else {
              // console.log('Notification email not exist');
            }
          }, err => {

          }
        );
      });
    }
    );

    // console.log(data);
    // console.log(result);

    return result;
  }


  public sendEmailNotify(user: any, userId: string[]): Observable<any> {
    let successList = [];
    let failedList = [];

    let emailArr = this.userService.findEmail(userId).pipe(
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
          // console.log(element.EMAIL);
          this.sendEmailV2(element.EMAIL, "Farah");
        });
        return res;
      })).subscribe(data => {
        // console.log(data);
        return data;
      }, err => {
        return err;
      })

    return of(emailArr);
  }

  private sendEmailV2(email: string, token: string) {
    // console.log('before function');
    let results = this.emailNodemailerService.mailProcessApprove(email, token);
    // console.log('after function');
    // console.log(results);
    return results;
  }

}