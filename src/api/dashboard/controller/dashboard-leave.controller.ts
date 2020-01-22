import { Get, Req, Res, Param, Controller, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiImplicitParam } from '@nestjs/swagger';
import { DashboardLeaveService } from '../service/dashboard-leave.service';
import { AuthGuard } from '@nestjs/passport';

/**
 * Controller for dashboard leave
 *
 * @export
 * @class DashboardLeaveController
 */
@Controller('/api')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class DashboardLeaveController {

  /**
   *Creates an instance of DashboardLeaveController.
   * @param {DashboardLeaveService} dashboardLeaveService dashboard leave service
   * @memberof DashboardLeaveController
   */
  constructor(
    private dashboardLeaveService: DashboardLeaveService
  ) { }

  /**
   * Annual leave
   *
   * @param {*} req
   * @param {*} res
   * @memberof DashboardLeaveController
   */
  @Get('/employee/dashboard-annual-leave')
  @ApiOperation({ title: 'Get dashboard annual leave' })
  getAnnualLeave(@Req() req, @Res() res) {
    this.getData(this.dashboardLeaveService.getAnnualLeave(req.user.USER_GUID), res);
  }

  /**
   * Medical leave
   *
   * @param {*} req
   * @param {*} res
   * @memberof DashboardLeaveController
   */
  @Get('/employee/dashboard-medical-leave')
  @ApiOperation({ title: 'Get dashboard medical leave' })
  getMedicalLeave(@Req() req, @Res() res) {
    this.getData(this.dashboardLeaveService.getMedicalLeave(req.user.USER_GUID), res);
  }

  /**
   * Get replacement leave
   *
   * @param {*} req
   * @param {*} res
   * @memberof DashboardLeaveController
   */
  @Get('/employee/dashboard-replacement-leave')
  @ApiOperation({ title: 'Get dashboard replacement leave' })
  getReplacementLeave(@Req() req, @Res() res) {
    this.dashboardLeaveService.getReplacementLeave(req.user.USER_GUID).subscribe(
      data => {
        if (data.length > 0)
          res.send(data);
        else
          res.send({ "status": "Not available" });
      }, err => {
        res.send(err);
      }
    );
  }

  /**
   * Get my leave
   *
   * @param {*} param
   * @param {*} req
   * @param {*} res
   * @memberof DashboardLeaveController
   */
  @Get('/employee/:leavecode/:data')
  @ApiOperation({ title: 'Get my leave' })
  @ApiImplicitParam({
    name: 'leavecode',
    description: 'Annual Leave (AL), Birthday Leave (BL), Compassionate Leave (CL), Hospitalization Leave (HL), Medical Leave (ML), Paternity Leave (PL), Replacement Leave (RL), Maternity Leave (MTL), Marriage Leave (MRL)', required: true,
    enum: ['AL', 'BL', 'CL', 'HL', 'ML', 'PL', 'RL', 'MTL', 'MRL']
  })
  @ApiImplicitParam({
    name: 'data', description: 'Show eLeave summary or detailed', required: true,
    enum: ['simple', 'detailed']
  })
  getMyLeave(@Param() param, @Req() req, @Res() res) {

    let dataLeave = this.verifyItem('leave');
    let dataType = this.verifyItem('type');

    if (dataLeave.includes(param.leavecode) && dataType.includes(param.data)) {
      this.dashboardLeaveService.getMyLeave([param.leavecode, param.data, req.user.USER_GUID]).subscribe(
        data => {
          if (data.length == 0) {
            data = { "status": "You are not entitled for this leavetype" };
          }
          res.send(data);
        }, err => {
          res.send(err);
        }
      );
    } else {
      res.status(400);
      res.send('item not found');
    }

  }

  /**
   * Verify my leave item
   *
   * @param {string} param
   * @returns
   * @memberof DashboardLeaveController
   */
  public verifyItem(param: string) {
    // list item to find
    let item;

    if (param == 'leave') {
      item = ['AL', 'BL', 'CL', 'HL', 'ML', 'PL', 'RL', 'MTL', 'MRL'];
    } else if (param == 'type') {
      item = ['simple', 'detailed'];
    }

    return item;
  }

  /**
   * Refactor function
   *
   * @param {*} method
   * @param {*} res
   * @memberof DashboardLeaveController
   */
  public getData(method, res) {
    method.subscribe(
      data => {
        if (data.length > 0)
          res.send(data[0]);
        else
          res.send({ "status": "Not available" });
      }, err => {
        res.send(err);
      }
    );
  }

}