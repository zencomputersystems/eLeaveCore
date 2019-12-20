import { Controller, UseGuards, Post, Body, Req, Res, Get, Patch, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { RoleDTO } from './dto/role.dto';
import { RoleService } from './role.service';
import { UpdateRoleDTO } from './dto/update-role.dto';
import { UpdateUserRoleDTO } from './dto/update-userrole.dto';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

/**
 * Controller for role
 *
 * @export
 * @class RoleController
 */
@Controller('/api/admin/role')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class RoleController {

	/**
	 *Creates an instance of RoleController.
	 * @param {RoleService} roleService Role service
	 * @param {CommonFunctionService} commonFunctionService Common function service
	 * @memberof RoleController
	 */
	constructor(
		private readonly roleService: RoleService,
		private readonly commonFunctionService: CommonFunctionService
	) { }

	/**
	 * Method get role profile list
	 *
	 * @param {*} res
	 * @memberof RoleController
	 */
	@Get('/role-profile')
	@ApiOperation({ title: 'Get role profile list' })
	findAllRole(@Req() req, @Res() res) {
		this.commonFunctionService.runGetServiceV2(this.roleService.getRoleProfileList(req.user), res);
	}

	/**
	 * Method setup new role
	 *
	 * @param {RoleDTO} roleSetupDTO
	 * @param {*} req
	 * @param {*} res
	 * @memberof RoleController
	 */
	@Post('/role-profile')
	@ApiOperation({ title: 'Setup new role' })
	create(@Body() roleSetupDTO: RoleDTO, @Req() req, @Res() res) {
		this.commonFunctionService.runCreateService(this.roleService.create(req.user, roleSetupDTO), res);
	}

	/**
	 * Method update role profile
	 *
	 * @param {UpdateRoleDTO} updateRoleDTO
	 * @param {*} req
	 * @param {*} res
	 * @memberof RoleController
	 */
	@Patch('/role-profile')
	@ApiOperation({ title: 'Edit role profile' })
	updateRolerProfile(@Body() updateRoleDTO: UpdateRoleDTO, @Req() req, @Res() res) {
		this.commonFunctionService.runUpdateService(this.roleService.updateRole(req.user, updateRoleDTO), res);
	}

	/**
	 * Delete role
	 *
	 * @param {*} id
	 * @param {*} req
	 * @param {*} res
	 * @memberof RoleController
	 */
	@Delete('role-profile/:id')
	@ApiOperation({ title: 'Delete role profile' })
	@ApiImplicitParam({ name: 'id', description: 'Delete by ROLE_GUID', required: true })
	deleteRoleProfile(@Param('id') id, @Req() req, @Res() res) {
		this.commonFunctionService.runUpdateService(this.roleService.deleteRole(req.user, id), res);
	}

	/**
	 * Get employee attach to role profile
	 *
	 * @param {*} id
	 * @param {*} req
	 * @param {*} res
	 * @memberof RoleController
	 */
	@Get('role-profile/users/:id')
	@ApiOperation({ title: 'Get employee list by role profile' })
	@ApiImplicitParam({ name: 'id', description: 'Filter by ROLE_GUID', required: true })
	findEmployeeRoleProfile(@Param('id') id, @Req() req, @Res() res) {
		this.commonFunctionService.runGetServiceV2(this.roleService.getEmployeeRoleAttach(id, req.user.TENANT_GUID), res);
	}

	/**
	 * Get role detail by role profile guid
	 *
	 * @param {*} id
	 * @param {*} res
	 * @memberof RoleController
	 */
	@Get(':id')
	@ApiOperation({ title: 'Get role detail by role profile guid' })
	@ApiImplicitParam({ name: 'id', description: 'Filter by ROLE_GUID', required: true })
	findOne(@Param('id') id, @Res() res) {
		this.commonFunctionService.runGetServiceV2(this.roleService.getRoleDetail(id), res);
	}

	/**
	 * Assign role profile to employee
	 *
	 * @param {UpdateUserRoleDTO} updateUserRoleDTO
	 * @param {*} req
	 * @param {*} res
	 * @memberof RoleController
	 */
	@Patch('/user-role')
	@ApiOperation({ title: 'Assign role profile to employee' })
	updateToEmployee(@Body() updateUserRoleDTO: UpdateUserRoleDTO, @Req() req, @Res() res) {
		this.commonFunctionService.runUpdateService(this.roleService.updateToEmployee(req.user, updateUserRoleDTO), res);
	}

}