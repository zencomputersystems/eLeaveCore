import { Controller, UseGuards, Get, Req, Res, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { switchMap } from 'rxjs/operators';
import { ApplyLeaveService } from '../../service/apply-leave.service';
import { ApplyLeaveDTO } from '../../dto/apply-leave.dto';
import moment = require('moment');

@Controller('api')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ApplyController {

    constructor(private readonly applyLeaveService: ApplyLeaveService){}

    @Post('leave/apply')
    @ApiOperation({title: 'Apply leave'})
    findAll(@Body() applyLeaveDTO: ApplyLeaveDTO,@Req() req, @Res() res) {

        const g = this.applyLeaveService.getTotalAppliedDay(moment(applyLeaveDTO.startDate,'YYYY-MM-DD'),moment(applyLeaveDTO.endDate,'YYYY-MM-DD'));

        return res.send(g);
        // this.applyLeaveService.processLeave(applyLeaveDTO,req.user)
        //     .subscribe(
        //         data => {
        //             console.log(data);
        //             res.send('success');
        //         },
        //         err => {

        //             console.log(err);
        //             res.send('fail');
        //         }
        //     )
    }
}
