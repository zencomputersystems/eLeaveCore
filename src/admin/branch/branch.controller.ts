import { Controller, Post, Body, Get, Param, UseGuards, Req, Res, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateBranchDto } from './dto/create-branch.dto';
import { BranchService } from './branch.service';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('api/admin/branch')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class BranchController {

    constructor(private readonly branchService: BranchService) {}

    @Post()
    create(@Body() createBranchDTO: CreateBranchDto,@Req() req, @Res() res) {

      this.branchService.create(req.user,createBranchDTO.name)
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
    update(@Body() updateBranchDTO: UpdateBranchDto,@Req() req, @Res() res) {
      this.branchService.update(req.user,updateBranchDTO)
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

      this.branchService.findAll(req.user.USER_GUID,req.user.TENANT_GUID).subscribe(data => {
        res.send(data.data.resource);
      });

    }
  
    @Get(':id')
    findOne(@Param('id') id, @Req() req,@Res() res) {
      this.branchService.findById(req.user.USER_GUID,req.user.TENANT_GUID, id).subscribe(data => {
        res.send(data.data.resource[0]);
      });
    }
}
