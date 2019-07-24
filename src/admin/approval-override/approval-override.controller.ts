import { Controller, UseGuards, Get, Req, Res, Patch, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApprovalOverrideService } from './approval-override.service';
import { CommonFunctionService } from '../../common/helper/common-function.services';
import { UpdateApprovalDTO } from './dto/update-approval.dto';

@Controller('api/admin/approval-override')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ApprovalOverrideController {
  constructor(private readonly approvalOverrideService: ApprovalOverrideService,
    private readonly commonFunctionService: CommonFunctionService) { }

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

  @Patch()
  @ApiOperation({ title: 'Update approval status'})
  updateApprovalStatus(@Body() updateApprovalDTO:UpdateApprovalDTO, @Req() req,@Res() res){
    this.commonFunctionService.runUpdateService(this.approvalOverrideService.updateToEmployee(req.user, updateApprovalDTO), res);
  }


}