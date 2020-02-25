import { Controller, UseGuards, Patch, Body, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LeaveAdjustmentService } from './leave-adjustment.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { LeaveAdjustmentDTO } from './dto/update-leave-adjustment.dto';

/**
 * Controller for leave adjustment
 *
 * @export
 * @class LeaveAdjustmentController
 */
@Controller('api/admin/leave-adjustment')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class LeaveAdjustmentController {
  constructor(private readonly leaveAdjustmentService: LeaveAdjustmentService) { }

  /**
   * Update function general leave polisy
   *
   * @param {LeaveAdjustmentDTO} leaveAdjustmentDTO
   * @param {*} req
   * @param {*} res
   * @memberof LeaveAdjustmentController
   */
  @Patch()
  @ApiOperation({ title: 'Update Leave Adjustment' })
  leaveAdjustment(@Body() leaveAdjustmentDTO: LeaveAdjustmentDTO, @Req() req, @Res() res) {
    this.leaveAdjustmentService.adjustLeave(req.user, leaveAdjustmentDTO).subscribe(
      data => { res.send(data); },
      err => { res.send(err); }
    )
  }

}