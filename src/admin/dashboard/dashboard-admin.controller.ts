import { Controller, UseGuards, Get, Req, Res, Param, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { DashboardAdminService } from './dashboard-admin.service';
import { Observable } from 'rxjs';

/**
 * Controller for dashboard admin
 *
 * @export
 * @class DashboardAdminController
 */
@Controller('api/admin/dashboard')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class DashboardAdminController {

  /**
   *Creates an instance of DashboardAdminController.
   * @param {DashboardAdminService} dashboardAdminService Service for dashboard admin
   * @memberof DashboardAdminController
   */
  constructor(private readonly dashboardAdminService: DashboardAdminService) { }

  /**
   * Find upcoming joiner and leaver
   *
   * @param {*} item
   * @param {*} req
   * @param {*} res
   * @memberof DashboardAdminController
   */
  @Get(':item')
  @ApiOperation({ title: 'Get upcoming joiner or upcoming leaver for this tenant' })
  @ApiImplicitParam({
    name: 'item', description: 'Select upcoming joiner or upcoming leaver', required: true,
    enum: ['upcoming-joiner', 'upcoming-leaver']
  })
  findUpcomingEmployee(@Param('item') item, @Req() req, @Res() res) {

    let method: Observable<any>;
    if (item == 'upcoming-joiner') { method = this.dashboardAdminService.getUpcomingJoiner(req.user.TENANT_GUID); }
    else if (item == 'upcoming-leaver') { method = this.dashboardAdminService.getUpcomingLeaver(req.user.TENANT_GUID); }

    method.subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.send(new NotFoundException('No data retrieved', 'Failed to get data'));
      }
    );

  }

}