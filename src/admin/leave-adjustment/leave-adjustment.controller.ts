import { Controller, UseGuards, Patch, Body, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LeaveAdjustmentService } from './leave-adjustment.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { LeaveAdjustmentDTO } from './dto/update-leave-adjustment.dto';

@Controller('api/admin/leave-adjustment')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class LeaveAdjustmentController {
  constructor(private readonly leaveAdjustmentService: LeaveAdjustmentService,
    private readonly commonFunctionService: CommonFunctionService,
    private readonly xmlParserService: XMLParserService) { }

  @Patch()
  @ApiOperation({ title: 'Update Leave Adjustment' })
  updateGeneralLeavePolicy(@Body() leaveAdjustmentDTO: LeaveAdjustmentDTO, @Req() req, @Res() res) {
    this.leaveAdjustmentService.adjustLeave(req.user, leaveAdjustmentDTO).subscribe(
      data => { //console.log('when i show'); console.log(data); 
        res.send(data);
      },
      err => { res.send(err); }
    )
  }

}