import { Controller, Post, Body, Req, Res, Patch, Get, Param, UseGuards } from '@nestjs/common';

import { CreateUserDTO } from './dto/create-user.dto';
import { UserInfoService } from './user-info.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('api/admin/user')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userInfoService: UserInfoService) {}

    @Post()
    create(@Body() createUserDTO: CreateUserDTO ,@Req() req, @Res() res) {
        console.log(createUserDTO);

        res.send(createUserDTO);
    }

    @Patch()
    update(@Body() updateUserDTO,@Req() req, @Res() res) {
       
    }

    @Get()
    findAll(@Req() req,@Res() res) {
        this.userInfoService.findOne(req.user.USER_GUID,req.user.TENANT_GUID)
            .subscribe(
                data => {
                    if(data.status==200)
                    {
                        res.send(data.data.resource[0]);
                    }
                    else {
                        res.status(data.status);
                        res.send();
                    }
                },
                err => {
                    res.status(400);
                    res.send('Fail to fetch resource');
                }
            )

    }

    @Get(':id')
    findOne(@Param('id') id, @Req() req,@Res() res) {
       
    }

}
