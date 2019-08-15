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
import { CommonFunctionService } from '../../../../common/helper/common-function.services';
import { NotificationService } from 'src/admin/notification/notification.service';

/**
 * Controller for personal detail
 *
 * @export
 * @class PersonalDetailController
 */
@Controller('api/userprofile')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class PersonalDetailController {

    /**
     *Creates an instance of PersonalDetailController.
     * @param {UserprofileService} userprofileService
     * @param {AccessLevelValidateService} accessLevelValidationService
     * @param {XMLParserService} xmlParserService
     * @memberof PersonalDetailController
     */
    constructor(
        private readonly userprofileService: UserprofileService,
        private readonly accessLevelValidationService: AccessLevelValidateService,
        private readonly commonFunctionService: CommonFunctionService,
        private readonly notificationService: NotificationService,
        private readonly xmlParserService: XMLParserService) { }


    /**
     * Get personal detail to edit for this user
     *
     * @param {*} req
     * @param {*} res
     * @memberof PersonalDetailController
     */
    @Get('personal-detail')
    @ApiOperation({ title: 'Get personal detail to edit for this user' })
    findOwn(@Req() req, @Res() res) {
        //get the requesting user
        const user = req.user;

        const filters = ['(TENANT_GUID=' + user.TENANT_GUID + ')', '(USER_GUID=' + user.USER_GUID + ')'];

        this.userprofileService.getPersonalDetail(filters)
            .subscribe(
                data => {
                    res.send(data);
                },
                err => {
                    // console.log(err.response.data.error);
                    res.status(500);
                    res.send();
                }
            )
    }

    /**
     * Get personal detail to edit for requested user
     *
     * @param {*} id
     * @param {*} req
     * @param {*} res
     * @memberof PersonalDetailController
     */
    @UseGuards(ResourceGuard)
    @Get('personal-detail/:id')
    @Roles('EditProfile', 'ProfileAdmin')
    @ApiOperation({ title: 'Get personal detail to edit for requested user' })
    @ApiImplicitQuery({ name: 'id', description: 'filter user by USER_INFO_GUID', required: true })
    findOne(@Param('id') id, @Req() req, @Res() res) {
        id = this.commonFunctionService.findIdParam(req, res, id);
        const user = req.user;
        this.accessLevelValidationService.generateFilterWithChecking(user.TENANT_GUID, user.USER_GUID, req.accessLevel, ['(USER_INFO_GUID=' + id + ')'])
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

    /**
     * Update userprofile
     *
     * @param {UpdatePersonalDetailDTO} updatePersonalDetailDTO
     * @param {*} req
     * @param {*} res
     * @returns
     * @memberof PersonalDetailController
     */
    @UseGuards(ResourceGuard)
    @Patch('personal-detail')
    @Roles('EditProfile', 'ProfileAdmin')
    @ApiOperation({ title: 'Update userprofile' })
    update(@Body() updatePersonalDetailDTO: UpdatePersonalDetailDTO, @Req() req, @Res() res) {
        const notify = this.commonFunctionService.setNotificationData(req.user.USER_GUID, '[USER_NAME] has update the profile', 'user-update', '');
        this.notificationService.create(notify).subscribe();

        return this.userprofileService.updatePersonalDetail(updatePersonalDetailDTO, req.USER_GUID)
            .subscribe(
                data => {
                    res.send(data.data.resource);
                },
                err => {
                    res.status(500);
                    if (err.response.data) {
                        res.send(err.response.data.error)
                    } else {
                        res.send(err);
                    }
                }
            )
    }
}
