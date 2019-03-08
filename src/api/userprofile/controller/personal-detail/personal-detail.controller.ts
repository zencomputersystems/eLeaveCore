import { Controller, UseGuards, Get, Req, Res, Param, Post, Patch, Body } from '@nestjs/common';
import { RolesGuard } from 'src/guard/role.guard';
import { Resources } from 'src/decorator/resource.decorator';
import { ResourceDecoratorModel } from 'src/decorator/resource.decorator.model';
import { ApiOperation, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserprofileService } from '../../userprofile.service';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';
import { switchMap } from 'rxjs/operators';
import { UpdatePersonalDetailDTO } from '../../dto/userprofile-detail/personal-detail/update-personal-detail.dto';

@Controller('api/userprofile')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class PersonalDetailController {
    
    constructor(
        private readonly userprofileService: UserprofileService,
        private readonly accessLevelValidationService: AccessLevelValidateService) {}


    @Get('me/edit')
    @ApiOperation({title: 'Get personal detail to edit for this user'})
    findOwn(@Req() req,@Res() res) {
        //get the requesting user
        const user = req.user;

        const filters = ['(TENANT_GUID='+user.TENANT_GUID+')','(USER_GUID='+user.USER_GUID+')'];

        this.userprofileService.getPersonalDetail(filters)
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

    @UseGuards(RolesGuard)
    @Get('personal-detail/edit/:id')
    @Resources(new ResourceDecoratorModel('EditProfile','GET'))
    @ApiOperation({title: 'Get personal detail to edit for requested user'})
    @ApiImplicitQuery({ name: 'id', description: 'filter user by USER_INFO_GUID', required: true })
    findOne(@Param('id') id,@Req() req,@Res() res) {

        const user = req.user;
        this.accessLevelValidationService.generateFilterWithChecking(user.TENANT_GUID,user.USER_GUID,req.accessLevel,['(USER_INFO_GUID='+id+')'])
            .pipe(switchMap(filter => {
                return this.userprofileService.getPersonalDetail(filter);
            }))
            .subscribe(
                data => {
                    res.send(data);
                },
                err => {
                    res.status(500);
                    res.send(err);
                }
            )
    }

    @UseGuards(RolesGuard)
    @Patch('personal-detail/edit')
    @Resources(new ResourceDecoratorModel('EditProfile','UPDATE'))
    @ApiOperation({title: 'Update userprofile'})
    update(@Body() updatePersonalDetailDTO: UpdatePersonalDetailDTO,@Req() req, @Res() res) {
        res.send("update personal detail");
    }
}
