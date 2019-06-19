import { Controller, Get, Req, Res, Post, Body, UseGuards, Param, Patch } from '@nestjs/common';
import { LeavetypeEntitlementDbService } from './db/leavetype-entitlement.db.service';
import { CreateLeaveEntitlementTypeDTO } from './dto/create-leavetype_entitlement.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateLeaveTypeEntitlementDto } from './dto/update-leavetype_entitlement.dto';
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { ResourceGuard } from 'src/guard/resource.guard';
import { Roles } from 'src/decorator/resource.decorator';
import { LeaveTypeEntitlementService } from './leavetype-entitlement.service';
import { ResultStatusService } from 'src/common/helper/result-status.service';

/**
 *
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
        private readonly resultStatusService: ResultStatusService
    ) { }

    @UseGuards(ResourceGuard)
    @Roles('LeaveSetup')
    @ApiOperation({ title: 'Get leave entitlement for this tenant' })
    @ApiImplicitQuery({ name: 'id', description: 'filter leave by ENTITLEMENT GUID', required: true })
    @Get(':id')
    findOne(@Param('id') id, @Req() req, @Res() res) {

        this.leavetypeEntitlementService.getDetail(req.user.TENANT_GUID, id).subscribe(
            data => {
                res.send(data);
            },
            err => {
                console.log(err);
                // if(err.response.data) {
                //     res.status(err.response.data.error.status_code);
                //     res.send(err.response.data.error.message)
                // } else {
                //     res.status(500);
                //     res.send(err);
                // }
                res.send();
            }
        );
    }

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
                this.resultStatusService.sendErrorV2(res, 400, 'Fail to fetch resource');
            }
        )
    }

    @Post()
    create(@Body() createLeaveEntitlementDTO: CreateLeaveEntitlementTypeDTO, @Req() req, @Res() res) {

        this.leavetypeEntitlementDbService.create(req.user, createLeaveEntitlementDTO)
            .subscribe(
                data => {
                    if (data.status == 200)
                        res.send(data.data.resource[0]);
                    else {
                        res.status(data.status);
                        res.send();
                    }
                },
                err => {
                    console.log(err.response.data.error.context.resource);
                    this.resultStatusService.sendErrorV2(res,400,'Fail to update resource');
                }
            )
    }

    @Patch()
    update(@Body() updateLeaveTypeEntitlementDTO: UpdateLeaveTypeEntitlementDto, @Req() req, @Res() res) {
        this.leavetypeEntitlementDbService.update(req.user, updateLeaveTypeEntitlementDTO)
            .subscribe(
                data => {
                    if (data.status == 200)
                        res.send(data.data.resource[0]);
                    else {
                        res.status(data.status);
                        res.send();
                    }
                },
                err => {
                    console.log(err.response.data.error.context);
                    this.resultStatusService.sendErrorV2(res,400,'Fail to update resource');

                }
            )
    }


}