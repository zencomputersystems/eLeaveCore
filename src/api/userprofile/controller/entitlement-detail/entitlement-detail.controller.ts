import { Controller, UseGuards, Get, Param, Req, Res, Post, Body, Patch, Delete } from '@nestjs/common';
import { ResourceGuard } from 'src/guard/resource.guard';
import { Roles } from 'src/decorator/resource.decorator';
import { ApiOperation, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
import { AssignLeavePolicyDTO } from '../../dto/leave-entitlement/assign-leave-policy.dto';
import { UserLeaveEntitlementService } from '../../service/user-leave-entitlement.service';
import { AuthGuard } from '@nestjs/passport';
import { CommonFunctionService } from '../../../../common/helper/common-function.services';
// import { UpdateUserLeaveEntitlementDTO } from '../../dto/leave-entitlement/update-user-leave-entitlement.dto';

/**
 *  Controller for entitlement detail
 *
 * @export
 * @class EntitlementDetailController
 */
@Controller('api/leave-entitlement')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class EntitlementDetailController {

    /**
     *Creates an instance of EntitlementDetailController.
     * @param {UserLeaveEntitlementService} entitlementService
     * @memberof EntitlementDetailController
     */
    constructor(
        private readonly entitlementService: UserLeaveEntitlementService,
        private readonly commonFunctionService: CommonFunctionService
    ) { }

    /**
     * Get entitlement detail for this user
     *
     * @param {*} req
     * @param {*} res
     * @memberof EntitlementDetailController
     */
    @Get()
    @ApiOperation({ title: 'Get entitlement detail for this user' })
    findOwn(@Req() req, @Res() res) {

        // console.log('req');
        const user = req.user;

        this.entitlementService.getEntitlementList(user.TENANT_GUID, user.USER_GUID)
            .subscribe(
                result => {
                    // console.log(result);
                    res.send(result);
                },
                err => {
                    res.send(err);
                    console.log(err);
                }
            )

    }

    /**
     * Get employment detail to edit for requested user
     *
     * @param {*} id
     * @param {*} req
     * @param {*} res
     * @memberof EntitlementDetailController
     */
    @UseGuards(ResourceGuard)
    @Get(':id')
    @Roles('ProfileAdmin')
    @ApiOperation({ title: 'Get entitlement detail to edit for requested user' })
    @ApiImplicitQuery({ name: 'id', description: 'filter entitlement by USER_GUID', required: true })
    findOne(@Param('id') id, @Req() req, @Res() res) {

        const user = req.user;

        id = this.commonFunctionService.findIdParam(req, res, id);

        this.entitlementService.getEntitlementList(user.TENANT_GUID, id)
            .subscribe(
                result => {
                    // console.log(result);
                    res.send(result);
                },
                err => {
                    res.send(err);
                    console.log(err);
                }
            )

    }

    /**
     * Assign leave entitlement to user
     *
     * @param {AssignLeavePolicyDTO} assignLeaveDTO
     * @param {*} req
     * @param {*} res
     * @memberof EntitlementDetailController
     */
    @UseGuards(ResourceGuard)
    @Post()
    @Roles('ProfileAdmin')
    @ApiOperation({ title: 'Assign leave entitlement to user' })
    create(@Body() assignLeaveDTO: AssignLeavePolicyDTO, @Req() req, @Res() res) {
        this.entitlementService.assignEntitlement(req.user, assignLeaveDTO)
            .subscribe(
                data => {
                    console.log(data);
                    res.send(data);
                },
                err => {
                    // console.log(err);
                    res.status(500);
                    res.send();
                },
                () => {
                    res.send();
                }
            )
    }


    // /**
    //  * Update leave-entitlement
    //  *
    //  * @param {*} insertDTO
    //  * @param {*} req
    //  * @param {*} res
    //  * @memberof EntitlementDetailController
    //  */
    // @UseGuards(ResourceGuard)
    // @Patch()
    // @Roles('ProfileAdmin')
    // @ApiOperation({ title: 'Update user leave entitlement' })
    // update(@Body() updateUserLeaveEntitlementDTO: UpdateUserLeaveEntitlementDTO, @Req() req, @Res() res) {
    //     this.commonFunctionService.runUpdateService(this.entitlementService.updateLeaveEntitlement(req.user, updateUserLeaveEntitlementDTO), res);
    // }


    /**
     * Delete user leave entitlement 
     *
     * @param {*} id
     * @param {*} req
     * @param {*} res
     * @memberof EntitlementDetailController
     */
    @Delete(':id')
    @ApiOperation({ title: 'Delete user leave entitlement' })
    @ApiImplicitQuery({ name: 'id', description: 'Delete by user leave entitlement guid', required: true })
    deleteLeavetypeEntitlement(@Param('id') id, @Req() req, @Res() res) {
        id = this.commonFunctionService.findIdParam(req, res, id);
        this.commonFunctionService.runUpdateService(this.entitlementService.deleteLeaveEntitlement(req.user, id), res);
    }

}
