import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { DesignationService } from './designation.service';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

/**
 * Controller for dessignation
 *
 * @export
 * @class DesignationController
 */
@Controller('/api/designation')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class DesignationController {
    // constructor(private readonly designationService: DesignationService,
    //     private readonly commonFunctionService: CommonFunctionService) { }

    // /**
    //  * Find all designation by tenant id
    //  *
    //  * @param {*} req
    //  * @param {*} res
    //  * @memberof DesignationController
    //  */
    // @Get()
    // @ApiOperation({ title: 'Get designation list' })
    // findAll(@Req() req, @Res() res) {
    //     this.designationService.getList(req.user.TENANT_GUID).subscribe(
    //         data => {
    //             res.send(data);
    //         },
    //         err => {
    //             this.commonFunctionService.sendResErrorV3(err, res);
    //             // if(err.response.data) {
    //             //     res.status(err.response.data.error.status_code);
    //             //     res.send(err.response.data.error.message)
    //             // } else {
    //             //       res.status(500);
    //             //       res.send(err);
    //             // }
    //         }
    //     );

    // }

}
