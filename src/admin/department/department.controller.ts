import { Controller, UseGuards, Get, Req, Res, Param, Post, Body, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DepartmentService } from './department.service';

/**
 *
 *
 * @export
 * @class DepartmentController
 */
@Controller('/api/department')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class DepartmentController {

    constructor(private readonly departmentService: DepartmentService) {}

    @Get()
    @ApiOperation({title: 'Get department list'})
    findAll(@Req() req,@Res() res) {
        this.departmentService.getList(req.user.TENANT_GUID).subscribe(
        data => {
            res.send(data);
        },
        err => {
            if(err.response.data) {
                res.status(err.response.data.error.status_code);
                res.send(err.response.data.error.message)
            } else {
                  res.status(500);
                  res.send(err);
            }
        }
        );

    }

}
