import { Controller, UseGuards, Get, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardAdminService } from './dashboard-admin.service';

@Controller('api/admin/dashboard')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class DashboardAdminController {

  constructor(private readonly dashboardAdminService: DashboardAdminService) { }

  @Get('upcoming-joiner')
  @ApiOperation({ title: 'Get upcoming joiner for this tenant' })
  findUpcomingJoiner(@Req() req, @Res() res) {
    this.dashboardAdminService.getUpcomingJoiner(req.user.TENANT_GUID).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.send(err);
      }
    );
  }

  @Get('upcoming-leaver')
  @ApiOperation({ title: 'Get upcoming leaver for this tenant' })
  findUpcomingLeaver(@Req() req, @Res() res) {
    this.dashboardAdminService.getUpcomingLeaver(req.user.TENANT_GUID).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.send(err);
      }
    );
  }

}