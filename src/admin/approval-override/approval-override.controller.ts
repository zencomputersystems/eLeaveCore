import { Controller, UseGuards, Get, Req, Res, Patch, Body, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
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
        res.send(data);
      },
      err => { this.commonFunctionService.sendResErrorV3(err, res); }
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