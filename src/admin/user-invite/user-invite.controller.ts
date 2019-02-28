import { Controller, Post, Req, Res, Body, UseGuards, Get, Param } from '@nestjs/common';
import { InviteDto } from './dto/invite.dto';
import { UserInviteService } from './user-invite.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';


@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('api/admin/user-invite')
export class UserInviteController {

    constructor(
        private readonly userInviteService: UserInviteService) {}

    
    @Post()
    invite(@Body() inviteListDto: [InviteDto],@Req() req, @Res() res) {

        this.userInviteService.inviteUser(inviteListDto,req.user)
            .subscribe(
                result => {
                    console.log(result);
                    res.status(200);
                    res.send(result);
                },
                err => {
                    res.status(400);
                    res.send("fail to send invitation");
                }
            )            
    }

}
