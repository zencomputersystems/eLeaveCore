import { Controller, UseGuards, Post, Body, Req, Res, Get, Patch, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { RoleDTO } from './dto/role.dto';
import { RoleService } from './role.service';
import { UpdateRoleDTO } from './dto/update-role.dto';
import { UpdateUserRoleDTO } from './dto/update-userrole.dto';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { QueueNotificationDTO } from '../notification/dto/queue-notification.dto';
import { NotificationService } from '../notification/notification.service';

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
     * @param {CommonFunctionService} commonFunctionService
     * @memberof RoleController
     */
    constructor(
        private readonly roleService: RoleService,
        private readonly commonFunctionService: CommonFunctionService,
        private readonly notificationService: NotificationService
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
        // let notify = new QueueNotificationDTO;
        // notify.employeeId = req.user.USER_GUID;
        // notify.message = '[USER_NAME] has view role';
        // notify.category = 'view role';
        // console.log(notify);
        // const notify = this.commonFunctionService.setNotificationData(req.user.USER_GUID, '[USER_NAME] has view role', 'view-role');
        // this.notificationService.create(notify).subscribe();
        this.commonFunctionService.runGetServiceV2(this.roleService.findRoleProfile(), res);
        // this.roleService.findRoleProfile().subscribe(
        //     data => {
        //         res.send(data);
        //     },
        //     err => {
        //         this.commonFunctionService.sendResErrorV3(err, res);
        //     }
        // );

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
        // console.log(roleSetupDTO);
        // this.roleService.create(req.user, roleSetupDTO).subscribe(
        //     data => {
        //         if (data.status == 200)
        //             res.send(data.data.resource);
        //     },
        //     err => {
        //         res.status(400);
        //         res.send(err);
        //     }
        // )
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
        // this.roleService.updateRole(req.user, updateRoleDTO)
        // .subscribe(
        //     data => {
        //         if (data.status == 200)
        //             res.send(data.data);
        //     },
        //     err => {
        //         this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to update resource');
        //     }
        // )
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
    @ApiImplicitQuery({
        name: 'id', description: 'Filter by ROLE_GUID', required: true
        // ,enum: ['3d0458f0-9725-11e9-95ae-0f5d05c199b7', '7ed41000-98aa-11e9-b9d9-0901b57c06f4', '86bedde0-97d3-11e9-b12e-11cd8f889ff1']
    })
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

        this.commonFunctionService.runGetServiceV2(this.roleService.getRoleDetail(dataId), res);
        // this.roleService.getRoleDetail(dataId).subscribe(
        //     data => {
        //         res.send(data);
        //     },
        //     err => {
        //         this.commonFunctionService.sendResErrorV3(err, res);
        //     }
        // );

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

        // this.roleService.updateToEmployee(req.user, updateUserRoleDTO)
        //     .subscribe(
        //         data => {
        //             if (data.status == 200)
        //                 res.send(data.data);
        //         },
        //         err => {
        //             this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to update resource');
        //         }
        //     )
    }
}