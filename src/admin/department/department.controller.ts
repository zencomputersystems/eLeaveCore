import { Controller, UseGuards, Get, Req, Res, Param, Post, Body, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DepartmentService } from './department.service';
import { CreateDepartmentDTO } from './dto/create-department.dto';
import { UpdateDepartmentDTO } from './dto/update-department.dto';

@Controller('/api/admin/department')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class DepartmentController {

    constructor(private readonly departmentService: DepartmentService) {}

    @Get()
    findAll(@Req() req,@Res() res) {
        this.departmentService.findAll(req.user.USER_GUID,req.user.TENANT_GUID).subscribe(
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
        this.departmentService.findById(req.user.USER_GUID,req.user.TENANT_GUID, id).subscribe(
        data => {
            res.send(data.data.resource[0]);
        },
        err => {
            res.status(400);
            res.send('Fail to fetch resource');  
        }
        );
    }

    @Post()
    create(@Body() createDepartmentDTO: CreateDepartmentDTO,@Req() req, @Res() res) {

        this.departmentService.create(req.user,createDepartmentDTO.name)
        .subscribe(
            data => {
            if(data.status==200)
                res.send(data.data);
            },
            err => {
            res.status(400);
            res.send('Fail to create resource');
            console.log(err.response.data.error.context);
            }
        )
    }

    @Patch()
    update(@Body() updateDepartmentDTO: UpdateDepartmentDTO,@Req() req, @Res() res) {
        this.departmentService.update(req.user,updateDepartmentDTO)
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

}
