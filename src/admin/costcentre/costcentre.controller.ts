import { Controller, Post, Body, Get, Param, Req, Res, Patch, UseGuards } from '@nestjs/common';
import { CreateCostCentreDto } from './dto/create-costcentre.dto';
import { UpdateCostCentreDto } from './dto/update-costcentre.dto';
import { CostcentreService } from './costcentre.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

/**
 * Controller for cost centre
 *
 * @export
 * @class CostcentreController
 */
@Controller('/api/admin/costcentre')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CostcentreController {

  constructor(private readonly costcentreService: CostcentreService,
    private readonly commonFunctionService: CommonFunctionService) { }

  /**
   * Create new cost centre
   *
   * @param {CreateCostCentreDto} createBranchDTO
   * @param {*} req
   * @param {*} res
   * @memberof CostcentreController
   */
  @Post()
  create(@Body() createBranchDTO: CreateCostCentreDto, @Req() req, @Res() res) {

    this.costcentreService.create(req.user, createBranchDTO.name)
      .subscribe(
        data => { if (data.status == 200) { res.send(data.data); } },
        err => { this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to create resource'); }
      )
  }

  /**
   * Update existing cost centre
   *
   * @param {UpdateCostCentreDto} updateBranchDTO
   * @param {*} req
   * @param {*} res
   * @memberof CostcentreController
   */
  @Patch()
  updateCostcentre(@Body() updateBranchDTO: UpdateCostCentreDto, @Req() req, @Res() res) {
    this.costcentreService.update(req.user, updateBranchDTO)
      .subscribe(
        data => { if (data.status == 200) { res.send(data.data); } },
        err => { this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to update resource'); }
      )
  }

  /**
   * Get all list of cost centre
   *
   * @param {*} req
   * @param {*} res
   * @memberof CostcentreController
   */
  @Get()
  findAllCostcentre(@Req() req, @Res() res) {
    this.costcentreService.findAll(req.user.TENANT_GUID).subscribe(
      data => {
        res.send(data.data.resource);
      },
      err => {
        console.log(err.response.data.error);
        this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to fetch resource');
      }
    );

  }

  /**
   * Get one data cost centre by id
   *
   * @param {*} id
   * @param {*} req
   * @param {*} res
   * @memberof CostcentreController
   */
  @Get(':id')
  findOne(@Param('id') id, @Req() req, @Res() res) {
    this.costcentreService.findById(req.user.TENANT_GUID, id).subscribe(
      data => {
        res.send(data.data.resource[0]);
      },
      err => {
        this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to fetch resource');
      }
    );
  }

}
