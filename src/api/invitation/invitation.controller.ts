import { Controller, Get, Param, Req, Res, Post, Body } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { ActivatedByPassword } from './dto/activated-by-password.dto';

@Controller('api/invitation')

export class InvitationController {

    constructor(private readonly invitationService: InvitationService) {

    }

    @Get('accept/:token')
    accept(@Param('token') token,@Res() res) {
        
        this.invitationService.acceptInvitation(token)
            .subscribe(
                data => {
                    if(!data.status) {
                        res.status(401);
                        return res.send(data);
                    } 

                    return res.send(data);
                    
                },
                err => {
                    res.status(500);
                    return res.send(err.response.data);
                }
            )
    }

    @Post('update-password')
    activate(@Body() activateByPasswordDTO: ActivatedByPassword,@Res() res) {
        
        this.invitationService.setNewUserPassword(activateByPasswordDTO.id,activateByPasswordDTO.password)
            .subscribe(
                data => {
                    res.send(data);
                },
                err => {
                    res.status(500);
                    console.log(err);
                    return res.send(err.response.data);
                }
            )
    }
}
