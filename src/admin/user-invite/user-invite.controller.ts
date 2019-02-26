import { Controller, Post, Req, Res, Body, UseGuards } from '@nestjs/common';
import { InviteDto } from './dto/invite.dto';
import { UserInviteService } from './user-invite.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { flatMap, map, switchMap } from 'rxjs/operators';
import { InviteListDTO } from './dto/invite-list.dto';

@Controller('api/admin/user-invite')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserInviteController {

    constructor(
        private readonly userInviteService: UserInviteService) {}

    @Post()
    invite(@Body() inviteListDto: [InviteDto],@Req() req, @Res() res) {

        this.userInviteService.inviteUser(inviteListDto,req.user)
            .subscribe(
                result => {
                    res.send("ss");
                },
                err => {
                    console.log(err);
                }
            )

        
             
    }

}
