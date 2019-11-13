import { Controller, UseGuards, Get, Param, Req, Res, Patch, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { MasterSetupService } from './master-setup.service';
import { MasterSetupDTO } from './dto/master-setup.dto';

/**
 * Controller for master setup
 *
 * @export
 * @class MasterSetupController
 */
@Controller('api/admin/master')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class MasterSetupController {
  /**
   *Creates an instance of MasterSetupController.
   * @param {MasterSetupService} masterSetupService
   * @memberof MasterSetupController
   */
  constructor(
    private readonly masterSetupService: MasterSetupService
  ) { }

  /**
   * Find all item endpoint
   *
   * @param {*} dataId
   * @param {*} req
   * @param {*} res
   * @memberof MasterSetupController
   */
  @Get(':item')
  @ApiOperation({ title: 'Get data list' })
  @ApiImplicitParam({
    name: 'item', description: 'Get list of master item', required: true,
    enum: ['department', 'designation', 'section', 'branch', 'bank', 'costcentre', 'country', 'employee_type', 'employee_status']
  })
  findAll(@Param('item') dataId, @Req() req, @Res() res) {
    let item = this.verifyItem();

    if (item.includes(dataId.toLowerCase())) {
      this.masterSetupService.runGetItem(dataId, req.user).subscribe(
        data => { res.send(data); },
        err => { res.status(400); res.send('item not found'); });
    } else {
      res.status(400);
      res.send('item not found');
    }

  }

  /**
   * Update item endpoint
   *
   * @param {*} get_item
   * @param {MasterSetupDTO} data
   * @param {*} req
   * @param {*} res
   * @memberof MasterSetupController
   */
  @Patch(':item')
  @ApiOperation({ title: 'Update data list' })
  @ApiImplicitParam({
    name: 'item', description: 'Update list of master item', required: true,
    enum: ['department', 'designation', 'section', 'branch', 'bank', 'costcentre', 'country', 'employee_type', 'employee_status']
  })
  updateMaster(@Param('item') dataId, @Body() data: MasterSetupDTO, @Req() req, @Res() res) {
    let item = this.verifyItem();

    if (item.includes(dataId.toLowerCase())) {
      this.masterSetupService.updateMasterItem([data, dataId, req.user]).subscribe(
        data => { res.send(data); },
        err => { res.status(400); res.send('item not found'); });
    } else {
      res.status(400);
      res.send('item not found');
    }

  }

  /**
   * Return list item to find
   *
   * @returns
   * @memberof MasterSetupController
   */
  public verifyItem() {
    return ['department', 'designation', 'section', 'branch', 'bank', 'costcentre', 'country', 'employee_type', 'employee_status'];
  }

}