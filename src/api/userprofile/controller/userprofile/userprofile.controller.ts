import { Controller, UseGuards, Get, Req, Res, Param, Post, Patch, NotFoundException, Delete, Body, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { Roles } from 'src/decorator/resource.decorator';
import { UserprofileService } from '../../service/userprofile.service';
import { switchMap } from 'rxjs/operators';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';
import { ResourceGuard } from 'src/guard/resource.guard';
import { EntitlementDetailDTO } from '../../dto/userprofile-detail/entitlement-detail/entitlement-detail.dto';
import { CommonFunctionService } from '../../../../common/helper/common-function.services';
import { UserInfoDbService } from '../../../../admin/holiday/db/user-info.db.service';
import { DisableUserDTO } from '../../../../admin/user/dto/disable-user.dto';
import { UserProfileStatusService } from '../../service/userprofile-status.service';
import { UserService } from 'src/admin/user/user.service';

/**
 * Controller for user profile
 *
 * @export
 * @class UserprofileController
 */
@Controller('api')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserprofileController {

	/**
	 *Creates an instance of UserprofileController.
	 * @param {UserprofileService} userprofileService
	 * @param {AccessLevelValidateService} accessLevelValidationService
	 * @memberof UserprofileController
	 */
	constructor(
		private readonly userprofileService: UserprofileService,
		private readonly accessLevelValidationService: AccessLevelValidateService,
		private readonly commonFunctionService: CommonFunctionService,
		private readonly userService: UserService,
		private readonly userProfileStatusService: UserProfileStatusService) { }

	/**
	 * Find all user profile
	 *
	 * @param {*} req
	 * @param {*} res
	 * @memberof UserprofileController
	 */
	@UseGuards(ResourceGuard)
	@Get('/users/:role')
	@ApiOperation({ title: 'Get list of employee' })
	@ApiImplicitParam({ name: 'role', description: 'Whether admin or employee', required: false })
	@Roles('ViewProfile', 'ProfileAdmin', 'EditProfile')
	findAll(@Param('role') role: string, @Req() req, @Res() res) {
		this.accessLevelValidationService.generateFilterWithChecking([req.user.TENANT_GUID, req.user.USER_GUID, req.accessLevel, []])
			.pipe(switchMap(filter => {
				// temp
				// const tempQuery = `(FULLNAME LIKE '%test%')`;
				// filter.push(tempQuery);

				if (role.toLowerCase() == 'employee') {
					const extra = '(ACTIVATION_FLAG=1)';
					filter.push(extra);
				}

				const filterNotdeleted = '(DELETED_AT IS NULL)'
				filter.push(filterNotdeleted);
				// console.log(filter);
				return this.userprofileService.getList(filter);
			}))
			.subscribe(
				data => {
					return res.send(data);
				},
				err => {
					res.status(500);
					if (err.response.data) { res.send(err.response.data.error) }
					else { res.send(err); }
				}
			)
	}

	/**
	 * Set date of resign to user
	 *
	 * @param {*} id
	 * @param {*} req
	 * @param {*} res
	 * @memberof UserprofileController
	 */
	@Delete('/users/:id')
	@ApiOperation({ title: 'Set resign date' })
	@ApiImplicitParam({ name: 'id', description: 'Delete by user guid', required: true })
	setResignDate(@Param('id') id, @Req() req, @Res() res) {

		// this.commonFunctionService.runUpdateService(this.userinfoDbService.setResignUser(req.user, id, null), res);
		this.commonFunctionService.runUpdateService(this.userService.deleteUser(req.user, id), res);
	}

	/**
	 * Set date resign user, if resign date < current -> set inactive
	 *
	 * @param {{user_guid:string,resign_date:Date}} data
	 * @param {*} req
	 * @param {*} res
	 * @memberof UserprofileController
	 */
	@Post('/users/disable')
	@ApiOperation({ title: 'Set disable user' })
	setDisabledUser(@Body() data: DisableUserDTO, @Req() req, @Res() res) {
		this.commonFunctionService.runUpdateService(this.userProfileStatusService.resignAndChangeStatus(req.user, data), res);
	}

	/**
	 * Find one user profile using parameter id
	 *
	 * @param {*} id
	 * @param {*} req
	 * @param {*} res
	 * @memberof UserprofileController
	 */
	@UseGuards(ResourceGuard)
	@Get('userprofile/:id')
	@ApiOperation({ title: 'Get profile detail for requested user' })
	@ApiImplicitParam({ name: 'id', description: 'filter user by USER_GUID', required: true })
	@Roles('ViewProfile', 'ProfileAdmin')
	findOne(@Param('id') id, @Req() req, @Res() res) {
		const user = req.user;
		this.accessLevelValidationService.generateFilterWithChecking([user.TENANT_GUID, user.USER_GUID, req.accessLevel, ['(USER_GUID=' + id + ')']])
			.pipe(
				switchMap(filter => {
					let filters: string[] = [];
					let merge: string;
					for (var i = 0; i < filter.length; i++) {
						merge = filter[i - 1] + ' AND ' + filter[i];
					}
					filters.push(merge);
					return this.userprofileService.getDetail(filters);
				})
			).subscribe(data => {
				// console.log(data);
				if (data) { this.getEntitlementProcess([data, res, user]); }
				else { res.status(HttpStatus.NOT_FOUND).send(new NotFoundException(`Data user guid not found`)); }
			}, err => {
				res.status(500);
				// if (err.response.data) { res.send(err.response.data1.error) } 
				// else { 
				res.send(err);
				// }
			});
	}

	/**
	 * Get profile detail for requesting user
	 *
	 * @param {*} req
	 * @param {*} res
	 * @memberof UserprofileController
	 */
	@Get('userprofile')
	@ApiOperation({ title: 'Get profile detail for requesting user' })
	findOwn(@Req() req, @Res() res) {

		//get the requesting user
		const user = req.user;

		const filters = ['(TENANT_GUID=' + user.TENANT_GUID + ') AND (USER_GUID=' + user.USER_GUID + ')'];

		this.userprofileService.getDetail(filters)
			.subscribe(
				data => { this.getEntitlementProcess([data, res, user]); },
				err => {

					res.status(500);
					if (err.response) { res.send(err.response.data.error) }
					else { res.send(err); }
				}
			)

	}

	/**
	 * Method get entitlement process
	 *
	 * @param {*} data1
	 * @param {*} res
	 * @param {*} user
	 * @memberof UserprofileController
	 */
	public getEntitlementProcess([data1, res, user]) {
		// console.log(data1);

		this.userprofileService.getEntitlementDetail(user.TENANT_GUID, data1.userId).subscribe(
			data => {
				let abbrMerge = [];
				let leaveData = [];
				for (let i = 0; i < data.length; i++) {
					let tempObj = new EntitlementDetailDTO;
					// console.log(data[i].LEAVE_TYPE_GUID);
					tempObj.leaveTypeId = data[i].LEAVE_TYPE_GUID;
					tempObj.leaveTypeName = data[i].LEAVE_CODE;
					tempObj.abbr = data[i].ABBR;
					tempObj.entitledDays = data[i].ENTITLED_DAYS;
					tempObj.pendingDays = data[i].TOTAL_PENDING;
					tempObj.takenDays = data[i].TOTAL_APPROVED;
					tempObj.balanceDays = data[i].BALANCE_DAYS;
					leaveData.push(tempObj);
					abbrMerge.push(data[i].ABBR);
				}
				data1.abbr = abbrMerge;
				data1.entitlementDetail = leaveData;
				res.send(data1);
			},
			err => {
				res.status(500);
				err.response ? res.send(err.response.data.error) : res.send(err);
			}
		)
	}

}
