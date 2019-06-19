import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { DesignationService } from './designation.service';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ResultStatusService } from 'src/common/helper/result-status.service';

/**
 *
 *
 * @export
 * @class DesignationController
 */
@Controller('/api/designation')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class DesignationController {
    constructor(private readonly designationService: DesignationService,
        private readonly resultStatusService : ResultStatusService) {}

    @Get()
    @ApiOperation({title: 'Get designation list'})
    findAll(@Req() req,@Res() res) {
        this.designationService.getList(req.user.TENANT_GUID).subscribe(
        data => {
            res.send(data);
        },
        err => {
            this.resultStatusService.sendError(err,res);
            // if(err.response.data) {
            //     res.status(err.response.data.error.status_code);
            //     res.send(err.response.data.error.message)
            // } else {
            //       res.status(500);
            //       res.send(err);
            // }
        }
        );

    }

}
