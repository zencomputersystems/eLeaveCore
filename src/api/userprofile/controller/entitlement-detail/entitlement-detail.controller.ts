import { Controller, UseGuards, Get, Param, Req, Res, Post, Body, Patch } from '@nestjs/common';
import { ResourceGuard } from 'src/guard/resource.guard';
import { Roles } from 'src/decorator/resource.decorator';
import { ApiOperation, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
import { AssignLeavePolicyDTO } from '../../dto/leave-entitlement/assign-leave-policy.dto';
import { UserLeaveEntitlementService } from '../../service/user-leave-entitlement.service';
import { AuthGuard } from '@nestjs/passport';

/**
 *  Controller for entitlement detail
 *
 * @export
 * @class EntitlementDetailController
 */
@Controller('api/userprofile')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class EntitlementDetailController {

    /**
     *Creates an instance of EntitlementDetailController.
     * @param {UserLeaveEntitlementService} entitlementService
     * @memberof EntitlementDetailController
     */
    constructor(
        private readonly entitlementService: UserLeaveEntitlementService
    ) { }

    /**
     * Get entitlement detail for this user
     *
     * @param {*} req
     * @param {*} res
     * @memberof EntitlementDetailController
     */
    @Get('leave-entitlement')
    @ApiOperation({ title: 'Get entitlement detail for this user' })
    findOwn(@Req() req, @Res() res) {

        const user = req.user;

        this.entitlementService.getEntitlementList(user.TENANT_GUID, user.USER_GUID)
            .subscribe(
                result => {
                    res.send(result);
                },
                err => {
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
    @Get('leave-entitlement/:id')
    @Roles('ProfileAdmin')
    @ApiOperation({ title: 'Get employment detail to edit for requested user' })
    @ApiImplicitQuery({ name: 'id', description: 'filter entitlement by USER_LEAVE_ENTITLEMENT_GUID', required: true })
    findOne(@Param('id') id, @Req() req, @Res() res) {

        const user = req.user;

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
    @Post('leave-entitlement')
    @Roles('ProfileAdmin')
    @ApiOperation({ title: 'Assign leave entitlement to user' })
    create(@Body() assignLeaveDTO: AssignLeavePolicyDTO, @Req() req, @Res() res) {
        this.entitlementService.assignEntitlement(req.user, assignLeaveDTO)
            .subscribe(
                data => {
                    res.send(data);
                },
                err => {
                    console.log(err);
                    res.status(500);
                    res.send();
                },
                () => {
                    res.send();
                }
            )
    }


    /**
     * Update leave-entitlement
     *
     * @param {*} insertDTO
     * @param {*} req
     * @param {*} res
     * @memberof EntitlementDetailController
     */
    @UseGuards(ResourceGuard)
    @Patch('leave-entitlement/:id')
    @Roles('ProfileAdmin')
    @ApiOperation({ title: 'Update user leave entitlement' })
    update(@Body() insertDTO, @Req() req, @Res() res) {

    }



}
