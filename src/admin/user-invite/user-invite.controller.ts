import { Controller, Post, Req, Res, Body, UseGuards, Get, Param } from '@nestjs/common';
import { InviteDto } from './dto/invite.dto';
import { UserInviteService } from './user-invite.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { flatMap, map, switchMap } from 'rxjs/operators';
import { InviteListDTO } from './dto/invite-list.dto';

@Controller('api')
export class UserInviteController {

    constructor(
        private readonly userInviteService: UserInviteService) {}

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Post('admin/user-invite')
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

    @Get('accept-invite/:token')
    accept(@Param('token') token, @Req() req,@Res() res) {
        this.userInviteService.acceptInvitation(token)
            .subscribe(
                data => {
                    if(data==null) {
                        res.status(401);
                        return res.send("Invalid");
                    } 

                    return res.send("Valid")
                    
                },
                err => {
                    console.log(err.response.data.error.context);
                }
            )
    }

}
