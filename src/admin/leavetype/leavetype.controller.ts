import { Controller, UseGuards, Post, Body, Req, Res, Patch, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LeavetypeService } from './leavetype.service';
import { CreateCostCentreDto } from '../costcentre/dto/create-costcentre.dto';
import { UpdateCostCentreDto } from '../costcentre/dto/update-costcentre.dto';
import { CreateLeaveTypeDto } from './dto/create-leavetype.dto';
import { UpdateLeaveTypeDto } from './dto/update-leavetype.dto';

@Controller('/api/admin/leavetype')
@UseGuards(AuthGuard('jwt'))
export class LeaveTypeController {

  constructor(private readonly leavetypeService: LeavetypeService) {}

  @Post()
  create(@Body() createLeavetypeDTO: CreateLeaveTypeDto,@Req() req, @Res() res) {

    this.leavetypeService.create(req.user,createLeavetypeDTO.code,createLeavetypeDTO.description)
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
  update(@Body() updateLeaveTypeDTO: UpdateLeaveTypeDto,@Req() req, @Res() res) {
    this.leavetypeService.update(req.user,updateLeaveTypeDTO)
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
    this.leavetypeService.findAll(req.user.USER_GUID,req.user.TENANT_GUID).subscribe(
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
    this.leavetypeService.findById(req.user.USER_GUID,req.user.TENANT_GUID, id).subscribe(
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

