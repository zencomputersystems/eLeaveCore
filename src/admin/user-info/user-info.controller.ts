import { Controller, Post, Body, Req, Res, Patch, Get, Param, UseGuards } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';


/**
 * Controller for user-info
 *
 * @export
 * @class UserInfoController
 */
@Controller('api/admin/user-info')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserInfoController {
	constructor(private readonly userInfoService: UserInfoService) { }

	/**
	 * Create new user_info API
	 *
	 * @param {CreateUserDTO} createUserDTO
	 * @param {*} req
	 * @param {*} res
	 * @memberof UserInfoController
	 */
	@Post()
	@ApiOperation({ title: 'Create user info' })
	create(@Body() createUserDTO: CreateUserDTO, @Req() req, @Res() res) {
		this.runService([this.userInfoService.create(req.user, createUserDTO), res, 'Fail to create resource']);
	}

	/**
	 * Update user_info API
	 *
	 * @param {UpdateUserDTO} updateUserDTO
	 * @param {*} req
	 * @param {*} res
	 * @memberof UserInfoController
	 */
	@Patch()
	@ApiOperation({ title: 'Update user info' })
	update(@Body() updateUserDTO: UpdateUserDTO, @Req() req, @Res() res) {
		this.runService([this.userInfoService.update(req.user, updateUserDTO), res, 'Fail to update resource']);
	}

	/**
	 * Get user_info details of current user (API)
	 *
	 * @param {*} req
	 * @param {*} res
	 * @memberof UserInfoController
	 */
	@Get()
	@ApiOperation({ title: 'Find all user info' })
	findAll(@Req() req, @Res() res) {
		// this.runGetService([req.user.USER_GUID, req.TENANT_GUID, res]);
		this.runService([this.userInfoService.findOne(req.user.USER_GUID, req.user.TENANT_GUID), res, 'Fail to fetch resource']);
	}

	/**
	 * Get user_info details for specific user (API)
	 *
	 * @param {*} id
	 * @param {*} req
	 * @param {*} res
	 * @memberof UserInfoController
	 */
	@Get(':id')
	@ApiOperation({ title: 'Find one user info' })
	@ApiImplicitParam({ name: 'id', description: 'user id' })
	findOne(@Param('id') id, @Req() req, @Res() res) {
		// this.runGetService([id, req.user.TENANT_GUID, res]);
		this.runService([this.userInfoService.findOne(id, req.user.TENANT_GUID), res, 'Fail to fetch resource']);
	}

	// /**
	//  * Method get user-info
	//  *
	//  * @param {*} userguid
	//  * @param {*} tenantguid
	//  * @param {*} res
	//  * @memberof UserInfoController
	//  */
	// public runGetService([userguid, tenantguid, res]) {
	// 	this.userInfoService.findOne(userguid, tenantguid)
	// 		.subscribe(
	// 			data => { this.sendResSuccess(data, res); },
	// 			err => { this.sendResError('Fail to fetch resource', res); }
	// 		)
	// }

	// /**
	//  * Method update user-info
	//  *
	//  * @param {*} method
	//  * @param {*} res
	//  * @memberof UserInfoController
	//  */
	// public runUpdateService(method, res) {
	// 	method.subscribe(
	// 		data => { this.sendResSuccess(data, res); },
	// 		err => { this.sendResError('Fail to update resource', res); }
	// 	);
	// }

	// /**
	//  * Method create user-info
	//  *
	//  * @param {*} method
	//  * @param {*} res
	//  * @memberof UserInfoController
	//  */
	// public runCreateService(method, res) {
	// 	method.subscribe(
	// 		data => { this.sendResSuccess(data, res); },
	// 		err => { this.sendResError('Fail to create resource', res); }
	// 	)
	// }

	/**
	 * Run service create and update
	 *
	 * @param {*} [method, res, message]
	 * @memberof UserInfoController
	 */
	public runService([method, res, message]) {
		method.subscribe(
			data => {
				// this.sendResSuccess(data, res); 
				if (data.status === 200) {
					res.send(data.data.resource[0]);
				} else {
					res.status(data.status).send();
				}
			},
			err => {
				// this.sendResError(message, res); 
				res.status(400).send(message);
			}
		)
	}

	// /**
	//  * Method send success result
	//  *
	//  * @param {*} data
	//  * @param {*} res
	//  * @memberof UserInfoController
	//  */
	// public sendResSuccess(data, res) {
	// if (data.status === 200) {
	// 	res.send(data.data.resource[0]);
	// } else {
	// 	res.status(data.status).send();
	// }
	// }

	// /**
	//  * Method send error result
	//  *
	//  * @param {*} message
	//  * @param {*} res
	//  * @memberof UserInfoController
	//  */
	// public sendResError(message, res) {
	// res.status(400).send(message);
	// }

}
