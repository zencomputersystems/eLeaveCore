import { Controller, UseGuards, Post, Body, Req, Res, Patch, Get, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LeavetypeService } from './leavetype.service';
import { CreateLeaveTypeDTO } from './dto/create-leavetype.dto';
import { UpdateLeaveTypeDTO } from './dto/update-leavetype.dto';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { UserLeaveEntitlementDbService } from 'src/api/userprofile/db/user-leave-entitlement.db.service';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

/**
 * Leavetype controller
 *
 * @export
 * @class LeaveTypeController
 */
@Controller('/api/admin/leavetype')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class LeaveTypeController {

  /**
   *Creates an instance of LeaveTypeController.
   * @param {LeavetypeService} leavetypeService Leave type service 
   * @param {CommonFunctionService} commonFunctionService Common function service
   * @memberof LeaveTypeController
   */
  constructor(
    private readonly leavetypeService: LeavetypeService,
    private readonly commonFunctionService: CommonFunctionService,
    private readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService
  ) { }

  /**
   * Get all leavetype
   *
   * @param {*} req
   * @param {*} res
   * @memberof LeaveTypeController
   */
  @Get()
  @ApiOperation({ title: 'Find all Leavetype' })
  findAllLeavetype(@Req() req, @Res() res) {
    this.leavetypeService.findAll(req.user.TENANT_GUID).subscribe(
      data => { res.send(data.data.resource); },
      err => { this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to fetch resource'); }
    );
  }

  /**
   * Find one leavetype by id
   *
   * @param {*} id
   * @param {*} req
   * @param {*} res
   * @memberof LeaveTypeController
   */
  @Get(':id')
  @ApiOperation({ title: 'Find one Leavetype' })
  @ApiImplicitParam({ name: 'id', description: 'Filter by leavetype guid', required: true })
  findOne(@Param('id') id, @Req() req, @Res() res) {
    this.leavetypeService.findById(req.user.TENANT_GUID, id).subscribe(
      data => { res.send(data.data.resource[0]); },
      err => { this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to fetch resource'); }
    );
  }

  /**
   * Create new leavetype
   *
   * @param {CreateLeaveTypeDTO} createLeavetypeDTO
   * @param {*} req
   * @param {*} res
   * @memberof LeaveTypeController
   */
  @Post()
  @ApiOperation({ title: 'Create leavetype' })
  create(@Body() createLeavetypeDTO: CreateLeaveTypeDTO, @Req() req, @Res() res) {
    this.leavetypeService.create(req.user, createLeavetypeDTO).subscribe(
      data => { if (data.status == 200) { res.send(data.data); } },
      err => { this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to create resource'); }
    )
  }

  /**
   * Update existing leavetype
   *
   * @param {UpdateLeaveTypeDTO} updateLeaveTypeDTO
   * @param {*} req
   * @param {*} res
   * @memberof LeaveTypeController
   */
  @Patch()
  @ApiOperation({ title: 'Update Leavetype' })
  updateLeavetype(@Body() updateLeaveTypeDTO: UpdateLeaveTypeDTO, @Req() req, @Res() res) {
    this.leavetypeService.update(req.user, updateLeaveTypeDTO).subscribe(
      data => { if (data.status == 200) { res.send(data.data); } },
      err => { this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to update resource'); }
    )
  }

  /**
   * Delete leavetype
   *
   * @param {*} id
   * @param {*} req
   * @param {*} res
   * @memberof LeaveTypeController
   */
  @Delete('/:id')
  @ApiOperation({ title: 'Delete leavetype' })
  @ApiImplicitParam({ name: 'id', description: 'Delete by leavetype guid', required: true })
  deleteLeavetype(@Param('id') id, @Req() req, @Res() res) {
    this.userLeaveEntitlementDbService.findByFilterV2(['USER_LEAVE_ENTITLEMENT_GUID', 'USER_GUID'], ['(LEAVE_TYPE_GUID=' + id + ')']).pipe(mergeMap(res => {
      // Check entitlement guid if attach to user
      let resProcess;
      // if hava user attach return user list
      if (res.length > 0) {
        resProcess = of(res);
      } else { // delete leavetype entitlement 
        resProcess = this.leavetypeService.delete(req.user, id).pipe(
          map(res => { return res.data.resource; })
        );
      }
      return resProcess;
    })).subscribe(
      data => { res.send(data); },
      err => { res.status(400).send('Fail to update resource'); }
    );

    // this.commonFunctionService.runUpdateService(this.leavetypeService.delete(req.user, id), res);
  }

}

