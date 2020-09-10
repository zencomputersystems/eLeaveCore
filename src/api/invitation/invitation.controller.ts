import { Controller, Get, Param, Req, Res, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { ActivatedByPassword } from './dto/activated-by-password.dto';
import { ApiOperation, ApiBearerAuth, ApiImplicitParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ResourceGuard } from 'src/guard/resource.guard';
import { Roles } from 'src/decorator/resource.decorator';
import { InvitationInviteService } from './invitation-invite.service';
import { InviteDTO } from './dto/invite.dto';

/**
 *  Controller for invitation
 *
 * @export
 * @class InvitationController
 */
@Controller('api/invitation')

export class InvitationController {

	/**
	 *Creates an instance of InvitationController.
	 * @param {InvitationService} invitationService
	 * @param {InvitationInviteService} invitationInviteService
	 * @memberof InvitationController
	 */
	constructor(
		private readonly invitationService: InvitationService,
		private readonly invitationInviteService: InvitationInviteService) { }

	/**
	 * Accept Invitation sent by admin
	 *
	 * @param {string} token
	 * @param {*} res
	 * @memberof InvitationController
	 */
	@Get('/:token')
	@ApiOperation({ title: 'Accept Invitation sent by admin' })
	@ApiImplicitParam({ name: 'token', description: 'token used to validate user invitation identity', required: true })
	accept(@Param('token') token: string, @Res() res) {

		this.invitationService.acceptInvitation(token).subscribe(
			data => {
				if (!data.status) {
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

	/**
	 * Update user password for first time
	 *
	 * @param {ActivatedByPassword} activateByPasswordDTO
	 * @param {*} res
	 * @memberof InvitationController
	 */
	@ApiOperation({ title: 'Update user password for first time' })
	@Patch()
	activate(@Body() activateByPasswordDTO: ActivatedByPassword, @Res() res) {
		this.invitationService.setNewUserPassword(activateByPasswordDTO.id, activateByPasswordDTO.password).subscribe(
			data => {
				res.send(data);
			},
			err => {
				res.status(500);
				return res.send(err.response.data);
			}
		)
	}

	/**
	 * Sent invitation to user
	 *
	 * @param {[InviteDTO]} inviteListDto
	 * @param {*} req
	 * @param {*} res
	 * @memberof InvitationController
	 */
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth()
	@UseGuards(ResourceGuard)
	@ApiOperation({ title: 'Sent invitation to user' })
	@Roles('ProfileAdmin')
	@Post()
	invite(@Body() inviteListDto: [InviteDTO], @Req() req, @Res() res) {
		this.invitationInviteService.invite(inviteListDto, req.user).subscribe(
			result => {
				let respon = '{"status":"Email send"}';
				// console.log(result);
				res.status(200);
				// res.send(result);
				res.send(respon);
			},
			err => {
				console.log(err);
				res.status(400);
				res.send("fail to send invitation");
			}
		)
	}
}
