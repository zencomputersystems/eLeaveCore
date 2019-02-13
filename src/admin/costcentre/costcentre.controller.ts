import { Controller, Post, Body, Get, Param, Req, Res, Patch, UseGuards } from '@nestjs/common';
import { CreateCostCentreDto } from './dto/create-costcentre.dto';
import { UpdateCostCentreDto } from './dto/update-costcentre.dto';
import {CostcentreService} from './costcentre.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/admin/costcentre')
@UseGuards(AuthGuard('jwt'))
export class CostcentreController {

  constructor(private readonly costcentreService: CostcentreService) {}

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

  @Get()
  findAll(@Req() req,@Res() res) {
    this.costcentreService.findAll(req.user.USER_GUID,req.user.TENANT_GUID).subscribe(
      data => {
        res.send(data.data.resource);
      },
      err => {
        res.status(400);
          res.send('Fail to fetch resource');  
      }
    );

  }

  @Get(':id')
  findOne(@Param('id') id, @Req() req,@Res() res) {
    this.costcentreService.findById(req.user.USER_GUID,req.user.TENANT_GUID, id).subscribe(
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
