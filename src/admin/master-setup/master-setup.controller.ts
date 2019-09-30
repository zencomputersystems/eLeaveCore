import { Controller, UseGuards, Get, Param, Req, Res, Patch, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { CommonFunctionService } from '../../common/helper/common-function.services';
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
   * @param {*} get_item
   * @param {*} req
   * @param {*} res
   * @memberof MasterSetupController
   */
  @Get(':item')
  @ApiOperation({ title: 'Get data list' })
  @ApiImplicitQuery({
    name: 'item', description: 'Get list of master item', required: true,
    enum: ['department', 'designation', 'section', 'branch', 'bank', 'costcentre', 'country', 'employee_type', 'employee_status']
  })
  findAll(@Param('item') get_item, @Req() req, @Res() res) {

    let { dataId, item } = this.verifyItem(req, get_item);

    if (item.includes(dataId)) {
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
  @ApiImplicitQuery({
    name: 'item', description: 'Update list of master item', required: true,
    enum: ['department', 'designation', 'section', 'branch', 'bank', 'costcentre', 'country', 'employee_type', 'employee_status']
  })
  updateMaster(@Param('item') get_item, @Body() data: MasterSetupDTO, @Req() req, @Res() res) {

    let { dataId, item } = this.verifyItem(req, get_item);

    if (item.includes(dataId)) {
      this.masterSetupService.updateMasterItem([data, dataId, req.user]).subscribe(
        data => { res.send(data); },
        err => { res.status(400); res.send('item not found'); });
    } else {
      res.status(400);
      res.send('item not found');
    }

  }

  /**
   * Check parameter data
   *
   * @param {*} req
   * @param {*} get_item
   * @returns
   * @memberof MasterSetupController
   */
  public verifyItem(req, get_item) {
    // list item to find
    let item = ['department', 'designation', 'section', 'branch', 'bank', 'costcentre', 'country', 'employee_type', 'employee_status'];
    // item to get
    let dataId: string = null;
    // if have item from implicit query set to dataid param 
    let dataIdParam: string = req.query.item;
    // if no data, get from link
    dataId = dataIdParam == null ? get_item : dataIdParam;
    // lowercase all item
    dataId = dataId.toLowerCase();

    return { dataId, item };
  }

}