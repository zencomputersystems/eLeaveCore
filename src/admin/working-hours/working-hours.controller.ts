import { Controller, UseGuards, Post, Body, Req, Res, Get, Patch, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { WorkingHoursService } from './working-hours.service';
import { WorkingHoursDTO } from './dto/working-hours.dto';
import { UpdateWorkingHoursDTO } from './dto/update-working-hours.dto';
import { UpdateUserWorkingHoursDTO } from './dto/update-userworkinghours.dto';

/**
 * Controller for working hours
 *
 * @export
 * @class WorkingHoursController
 */
@Controller('/api/admin/working-hours')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class WorkingHoursController {

  /**
   *Creates an instance of WorkingHoursController.
   * @param {WorkingHoursService} workingHoursService
   * @param {CommonFunctionService} commonFunctionService
   * @memberof WorkingHoursController
   */
  constructor(
    private readonly workingHoursService: WorkingHoursService,
    private readonly commonFunctionService: CommonFunctionService
  ) { }

  /**
   * Find all working hours profile
   *
   * @param {*} req
   * @param {*} res
   * @memberof WorkingHoursController
   */
  @Get('/working-hours-profile')
  @ApiOperation({ title: 'Get working hours profile list' })
  findAllWorkingHours(@Req() req, @Res() res) {
    this.commonFunctionService.runGetServiceV2(this.workingHoursService.findWorkingHoursProfile(), res);
  }

  /**
   * Create new working hours profile
   *
   * @param {WorkingHoursDTO} workingHoursSetupDTO
   * @param {*} req
   * @param {*} res
   * @memberof WorkingHoursController
   */
  @Post('/working-hours-profile')
  @ApiOperation({ title: 'Setup new working hours' })
  create(@Body() workingHoursSetupDTO: WorkingHoursDTO, @Req() req, @Res() res) {
    this.commonFunctionService.runCreateService(this.workingHoursService.create(req.user, workingHoursSetupDTO), res);
  }

  /**
   * Update existing working hours profile
   *
   * @param {UpdateWorkingHoursDTO} updateWorkingHoursDTO
   * @param {*} req
   * @param {*} res
   * @memberof WorkingHoursController
   */
  @Patch('/working-hours-profile')
  @ApiOperation({ title: 'Edit working hours profile' })
  updateWorkingHoursProfile(@Body() updateWorkingHoursDTO: UpdateWorkingHoursDTO, @Req() req, @Res() res) {
    this.commonFunctionService.runUpdateService(this.workingHoursService.updateWorkingHours(req.user, updateWorkingHoursDTO), res);
  }

  /**
   * Delete working hours profile
   *
   * @param {*} id
   * @param {*} req
   * @param {*} res
   * @memberof WorkingHoursController
   */
  @Delete('working-hours-profile/:id')
  @ApiOperation({ title: 'Delete working hours profile' })
  @ApiImplicitQuery({ name: 'id', description: 'Delete by WORKING_HOURS_GUID', required: true })
  deleteWorkingHoursProfile(@Param('id') id, @Req() req, @Res() res) {
    let idTemp = this.commonFunctionService.findIdParam(req, res, id);
    this.commonFunctionService.runUpdateService(this.workingHoursService.deleteWorkingHours(req.user, idTemp), res);
  }

  /**
   * Find one working hours profile details
   *
   * @param {*} req
   * @param {*} res
   * @param {*} id
   * @memberof WorkingHoursController
   */
  @Get(':id')
  @ApiOperation({ title: 'Get working hours detail by working hours profile guid' })
  @ApiImplicitQuery({ name: 'id', description: 'Filter by WORKING_HOURS_GUID', required: true })
  findOneWorkingHour(@Req() req, @Res() res, @Param('id') id) {
    let whId = this.commonFunctionService.findIdParam(req, req, id);
    this.commonFunctionService.runGetServiceV2(this.workingHoursService.getWorkingHoursDetail(whId), res);
  }

  /**
   * Assign working hours to employee
   *
   * @param {UpdateUserWorkingHoursDTO} updateUserWorkingHoursDTO
   * @param {*} req
   * @param {*} res
   * @memberof WorkingHoursController
   */
  @Patch('/user-working-hours')
  @ApiOperation({ title: 'Assign working hours profile to employee' })
  updateToEmployee(@Body() updateUserWorkingHoursDTO: UpdateUserWorkingHoursDTO, @Req() req, @Res() res) {
    this.commonFunctionService.runUpdateService(this.workingHoursService.updateToEmployee(req.user, updateUserWorkingHoursDTO), res);
  }

}