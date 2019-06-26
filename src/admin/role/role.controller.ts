import { Controller, UseGuards, Post, Body, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RoleDTO } from './dto/role.dto';
import { RoleService } from './role.service';

@Controller('/api/admin/role')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class RoleController {
    constructor(
        private readonly roleService: RoleService
    ) { }

    @Post('/role-profile')
    @ApiOperation({ title: 'Setup new role' })
    create(@Body() roleSetupDTO: RoleDTO, @Req() req, @Res() res) {
        console.log(roleSetupDTO);
        this.roleService.create(req.user, roleSetupDTO).subscribe(
            data => {
                // console.log(data);
                if (data.status == 200)
                    res.send(data.data.resource);
            },
            err => {
                //   console.log(err);
                res.status(400);
                res.send(err);
                //console.log(err.response.data.error.context);
            }
        )
        // res.send('okay');
        // this.holidayService.create(req.user, createCalendarDTO)
        //     .subscribe(
        //         data => {
        //             // console.log(data);
        //             if (data.status == 200)
        //                 res.send(data.data.resource);
        //         },
        //         err => {
        //             //   console.log(err);
        //             res.status(400);
        //             res.send(err);
        //             //console.log(err.response.data.error.context);
        //         }
        //     )
    }
}