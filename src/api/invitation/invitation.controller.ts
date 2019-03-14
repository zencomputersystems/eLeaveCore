// import { Controller, Get, Param, Req, Res, Post, Body, Patch, UseGuards } from '@nestjs/common';
// import { InvitationService } from './invitation.service';
// import { ActivatedByPassword } from './dto/activated-by-password.dto';
// import { ApiOperation, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
// import { InviteDto } from 'src/admin/user-invite/dto/invite.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { ResourceGuard } from 'src/guard/resource.guard';
// import { Roles } from 'src/decorator/resource.decorator';

// @Controller('api/invitation')

// export class InvitationController {

//     constructor(private readonly invitationService: InvitationService) {}

//     @ApiOperation({title: 'Accept Invitation sent by admin'})
//     @ApiImplicitQuery({ name: 'token', description: 'token used to validate user invitation identity', required: true })
//     @Get('/:token')
//     accept(@Param('token') token: string,@Res() res) {
        
//         this.invitationService.acceptInvitation(token)
//             .subscribe(
//                 data => {
//                     if(!data.status) {
//                         res.status(401);
//                         return res.send(data);
//                     } 

//                     return res.send(data);
                    
//                 },
//                 err => {
//                     res.status(500);
//                     return res.send(err.response.data);
//                 }
//             )
//     }

//     @ApiOperation({title: 'Update user password for first time'})
//     @Patch('update-password')
//     activate(@Body() activateByPasswordDTO: ActivatedByPassword,@Res() res) {
        
//         this.invitationService.setNewUserPassword(activateByPasswordDTO.id,activateByPasswordDTO.password)
//             .subscribe(
//                 data => {
//                     res.send(data);
//                 },
//                 err => {
//                     res.status(500);
//                     console.log(err);
//                     return res.send(err.response.data);
//                 }
//             )
//     }

//     @UseGuards(AuthGuard('jwt'))
//     @ApiBearerAuth()
//     @UseGuards(ResourceGuard)
//     @ApiOperation({title: 'Sent invitation to user'})
//     @Roles('ProfileAdmin')
//     @Post()
//     invite(@Body() inviteListDto: [InviteDto],@Req() req, @Res() res) {

//         // this.invitationService.inviteUser(inviteListDto,req.user)
//         //     .subscribe(
//         //         result => {
//         //             console.log(result);
//         //             res.status(200);
//         //             res.send(result);
//         //         },
//         //         err => {
//         //             res.status(400);
//         //             res.send("fail to send invitation");
//         //         }
//         //     )            
//     }
// }
