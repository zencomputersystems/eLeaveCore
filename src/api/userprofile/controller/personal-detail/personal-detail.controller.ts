import { Controller, UseGuards, Get, Req, Res, Param, Post, Patch, Body } from '@nestjs/common';
import { ApiOperation, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserprofileService } from '../../service/userprofile.service';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';
import { switchMap } from 'rxjs/operators';
import { UpdatePersonalDetailDTO } from '../../dto/userprofile-detail/personal-detail/update-personal-detail.dto';
import { ResourceGuard } from 'src/guard/resource.guard';
import { Roles } from 'src/decorator/resource.decorator';
import { XMLParserService } from 'src/common/helper/xml-parser.service';

@Controller('api/userprofile')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class PersonalDetailController {
    
    constructor(
        private readonly userprofileService: UserprofileService,
        private readonly accessLevelValidationService: AccessLevelValidateService,
        private readonly xmlParserService: XMLParserService) {}


    @Get('personal-detail')
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
                    console.log(err.response.data.error);
                    res.status(500);
                    res.send();
                }
            )
    }

    @UseGuards(ResourceGuard)
    @Get('personal-detail/:id')
    @Roles('EditProfile','ProfileAdmin')
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

    @UseGuards(ResourceGuard)
    @Patch('personal-detail')
    @Roles('EditProfile','ProfileAdmin')
    @ApiOperation({title: 'Update userprofile'})
    update(@Body() updatePersonalDetailDTO: UpdatePersonalDetailDTO,@Req() req, @Res() res) {
        
        return this.userprofileService.updatePersonalDetail(updatePersonalDetailDTO,req.USER_GUID)
            .subscribe(
                data => {
                    res.send(data.data.resource);
                },
                err => {
                    res.status(500);
                    if(err.response.data) {
                        res.send(err.response.data.error)
                    } else {
                        res.send(err);
                    }
                }
            )
    }
}
