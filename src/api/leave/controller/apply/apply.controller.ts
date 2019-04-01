import { Controller, UseGuards, Get, Req, Res, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { switchMap } from 'rxjs/operators';
import { ApplyLeaveService } from '../../service/apply-leave.service';
import { ApplyLeaveDTO } from '../../dto/apply-leave.dto';
import moment = require('moment');
import { LeaveApplicationValidationService } from 'src/common/policy/leave-application-validation/services/leave-application-validation.service';

@Controller('api')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ApplyController {

    constructor(private readonly applyLeaveService: ApplyLeaveService){}

    @Post('leave/apply')
    @ApiOperation({title: 'Apply leave'})
    findAll(@Body() applyLeaveDTO: ApplyLeaveDTO,@Req() req, @Res() res) {

        this.applyLeaveService.processLeave(applyLeaveDTO,req.user)
            .subscribe(
                data => {
                    res.send(data);
                },
                err => {

                    console.log(err.response.data.error.context);
                    res.send('fail');
                }
            )


    }
}
