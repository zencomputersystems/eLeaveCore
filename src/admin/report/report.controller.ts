import { Controller, UseGuards, Get, Param, Req, Res, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiImplicitParam, ApiOperation } from '@nestjs/swagger';
import { ReportService } from './report.service';

/** type of report */
var enums = [
  'leave-entitlement',
  'approval-override',
  'apply-on-behalf',
  'entitlement-claim',
  'leave-taken',
  'leave-adjustment',
  'leave-cancellation',
  'leave-rejected',
  'leave-forfeited',
  'employee-master-list',
]

/**
 * Report controller
 *
 * @export
 * @class ReportController
 */
@Controller('api/admin/report')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ReportController {

  /**
   *Creates an instance of ReportController.
   * @param {ReportService} reportService report service
   * @memberof ReportController
   */
  constructor(private readonly reportService: ReportService) { }

  /**
   * Find report by id
   *
   * @param {*} param
   * @param {*} req
   * @param {*} res
   * @memberof ReportController
   */
  @Get('/:reporttype/:id')
  @ApiOperation({ title: 'Get individual report' })
  @ApiImplicitParam({ name: 'id', description: 'Get by user guid', required: true })
  @ApiImplicitParam({ name: 'reporttype', description: 'Type of report', required: true, enum: enums })
  findReportById(@Param() param, @Req() req, @Res() res) {
    let { id, reporttype } = param;
    if (id == null || id == '' || id == '{id}') { throw new NotFoundException('Id not found'); }
    this.runService([reporttype, req, res, id]);
  }

  /**
   * Find report all
   *
   * @param {*} param
   * @param {*} req
   * @param {*} res
   * @memberof ReportController
   */
  @Get('/:reporttype')
  @ApiOperation({ title: 'Get bundle report' })
  @ApiImplicitParam({ name: 'reporttype', description: 'Type of report', required: true, enum: enums })
  findReportAll(@Param() param, @Req() req, @Res() res) {
    let { reporttype } = param;
    this.runService([reporttype, req, res, null]);
  }

  /**
   * Run service
   *
   * @param {[string, any, any, string]} [reporttype, req, res, userId]
   * @memberof ReportController
   */
  runService([reporttype, req, res, userId]: [string, any, any, string]) {
    this.reportService.getReport([reporttype, req.user.TENANT_GUID, userId]).subscribe(
      data => { res.send(data); },
      err => {
        res.status(500);
        res.send(err);
      }
    );
  }

}