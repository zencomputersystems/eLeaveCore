import { Controller, UseGuards, Get, Req, Res, Param, Post, Body, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DepartmentService } from './department.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

/**
 * Controller for department
 *
 * @export
 * @class DepartmentController
 */
@Controller('/api/department')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class DepartmentController {

    // constructor(private readonly departmentService: DepartmentService,
    //     private readonly commonFunctionService: CommonFunctionService) { }

    // /**
    //  * Find all department 
    //  *
    //  * @param {*} req
    //  * @param {*} res
    //  * @memberof DepartmentController
    //  */
    // @Get()
    // @ApiOperation({ title: 'Get department list' })
    // findAll(@Req() req, @Res() res) {
    //     this.departmentService.getList(req.user.TENANT_GUID).subscribe(
    //         data => {
    //             res.send(data);
    //         },
    //         err => {
    //             this.commonFunctionService.sendResErrorV3(err, res);
    //         }
    //     );

    // }

}
