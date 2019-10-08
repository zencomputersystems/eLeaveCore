import { Get, Req, Res, HttpService, Controller, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
import { DreamFactory } from 'src/config/dreamfactory';
import { DashboardCommonService } from '../service/dashboard-common.service';
import { AuthGuard } from '@nestjs/passport';

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
    private dashboardCommonService: DashboardCommonService
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
  // @ApiImplicitQuery({ name: 'tenantguid', description: 'Tenant guid', required: true })
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
  // @ApiImplicitQuery({ name: 'tenantguid', description: 'Tenant guid', required: true })
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
  @ApiOperation({ title: 'Get all list of employee to calendar' })
  // @ApiImplicitQuery({ name: 'tenantguid', description: 'Tenant guid', required: true })
  @ApiImplicitQuery({ name: 'startdate', description: 'Start date leave', required: true })
  @ApiImplicitQuery({ name: 'enddate', description: 'End date leave', required: true })
  findCalendarLeaveList(@Req() req, @Res() res) {
    this.runService(req, res, 'calendar_leave');
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
    let url = DreamFactory.df_host_proc + `${method_procedure}(${req.user.TENANT_GUID},${req.query.startdate},${req.query.enddate})`;
    this.http.get(url).subscribe(data => {
      if (method_procedure == 'calendar_leave') {
        // for calendar leave list add time to start date and end date
        data.data.forEach(element => { this.dashboardCommonService.dashboardService.addTime(element); });
      }
      this.dashboardCommonService.commonFunctionService.sendResSuccessV2(data, res);

    }, err => {
      this.dashboardCommonService.commonFunctionService.sendResErrorV3(err, res);
    });
  }
}