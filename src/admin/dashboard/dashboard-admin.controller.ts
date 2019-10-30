import { Controller, UseGuards, Get, Req, Res, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { DashboardAdminService } from './dashboard-admin.service';
import { verifyParam } from 'src/common/helper/basic-functions';
import { Observable } from 'rxjs';

@Controller('api/admin/dashboard')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class DashboardAdminController {

  constructor(private readonly dashboardAdminService: DashboardAdminService) { }

  @Get(':item')
  @ApiOperation({ title: 'Get upcoming joiner or upcoming leaver for this tenant' })
  @ApiImplicitQuery({
    name: 'item', description: 'Select upcoming joiner or upcoming leaver', required: true,
    enum: ['upcoming-joiner', 'upcoming-leaver']
  })
  findUpcomingEmployee(@Param('item') item, @Req() req, @Res() res) {
    let itemData = verifyParam([req, 'item', item]);
    let method: Observable<any>;
    if (itemData == 'upcoming-joiner') { method = this.dashboardAdminService.getUpcomingJoiner(req.user.TENANT_GUID); }
    else if (itemData == 'upcoming-leaver') { method = this.dashboardAdminService.getUpcomingLeaver(req.user.TENANT_GUID); }

    method.subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.send(err);
      }
    );
  }


  // @Get('upcoming-joiner')
  // @ApiOperation({ title: 'Get upcoming joiner for this tenant' })
  // findUpcomingJoiner(@Req() req, @Res() res) {
  //   this.dashboardAdminService.getUpcomingJoiner(req.user.TENANT_GUID).subscribe(
  //     data => {
  //       res.send(data.data.resource);
  //     }, err => {
  //       res.send(err);
  //     }
  //   );
  // }

  // @Get('upcoming-leaver')
  // @ApiOperation({ title: 'Get upcoming leaver for this tenant' })
  // findUpcomingLeaver(@Req() req, @Res() res) {
  //   this.dashboardAdminService.getUpcomingLeaver(req.user.TENANT_GUID).subscribe(
  //     data => {
  //       res.send(data.data.resource);
  //     }, err => {
  //       res.send(err);
  //     }
  //   );
  // }

}