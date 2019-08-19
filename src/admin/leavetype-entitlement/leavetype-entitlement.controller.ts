import { Controller, Get, Req, Res, Post, Body, UseGuards, Param, Patch, Delete } from '@nestjs/common';
import { LeavetypeEntitlementDbService } from './db/leavetype-entitlement.db.service';
import { CreateLeaveEntitlementTypeDTO } from './dto/create-leavetype_entitlement.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateLeaveTypeEntitlementDto } from './dto/update-leavetype_entitlement.dto';
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { ResourceGuard } from 'src/guard/resource.guard';
import { Roles } from 'src/decorator/resource.decorator';
import { LeaveTypeEntitlementService } from './leavetype-entitlement.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

/**
 * Controller for leavetype entitlement
 *
 * @export
 * @class LeavetypeEntitlementController
 */
@Controller('api/leavetype-entitlement')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class LeavetypeEntitlementController {

    constructor(
        private readonly leavetypeEntitlementDbService: LeavetypeEntitlementDbService,
        private readonly leavetypeEntitlementService: LeaveTypeEntitlementService,
        private readonly commonFunctionService: CommonFunctionService
    ) { }

    /**
     * Find all leavetype entitlement for current tenant
     *
     * @param {*} req
     * @param {*} res
     * @memberof LeavetypeEntitlementController
     */
    @UseGuards(ResourceGuard)
    @Roles('LeaveSetup')
    @ApiOperation({ title: 'Get list of leave entitlement for this tenant' })
    @Get()
    findAll(@Req() req, @Res() res) {
        this.leavetypeEntitlementService.getList(req.user.TENANT_GUID).subscribe(
            data => {
                res.send(data);
            },
            err => {
                this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to fetch resource');
            }
        )
    }

    /**
     * Find one leavetype entitlement by id
     *
     * @param {*} id
     * @param {*} req
     * @param {*} res
     * @memberof LeavetypeEntitlementController
     */
    @UseGuards(ResourceGuard)
    @Roles('LeaveSetup')
    @ApiOperation({ title: 'Get leave entitlement for this tenant' })
    @ApiImplicitQuery({ name: 'id', description: 'filter leave by ENTITLEMENT GUID', required: true })
    @Get(':id')
    findOne(@Param('id') id, @Req() req, @Res() res) {
        id = this.commonFunctionService.findIdParam(req, res, id);
        this.leavetypeEntitlementService.getDetail(req.user.TENANT_GUID, id).subscribe(
            data => {
                res.send(data);
            },
            err => {
                this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to fetch resource');
            }
        );
    }

    /**
     * Create leavetype entitlement 
     *
     * @param {CreateLeaveEntitlementTypeDTO} createLeaveEntitlementDTO
     * @param {*} req
     * @param {*} res
     * @memberof LeavetypeEntitlementController
     */
    @Post()
    @ApiOperation({ title: 'Create leavetype entitlement' })
    create(@Body() createLeaveEntitlementDTO: CreateLeaveEntitlementTypeDTO, @Req() req, @Res() res) {

        this.leavetypeEntitlementDbService.create(req.user, createLeaveEntitlementDTO)
            .subscribe(
                data => {
                    this.sendDataSuccess(data, res);
                },
                err => {
                    console.log(err.response.data.error.context.resource);
                    this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to update resource');
                }
            )
    }

    /**
     * Update existing leavetype entitlement
     *
     * @param {UpdateLeaveTypeEntitlementDto} updateLeaveTypeEntitlementDTO
     * @param {*} req
     * @param {*} res
     * @memberof LeavetypeEntitlementController
     */
    @Patch()
    @ApiOperation({ title: 'Update Leavetype entitlement' })
    update(@Body() updateLeaveTypeEntitlementDTO: UpdateLeaveTypeEntitlementDto, @Req() req, @Res() res) {
        this.leavetypeEntitlementDbService.update(req.user, updateLeaveTypeEntitlementDTO)
            .subscribe(
                data => {
                    this.sendDataSuccess(data, res);
                },
                err => {
                    console.log(err.response.data.error.context);
                    this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to update resource');

                }
            )
    }

    @Delete('/:id')
    @ApiOperation({ title: 'Delete leavetype entitlement' })
    @ApiImplicitQuery({ name: 'id', description: 'Delete by leavetype entitlement guid', required: true })
    deleteLeavetypeEntitlement(@Param('id') id, @Req() req, @Res() res) {
        id = this.commonFunctionService.findIdParam(req, res, id);
        this.commonFunctionService.runUpdateService(this.leavetypeEntitlementDbService.deleteLeavetypeEntitlement(req.user, id), res);
    }

    /**
     * Method refactor data success
     *
     * @param {*} data
     * @param {*} res
     * @memberof LeavetypeEntitlementController
     */
    public sendDataSuccess(data, res) {
        if (data.status == 200)
            res.send(data.data.resource[0]);
        else {
            res.status(data.status);
            res.send();
        }
    }
}