import { Controller, UseGuards, Post, Body, Req, Res, Get, Patch, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { RoleDTO } from './dto/role.dto';
import { RoleService } from './role.service';
import { ResultStatusService } from 'src/common/helper/result-status.service';
import { UpdateRoleDTO } from './dto/update-role.dto';
import { UpdateUserRoleDTO } from './dto/update-userrole.dto';

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
     * @param {RoleService} roleService
     * @param {ResultStatusService} resultStatusService
     * @memberof RoleController
     */
    constructor(
        private readonly roleService: RoleService,
        private readonly resultStatusService: ResultStatusService
    ) { }

    /**
     * Method get role profile list
     *
     * @param {*} req
     * @param {*} res
     * @memberof RoleController
     */
    @Get('/role-profile')
    @ApiOperation({ title: 'Get role profile list' })
    findAllRole(@Req() req, @Res() res) {
        this.roleService.findRoleProfile().subscribe(
            data => {
                res.send(data);
            },
            err => {
                this.resultStatusService.sendError(err, res);
            }
        );

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
        console.log(roleSetupDTO);
        this.roleService.create(req.user, roleSetupDTO).subscribe(
            data => {
                if (data.status == 200)
                    res.send(data.data.resource);
            },
            err => {
                res.status(400);
                res.send(err);
            }
        )
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
        this.roleService.updateRole(req.user, updateRoleDTO)
            .subscribe(
                data => {
                    if (data.status == 200)
                        res.send(data.data);
                },
                err => {
                    this.resultStatusService.sendErrorV2(res, 400, 'Fail to update resource');
                }
            )
    }

    /**
     * Get role detail by role profile guid
     *
     * @param {*} req
     * @param {*} res
     * @param {*} id
     * @memberof RoleController
     */
    @Get(':id')
    @ApiOperation({ title: 'Get role detail by role profile guid' })
    @ApiImplicitQuery({ name: 'id', description: 'Filter by ROLE_GUID', required: true })
    // @Resources({resourceName:'ViewProfile',resourceOperation:'GETALL'})
    findOne(@Req() req, @Res() res, @Param('id') id) {
        // console.log(id);
        // console.log(req);
        let dataId = null;
        let dataIdParam = req.query.id;
        if (dataIdParam == null) {
            dataId = id;
        } else {
            dataId = dataIdParam;
        }
        if (dataId == null) {
            res.status(400);
            res.send('id not found');
        }

        this.roleService.getRoleDetail(dataId).subscribe(
            data => {
                res.send(data);
            },
            err => {
                this.resultStatusService.sendError(err, res);
            }
        );

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
        this.roleService.updateToEmployee(req.user, updateUserRoleDTO)
            .subscribe(
                data => {
                    if (data.status == 200)
                        res.send(data.data);
                },
                err => {
                    this.resultStatusService.sendErrorV2(res, 400, 'Fail to update resource');
                }
            )
    }
}