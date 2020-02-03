import { Controller, UseGuards, Get, Param, Req, Res, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiImplicitParam, ApiOperation } from '@nestjs/swagger';
import { ReportService } from './report.service';

var enums = [
  'leave-entitlement',
  'approval-override',
  'apply-on-behalf',
  'entitlement-claim',
  'leave-taken',
  'leave-adjustment',
  'leave-cancellation',
  'leave-rejected',
  'forfeited-leave',
  'employee-master-list',
]

@Controller('api/admin/report')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ReportController {

  constructor(private readonly reportService: ReportService) { }

  @Get('/:reporttype/:id')
  @ApiOperation({ title: 'Get individual report' })
  @ApiImplicitParam({ name: 'id', description: 'Get by user guid', required: true })
  @ApiImplicitParam({ name: 'reporttype', description: 'Type of report', required: true, enum: enums })
  findReportById(@Param() param, @Req() req, @Res() res) {
    let { id, reporttype } = param;
    if (id == null || id == '' || id == '{id}') { throw new NotFoundException('Id not found'); }

    this.reportService.getReport([reporttype, req.user.TENANT_GUID]).subscribe(
      data => { res.send(data); },
      err => {
        res.status(500);
        res.send(err);
      }
    );
  }

  @Get('/:reporttype')
  @ApiOperation({ title: 'Get bundle report' })
  @ApiImplicitParam({ name: 'reporttype', description: 'Type of report', required: true, enum: enums })
  findReportAll(@Param() param, @Req() req, @Res() res) {
    let { reporttype } = param;
    this.reportService.getReport([reporttype, req.user.TENANT_GUID]).subscribe(
      data => { res.send(data); },
      err => {
        res.status(500);
        res.send(err);
      }
    );
  }


}