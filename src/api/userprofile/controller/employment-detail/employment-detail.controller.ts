import { Controller, Get, Req, Res, UseGuards, Param, Patch, Body } from '@nestjs/common';
import { UserprofileService } from '../../service/userprofile.service';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';
import { ApiOperation, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
import { switchMap } from 'rxjs/operators';
import { ResourceGuard } from 'src/guard/resource.guard';
import { Roles } from 'src/decorator/resource.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UpdateEmploymentDetailDTO } from '../../dto/userprofile-detail/employment-detail/update-employment-detail.dto';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

/**
 * Controller for employment detail
 *
 * @export
 * @class EmploymentDetailController
 */
@Controller('api/userprofile')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class EmploymentDetailController {

    constructor(
        private readonly userprofileService: UserprofileService,
        private readonly accessLevelValidationService: AccessLevelValidateService,
        private readonly commonFunctionService: CommonFunctionService) { }

    /**
     * Get employment detail to edit for requested user
     *
     * @param {*} id
     * @param {*} req
     * @param {*} res
     * @memberof EmploymentDetailController
     */
    @UseGuards(ResourceGuard)
    @Get('employment-detail/:id')
    @Roles('EditProfile', 'ProfileAdmin')
    @ApiOperation({ title: 'Get employment detail to edit for requested user' })
    @ApiImplicitQuery({ name: 'id', description: 'filter user by USER_INFO_GUID', required: true })
    findOne(@Param('id') id, @Req() req, @Res() res) {
        id = this.commonFunctionService.findIdParam(req, res, id);
        const user = req.user;
        this.accessLevelValidationService.generateFilterWithChecking(user.TENANT_GUID, user.USER_GUID, req.accessLevel, ['(USER_INFO_GUID=' + id + ')'])
            .pipe(switchMap(filter => {
                return this.userprofileService.getEmploymentDetail(filter);
            }))
            .subscribe(
                data => {
                    res.send(data);
                },
                err => {
                    this.commonFunctionService.sendResErrorV3(err, res);
                    // if(err.response.data) {
                    //     res.status(err.response.data.error.context.resource[0].status_code);
                    //     res.send(err.response.data.error.context.resource[0].message)
                    // } else {
                    //     res.status(500);
                    //     res.send(err);
                    // }
                }
            )
    }

    /**
     * Update employment detail for this user profile
     *
     * @param {UpdateEmploymentDetailDTO} updateEmploymentDetailDTO
     * @param {*} req
     * @param {*} res
     * @memberof EmploymentDetailController
     */
    @UseGuards(ResourceGuard)
    @Patch('employment-detail')
    @Roles('ProfileAdmin')
    @ApiOperation({ title: 'Update employment detail for this user profile' })
    update(@Body() updateEmploymentDetailDTO: UpdateEmploymentDetailDTO, @Req() req, @Res() res) {

        this.userprofileService.updateEmploymentDetail(updateEmploymentDetailDTO, req.user.USER_GUID)
            .subscribe(
                data => {
                    res.send(data.data.resource);
                },
                err => {
                    if (err.response.data) {
                        res.status(err.response.data.error.context.resource[0].status_code);
                        res.send(err.response.data.error.context.resource[0].message)
                    } else {
                        res.status(500);
                        res.send(err);
                    }
                }
            )

    }
}

