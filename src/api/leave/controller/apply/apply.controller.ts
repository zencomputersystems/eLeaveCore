import { Controller, UseGuards, Get, Req, Res, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { switchMap } from 'rxjs/operators';
import { ApplyLeaveService } from '../../service/apply-leave.service';
import { ApplyLeaveDTO } from '../../dto/apply-leave.dto';

/**
 * Controller for apply leave
 *
 * @export
 * @class ApplyController
 */
@Controller('api')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ApplyController {

    /**
     *Creates an instance of ApplyController.
     * @param {ApplyLeaveService} applyLeaveService
     * @memberof ApplyController
     */
    constructor(private readonly applyLeaveService: ApplyLeaveService) { }

    /**
     * Method apply leave
     *
     * @param {ApplyLeaveDTO} applyLeaveDTO
     * @param {*} req
     * @param {*} res
     * @memberof ApplyController
     */
    @Post('leave/apply')
    @ApiOperation({ title: 'Apply leave' })
    findAll(@Body() applyLeaveDTO: ApplyLeaveDTO, @Req() req, @Res() res) {

        this.applyLeaveService.processLeave(applyLeaveDTO, req.user)
            .subscribe(
                data => {
                    res.send(data);
                },
                err => {
                    res.send(err);
                }
            )


    }
}
