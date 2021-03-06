import { Controller, UseGuards, Get, Req, Res, Patch, Body, Post, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { ApprovalOverrideService } from './approval-override.service';
import { CommonFunctionService } from '../../common/helper/common-function.services';
import { UpdateApprovalDTO } from './dto/update-approval.dto';

/**
 * Controller for approval override
 *
 * @export
 * @class ApprovalOverrideController
 */
@Controller('api/admin/approval-override')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ApprovalOverrideController {
  /**
   *Creates an instance of ApprovalOverrideController.
   * @param {ApprovalOverrideService} approvalOverrideService
   * @param {CommonFunctionService} commonFunctionService
   * @memberof ApprovalOverrideController
   */
  constructor(private readonly approvalOverrideService: ApprovalOverrideService,
    private readonly commonFunctionService: CommonFunctionService) { }

  /**
   * Find all pending leave
   *
   * @param {*} req
   * @param {*} res
   * @memberof ApprovalOverrideController
   */
  @Get()
  @ApiOperation({ title: 'Get pending leave' })
  findAll(@Req() req, @Res() res) {
    this.approvalOverrideService.findAllPendingLeave(req.user.TENANT_GUID).subscribe(
      data => {
        data.sort((a, b) => (a.dateApplied > b.dateApplied) ? -1 : ((b.dateApplied > a.dateApplied) ? 1 : 0));
        res.send(data);
      },
      err => { this.commonFunctionService.sendResErrorV3(err, res); }
    )
  }

  /**
   * Get pending leave by company
   *
   * @param {*} param
   * @param {*} req
   * @param {*} res
   * @memberof ApprovalOverrideController
   */
  @Get('company/:id')
  @ApiOperation({ title: 'Get pending leave' })
  @ApiImplicitParam({ name: 'id', description: 'Company guid', required: true })
  findAllByCompany(@Param() param, @Req() req, @Res() res) {
    this.approvalOverrideService.findAllPendingLeave(req.user.TENANT_GUID).subscribe(
      data => {
        data = data.filter(x => x.companyId === param.id);
        res.send(data);
      },
      err => { this.commonFunctionService.sendResErrorV3(err, res); }
    )
  }

  /**
   * Find own leave history
   *
   * @param {*} param
   * @param {*} req
   * @param {*} res
   * @memberof ApprovalOverrideController
   */
  @Get(':id')
  @ApiOperation({ title: 'Get own leave history' })
  @ApiImplicitParam({ name: 'id', description: 'User guid', required: true })
  findOwn(@Param() param, @Req() req, @Res() res) {
    this.approvalOverrideService.findAllOwnLeave([param.id, req.user.TENANT_GUID]).subscribe(
      data => {
        // data.sort((a, b) => (a.dateApplied > b.dateApplied) ? -1 : ((b.dateApplied > a.dateApplied) ? 1 : 0));
        data.sort((a, b) => (a.startDate > b.startDate) ? -1 : ((b.startDate > a.startDate) ? 1 : 0));

        res.send(data);
      },
      err => {
        // this.commonFunctionService.sendResErrorV3(err, res);
        res.send(err);
      }
    )
  }

  /**
   * Update approval override to employee
   *
   * @param {UpdateApprovalDTO} updateApprovalDTO
   * @param {*} req
   * @param {*} res
   * @memberof ApprovalOverrideController
   */
  @Patch()
  @ApiOperation({ title: 'Update approval status' })
  updateApprovalStatus(@Body() updateApprovalDTO: UpdateApprovalDTO, @Req() req, @Res() res) {
    this.commonFunctionService.runUpdateService(this.approvalOverrideService.updateToEmployee(req.user, updateApprovalDTO), res);
  }


  // @Patch('send-email')
  // @ApiOperation({ title: 'Send email' })
  // sendEmailNotification(@Body() email: string[], @Req() req, @Res() res) {
  //   this.approvalOverrideService.sendEmailNotify(req.user, email)
  //   // .subscribe(data => {
  //   //   // console.log(data.data.resource);
  //   //   // res.sedata.data.resource;
  //   //   res.send(data);
  //   // }, err => {
  //   //   // return err;
  //   //   res.send(err);
  //   // });

  //   res.send('ok');
  // }

}