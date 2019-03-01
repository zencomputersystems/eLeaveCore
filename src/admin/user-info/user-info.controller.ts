import { Controller, Post, Body, Req, Res, Patch, Get, Param, UseGuards } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('api/admin/user-info')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserInfoController {
    constructor(private readonly userInfoService: UserInfoService) {}

    @Post()
    create(@Body() createUserDTO: CreateUserDTO ,@Req() req, @Res() res) {
        
        this.userInfoService.create(req.user,createUserDTO);
        res.send(createUserDTO);
    }

    @Patch()
    update(@Body() updateUserDTO: UpdateUserDTO,@Req() req, @Res() res) {
        
        console.log(updateUserDTO);
        this.userInfoService.update(req.user,updateUserDTO)
            .subscribe(
                data => {
                    if(data.status==200)
                        res.send(data.data.resource[0]);
                    else {
                        res.status(data.status);
                        res.send();
                    }
                },
                err => {
                    console.log(err.response.data.error.context);
                    res.status(400);
                    res.send('Fail to update resource');
                }
            );

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
}
