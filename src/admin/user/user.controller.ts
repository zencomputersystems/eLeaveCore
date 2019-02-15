import { Controller, Post, Body, Req, Res, Patch, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';


@Controller('api/admin/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

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
       
    }

    @Get(':id')
    findOne(@Param('id') id, @Req() req,@Res() res) {
       
    }

}
