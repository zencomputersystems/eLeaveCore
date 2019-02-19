import { Controller, Post, Req, Res, Body } from '@nestjs/common';
import { InviteDto } from './invite.dto';
import { UserInviteService } from './user-invite.service';

@Controller('api/admin/user-invite')
export class UserInviteController {

    constructor(
        private readonly userInviteService: UserInviteService) {}

    @Post()
    invite(@Body() inviteDto: InviteDto,@Req() req, @Res() res) {

        console.log(inviteDto.email);
        this.userInviteService.inviteUser(inviteDto.email)
        .then(() => {
            res.send("email sent");
        })
        .catch((err) => {
            console.log(err);
            res.send("email fail");
        });
    }

}
