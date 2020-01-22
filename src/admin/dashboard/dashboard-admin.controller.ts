import { Controller, UseGuards, Get, Req, Res, Param, NotFoundException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import moment = require('moment');
import { DashboardAdminService } from './dashboard-admin.service';
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
  @ApiOperation({ title: 'Get upcoming joiner or upcoming leaver or upcoming birthday for this tenant' })
  @ApiImplicitParam({
    name: 'item', description: 'Select upcoming joiner or upcoming leaver', required: true,
    enum: ['upcoming-joiner', 'upcoming-leaver', 'upcoming-birthday']
  })
  findUpcomingEmployee(@Param('item') item, @Req() req, @Res() res) {

    let method: Observable<any>;
    if (item == 'upcoming-joiner') { method = this.dashboardAdminService.getUpcomingJoiner(req.user.TENANT_GUID); }
    else if (item == 'upcoming-leaver') { method = this.dashboardAdminService.getUpcomingLeaver(req.user.TENANT_GUID); }
    else if (item == 'upcoming-birthday') { method = this.dashboardAdminService.getBirthdayList(req.user.TENANT_GUID); }

    method.subscribe(
      data => {
        if (item == 'upcoming-birthday') {
          let userBirthday = [];
          data.data.resource.forEach(element => {
            element.DATE_OF_BIRTH = element.DOB;
            element.DOB = moment(element.DOB).format('MM-DD');

            if (element.DOB > moment().format('MM-DD') && element.DATE_OF_BIRTH != null)
              userBirthday.push(element);
          });

          data.data.resource = userBirthday.sort((a, b) => (a.DOB > b.DOB) ? 1 : ((b.DOB > a.DOB) ? -1 : 0));
        }

        res.send(data.data.resource);
      }, err => {
        res.send(new NotFoundException('No data retrieved', 'Failed to get data'));
      }
    );

  }

}