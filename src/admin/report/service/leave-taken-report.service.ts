import { Injectable } from '@nestjs/common';
import { ReportDBService } from './report-db.service';
import { map, filter, mergeMap, find } from 'rxjs/operators';
import { LeaveTakenReportDto, LeaveTakenDetailsDto } from '../dto/leave-taken-report.dto';
import { PendingLeaveService } from 'src/admin/approval-override/pending-leave.service';
import { linkStorage } from '../../../constant/commonUsed';

/**
 * Leave taken report service
 *
 * @export
 * @class LeaveTakenReportService
 */
@Injectable()
export class LeaveTakenReportService {
  /**
   *Creates an instance of LeaveTakenReportService.
   * @param {ReportDBService} reportDBService
   * @param {PendingLeaveService} pendingLeaveService
   * @memberof LeaveTakenReportService
   */
  constructor(private readonly reportDBService: ReportDBService,
    private readonly pendingLeaveService: PendingLeaveService) { }
  /**
   * Get leave taken data
   *
   * @param {[string, string]} [tenantId, userId]
   * @returns
   * @memberof LeaveTakenReportService
   */
  getLeaveTakenData([tenantId, userId]: [string, string]) {
    let filter = [`(TENANT_GUID=${tenantId})`, `(STATUS=APPROVED)`];
    const extra = ['(USER_GUID=' + userId + ')'];
    filter = userId != null ? filter.concat(extra) : filter;

    return this.reportDBService.leaveTransactionDbService.findByFilterV2([], filter).pipe(
      mergeMap(async res => {
        // console.log(res);
        let leaveTypeList = await this.pendingLeaveService.getLeavetypeList(res[0].TENANT_GUID) as any[];
        let resultAll = await this.pendingLeaveService.getAllUserInfo(res[0].TENANT_GUID) as any[];
        return { res, leaveTypeList, resultAll };
        // return res;
      }),
      map(result => {
        let userIdList = [];
        let { res, leaveTypeList, resultAll } = result;
        // let res = result;
        res.forEach(element => {
          // console.log(element);
          // console.log(userIdList);
          const userId = userIdList.find(x => (x.userGuid == element.USER_GUID));
          let resultUser = resultAll.find(x => x.USER_GUID === element.USER_GUID);
          // console.log(userId);
          // // console.log(resultUser);

          if (!userId) {
            //   // combine all id for filter
            let leaveTakenReportDTO = new LeaveTakenReportDto;

            leaveTakenReportDTO.userGuid = element.USER_GUID;
            leaveTakenReportDTO.employeeNo = resultUser.STAFF_ID;
            leaveTakenReportDTO.employeeName = resultUser.FULLNAME;
            leaveTakenReportDTO.link = linkStorage + '/eleave/';

            leaveTakenReportDTO.companyName = resultUser.COMPANY_NAME;
            leaveTakenReportDTO.department = resultUser.DEPARTMENT;
            leaveTakenReportDTO.costcentre = resultUser.COSTCENTRE;
            leaveTakenReportDTO.branch = resultUser.BRANCH;

            // const leaveData = new LeaveTakenDetailsDto;
            const leaveData = this.runService([element, leaveTypeList, resultAll]);
            //   // console.log('a');
            leaveTakenReportDTO.leaveDetail = [];
            leaveTakenReportDTO.leaveDetail.push(leaveData);
            //   // console.log(leaveTakenReportDTO);
            userIdList.push(leaveTakenReportDTO);

          } else {
            // console.log(element.USER_GUID + '-' + element.LEAVE_TYPE_GUID);
            const leaveData = this.runService([element, leaveTypeList, resultAll]);

            // console.log(leaveData);
            userId.leaveDetail.push(leaveData);
          }
          // // console.log(userIdList);

        });
        // console.log(userIdList);
        return userIdList;
        // return result
      }),
      // map(res => {
      //   console.log(res);
      //   return res;
      // })
    );
  }

  /**
   * Run service
   *
   * @param {*} [element, leaveTypeList, resultAll]
   * @returns
   * @memberof LeaveTakenReportService
   */
  runService([element, leaveTypeList, resultAll]) {
    let approverData = '';
    let findLeaveData = leaveTypeList.find(x => x.LEAVE_TYPE_GUID === element.LEAVE_TYPE_GUID);
    if (!findLeaveData) {
      findLeaveData = {};
      findLeaveData['CODE'] = null;
      findLeaveData['ABBR'] = null;
    }
    if (element.STATES != null) {
      const approverArr = JSON.parse(element.STATES);
      approverArr.forEach(element => {
        let approverUser = resultAll.find(x => x.USER_GUID === element.userId);
        approverData = approverData == '' ? `Level ${element.level} - ${approverUser.FULLNAME}` : approverData + `, Level ${element.level} - ${approverUser.FULLNAME}`;
      });
    }

    // merge leave for user 
    const leaveData = new LeaveTakenDetailsDto;
    leaveData.leaveTypeId = element.LEAVE_TYPE_GUID;
    leaveData.leaveTypeName = findLeaveData.CODE;
    leaveData.startDate = element.START_DATE;
    leaveData.endDate = element.END_DATE;
    leaveData.noOfDays = element.NO_OF_DAYS;
    leaveData.approveBy = approverData;
    leaveData.remarks = element.REMARKS;
    return leaveData;
  }
}