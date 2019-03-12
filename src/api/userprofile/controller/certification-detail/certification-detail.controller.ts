import { Controller, Get, Req, Res, UseGuards, Param, Patch, Body } from '@nestjs/common';
import { UserprofileService } from '../../userprofile.service';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';
import { ApiOperation, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
import { switchMap } from 'rxjs/operators';
import { ResourceGuard } from 'src/guard/resource.guard';
import { Roles } from 'src/decorator/resource.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UpdateEmploymentDetailDTO } from '../../dto/userprofile-detail/employment-detail/update-employment-detail.dto';

@Controller('api/userprofile')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CertificationDetailController {
    constructor(
        private readonly userprofileService: UserprofileService,
        private readonly accessLevelValidationService: AccessLevelValidateService) {}

    @UseGuards(ResourceGuard)
    @Get('certification-detail/edit/:id')
    @Roles('EditProfile','ProfileAdmin')
    @ApiOperation({title: 'Get certification detail for requested user'})
    @ApiImplicitQuery({ name: 'id', description: 'filter user by USER_INFO_GUID', required: true })
    findOne(@Param('id') id,@Req() req,@Res() res) {

        const user = req.user;
        this.accessLevelValidationService.generateFilterWithChecking(user.TENANT_GUID,user.USER_GUID,req.accessLevel,['(USER_INFO_GUID='+id+')'])
            .pipe(switchMap(filter => {
                return this.userprofileService.getCertificationDetail(filter);
            }))
            .subscribe(
                data => {
                    res.send(data);
                },
                err => {
                    if(err.response.data) {
                        res.status(err.response.data.error.context.resource[0].status_code);
                        res.send(err.response.data.error.context.resource[0].message)
                    } else {
                        res.status(500);
                        res.send(err);
                    }
                }
            )
    }

    @UseGuards(ResourceGuard)
    @Patch('certification-detail/edit')
    @Roles('ProfileAdmin')
    @ApiOperation({title: 'Update certification detail for this user profile'})
    update(@Body() updateCertificationDetailDTO,@Req() req, @Res() res) {
        console.log(updateCertificationDetailDTO);

        res.send(updateCertificationDetailDTO);
    }
}
