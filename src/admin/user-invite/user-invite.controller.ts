import { Controller, Post, Req, Res, Body, UseGuards } from '@nestjs/common';
import { InviteDto } from './dto/invite.dto';
import { UserInviteService } from './user-invite.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('api/admin/user-invite')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserInviteController {

    constructor(
        private readonly userInviteService: UserInviteService) {}

    @Post()
    invite(@Body() inviteDto: [InviteDto],@Req() req, @Res() res) {

        this.userInviteService.inviteUser(inviteDto[0].email,req.user)
        .then(()=>{
            res.send("email sent");
        })
        .catch(()=>{
            res.send("email fail");
        })
            
    }

}
