import { Get, Req, Res, HttpService, Controller, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
import { DreamFactory } from 'src/config/dreamfactory';
import { DashboardCommonService } from '../service/dashboard-common.service';
import { AuthGuard } from '@nestjs/passport';
import moment = require('moment');
import { AccessPermission } from 'src/decorator/resource.decorator';
import { AccessPermissionGuard } from '../../../guard/access-permission.guard';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';

/**
 * Controller for process using stored procedure
 *
 * @export
 * @class DashboardProcController
 */
@Controller('/api')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class DashboardProcController {

  /**
   *Creates an instance of DashboardProcController.
   * @param {HttpService} http http service
   * @param {DashboardCommonService} dashboardCommonService dashboard common service
   * @memberof DashboardProcController
   */
  constructor(
    private http: HttpService,
    private dashboardCommonService: DashboardCommonService,
    private accessLevelValidateService: AccessLevelValidateService
  ) { }

  /**
   * Get total employee and onleave count
   *
   * @param {*} req
   * @param {*} res
   * @memberof DashboardProcController
   */
  @Get('/employee/status-onleave')
  @ApiOperation({ title: 'Get total employee status onleave' })
  @ApiImplicitQuery({ name: 'startdate', description: 'Start date leave', required: true })
  @ApiImplicitQuery({ name: 'enddate', description: 'End date leave', required: true })
  findTotalEmployee(@Req() req, @Res() res) {
    this.runService(req, res, 'dashboard_onleave');
  }

  /**
   * Get employee onleave (name and designation)
   *
   * @param {*} req
   * @param {*} res
   * @memberof DashboardProcController
   */
  @Get('/employee/leave-list')
  @ApiOperation({ title: 'Get total employee on leave' })
  @ApiImplicitQuery({ name: 'startdate', description: 'Start date leave', required: true })
  @ApiImplicitQuery({ name: 'enddate', description: 'End date leave', required: true })
  findEmployeeLeaveList(@Req() req, @Res() res) {
    this.runService(req, res, 'employee_leave_list');
  }

  /**
   * Calendar leave list
   *
   * @param {*} req
   * @param {*} res
   * @memberof DashboardProcController
   */
  @Get('/employee/calendar-leave-list')
  @UseGuards(AccessPermissionGuard)
  // @AccessPermission({ rulesName: 'allowViewCalendar', rulesDetail: '' }, { rulesName: 'allowLeaveSetup', rulesDetail: 'allowLeaveEntitlementSetup' }, { rulesName: 'allowProfileManagement', rulesDetail: 'allowViewProfile' })
  @AccessPermission({ rulesName: 'allowViewCalendar', rulesDetail: '' })
  @ApiOperation({ title: 'Get all list of employee to calendar' })
  @ApiImplicitQuery({ name: 'startdate', description: 'Start date leave', required: false })
  @ApiImplicitQuery({ name: 'enddate', description: 'End date leave', required: false })
  findCalendarLeaveList(@Req() req, @Res() res) {
    // console.log('yuhuu');
    // console.log(req.accessLevel);
    // console.log(req.accessLevel[0].level);

    if (req.accessLevel[0].level != null) {
      this.accessLevelValidateService.generateFilterWithChecking([req.user.TENANT_GUID, req.user.USER_GUID, req.accessLevel[0].level, []])
        .subscribe(
          data => {
            req.accessLevelTemp = data;

            // console.log(data);
            let testSplit = data[1].split('(');
            let testSplit2 = testSplit[1].split('=');
            // console.log(testSplit2);
            this.runService(req, res, 'calendar_leave');
          },
          err => { console.log(err) }
        )
    }
    else {
      res.send([]);
    }

    // this.runService(req, res, 'calendar_leave');
  }

  /**
   * Function refactor run service 
   *
   * @param {*} req
   * @param {*} res
   * @param {*} method_procedure
   * @memberof DashboardProcController
   */
  public runService(req, res, method_procedure) {
    let url = '';

    if (req.query.startdate != undefined && req.query.enddate != undefined) {
      url = DreamFactory.df_host_proc + `${method_procedure}(${req.user.TENANT_GUID},${req.query.startdate},${req.query.enddate})`;
    } else {
      let startDateTemp = moment(req.query.startdate).subtract(2, 'years').format('YYYY-MM-DD');
      let endDateTemp = moment().format('YYYY-MM-DD');
      url = DreamFactory.df_host_proc + `${method_procedure}(${req.user.TENANT_GUID},${startDateTemp},${endDateTemp})`;
    }

    this.http.get(url).subscribe(data => {
      if (method_procedure == 'calendar_leave') {
        // for calendar leave list add time to start date and end date
        data.data.forEach(element => { this.dashboardCommonService.dashboardService.addTime(element); });
        // data.data = data.data.filter(x => x.TENANT_GUID == '' && x.req.accessLevelTemp);
      }
      res.send(data.data);

    }, err => {
      this.dashboardCommonService.commonFunctionService.sendResErrorV3(err, res);
    });
  }
}