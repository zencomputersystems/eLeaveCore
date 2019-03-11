import { Controller, Get, Req, Res, UseGuards, Param, Patch, Body } from '@nestjs/common';
import { UserprofileService } from '../../userprofile.service';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';
import { ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { ResourceDecoratorModel } from 'src/decorator/resource.decorator.model';
import { switchMap } from 'rxjs/operators';
import { UpdatePersonalDetailDTO } from '../../dto/userprofile-detail/personal-detail/update-personal-detail.dto';
import { ResourceGuard } from 'src/guard/resource.guard';
import { Roles } from 'src/decorator/resource.decorator';

@Controller('employment-detail')
export class EmploymentDetailController {
    constructor(
        private readonly userprofileService: UserprofileService,
        private readonly accessLevelValidationService: AccessLevelValidateService) {}

    @UseGuards(ResourceGuard)
    @Get('employment-detail/edit/:id')
    @Roles('EditProfile','ProfileAdmin')
    @ApiOperation({title: 'Get employment detail to edit for requested user'})
    @ApiImplicitQuery({ name: 'id', description: 'filter user by USER_INFO_GUID', required: true })
    findOne(@Param('id') id,@Req() req,@Res() res) {

        const user = req.user;
        this.accessLevelValidationService.generateFilterWithChecking(user.TENANT_GUID,user.USER_GUID,req.accessLevel,['(USER_INFO_GUID='+id+')'])
            .pipe(switchMap(filter => {
                return this.userprofileService.getEmploymentDetail(filter);
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

    @UseGuards(ResourceGuard)
    @Patch('employment-detail/edit')
    @Roles('ProfileAdmin')
    @ApiOperation({title: 'Update employment detail for this user profile'})
    update(@Body() updatePersonalDetailDTO: UpdatePersonalDetailDTO,@Req() req, @Res() res) {
        res.send(" Update employment Detail");
    }
}

