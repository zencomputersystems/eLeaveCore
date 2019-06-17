import { Controller, Post, Body, Get, Param, Req, Res, Patch, UseGuards } from '@nestjs/common';
import { CreateCostCentreDto } from './dto/create-costcentre.dto';
import { UpdateCostCentreDto } from './dto/update-costcentre.dto';
import {CostcentreService} from './costcentre.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

/**
 *
 *
 * @export
 * @class CostcentreController
 */
@Controller('/api/admin/costcentre')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CostcentreController {

  constructor(private readonly costcentreService: CostcentreService) {}

  /**
   *
   *
   * @param {CreateCostCentreDto} createBranchDTO
   * @param {*} req
   * @param {*} res
   * @memberof CostcentreController
   */
  @Post()
  create(@Body() createBranchDTO: CreateCostCentreDto,@Req() req, @Res() res) {

    this.costcentreService.create(req.user,createBranchDTO.name)
      .subscribe(
        data => {
          if(data.status==200)
            res.send(data.data);
        },
        err => {
          res.status(400);
          res.send('Fail to create resource');
          //console.log(err.response.data.error.context);
        }
    )
  }

  /**
   *
   *
   * @param {UpdateCostCentreDto} updateBranchDTO
   * @param {*} req
   * @param {*} res
   * @memberof CostcentreController
   */
  @Patch()
  update(@Body() updateBranchDTO: UpdateCostCentreDto,@Req() req, @Res() res) {
    this.costcentreService.update(req.user,updateBranchDTO)
      .subscribe(
        data => {
          if(data.status==200)
            res.send(data.data);
        },
        err => {
          res.status(400);
          res.send('Fail to update resource');    
        }
    )
  }

  /**
   *
   *
   * @param {*} req
   * @param {*} res
   * @memberof CostcentreController
   */
  @Get()
  findAll(@Req() req,@Res() res) {
    this.costcentreService.findAll(req.user.TENANT_GUID).subscribe(
      data => {
        res.send(data.data.resource);
      },
      err => {
        console.log(err.response.data.error);
        res.status(400);
          res.send('Fail to fetch resource');  
      }
    );

  }

  /**
   *
   *
   * @param {*} id
   * @param {*} req
   * @param {*} res
   * @memberof CostcentreController
   */
  @Get(':id')
  findOne(@Param('id') id, @Req() req,@Res() res) {
    this.costcentreService.findById(req.user.TENANT_GUID, id).subscribe(
      data => {
        res.send(data.data.resource[0]);
      },
      err => {
        res.status(400);
          res.send('Fail to fetch resource');  
      }
    );
  }

}
