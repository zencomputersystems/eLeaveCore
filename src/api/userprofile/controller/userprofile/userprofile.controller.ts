import { Controller, UseGuards, Get, Req, Res, Param, Post, Patch } from '@nestjs/common';
import { RolesGuard } from 'src/guard/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { Resources } from 'src/decorator/resource.decorator';
import { ResourceDecoratorModel } from 'src/decorator/resource.decorator.model';
import { UserprofileService } from '../../userprofile.service';
import { map, switchMap } from 'rxjs/operators';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';

@Controller('api/userprofile')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserprofileController {

    constructor(
        private readonly userprofileService: UserprofileService,
        private readonly accessLevelValidationService: AccessLevelValidateService) {}

    @UseGuards(RolesGuard)
    @Get('list')
    @ApiOperation({title: 'Get list of employee'})
    @Resources(new ResourceDecoratorModel('ViewProfile','GETALL'))
    findAll(@Req() req, @Res() res) {

        this.accessLevelValidationService.generateFilterWithChecking(req.user.TENANT_GUID,req.user.USER_GUID,req.accessLevel,[])
            .pipe(switchMap(filter => {
                return this.userprofileService.getList(filter);
            }))
            .subscribe(
                data => {
                    return res.send(data.data.resource);
                },
                err => {
                    res.status(500);
                    res.send(err.response.data.error);
                }
            )
    }

    @UseGuards(RolesGuard)
    @Get('detail/:id')
    @ApiOperation({title: 'Get profile detail for requested user'})
    @ApiImplicitQuery({ name: 'id', description: 'filter user by USER_INFO_GUID', required: true })
    @Resources(new ResourceDecoratorModel('ViewProfile','GET'))
    findOne(@Param('id') id, @Req() req,@Res() res) {
        
        if(id==null) {
            res.status(400);
            res.send('id not found');
        }
        //get the requesting user
        const user = req.user;

        this.accessLevelValidationService.generateFilterWithChecking(user.TENANT_GUID,user.USER_GUID,req.accessLevel,['(USER_INFO_GUID='+id+')'])
            .pipe(
                switchMap(filter => {
                    return this.userprofileService.getDetail(filter);
                })
            )
            .subscribe(
                data => {
                    res.send(data);
                },
                err => {
                    console.log(err);
                    res.status(500);
                    res.send(err);
                }
            )
    }

    @Get('me')
    @ApiOperation({title: 'Get profile detail for requesting user'})
    findOwn(@Req() req,@Res() res) {
        
        //get the requesting user
        const user = req.user;

        const filters = ['(TENANT_GUID='+user.TENANT_GUID+')','(USER_GUID='+user.USER_GUID+')'];

        this.userprofileService.getDetail(filters)
            .subscribe(
                data => {
                    res.send(data);
                },
                err => {
                    res.status(500);
                    res.send();
                }
            )
    }
  
}
