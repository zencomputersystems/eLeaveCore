import { Controller, Get, Req, Res, UseGuards, Param, Patch, Body } from '@nestjs/common';
import { UserprofileService } from '../../service/userprofile.service';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';
import { ApiOperation, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
import { switchMap } from 'rxjs/operators';
import { ResourceGuard } from 'src/guard/resource.guard';
import { Roles } from 'src/decorator/resource.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

/**
 * Controller for certification detail
 *
 * @export
 * @class CertificationDetailController
 */
@Controller('api/userprofile')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CertificationDetailController {

    // /**
    //  *Creates an instance of CertificationDetailController.
    //  * @param {UserprofileService} userprofileService
    //  * @param {AccessLevelValidateService} accessLevelValidationService
    //  * @param {CommonFunctionService} commonFunctionService
    //  * @memberof CertificationDetailController
    //  */
    // constructor(
    //     private readonly userprofileService: UserprofileService,
    //     private readonly accessLevelValidationService: AccessLevelValidateService,
    //     private readonly commonFunctionService: CommonFunctionService) { }

    // /**
    //  * Find certification detail by id
    //  *
    //  * @param {*} id
    //  * @param {*} req
    //  * @param {*} res
    //  * @memberof CertificationDetailController
    //  */
    // @UseGuards(ResourceGuard)
    // @Get('certification-detail/:id')
    // @Roles('EditProfile', 'ProfileAdmin')
    // @ApiOperation({ title: 'Get certification detail for requested user' })
    // @ApiImplicitQuery({ name: 'id', description: 'filter user by USER_INFO_GUID', required: true })
    // findOne(@Param('id') id, @Req() req, @Res() res) {

    //     const user = req.user;
    //     this.accessLevelValidationService.generateFilterWithChecking(user.TENANT_GUID, user.USER_GUID, req.accessLevel, ['(USER_INFO_GUID=' + id + ')'])
    //         .pipe(switchMap(filter => {
    //             return this.userprofileService.getCertificationDetail(filter);
    //         }))
    //         .subscribe(
    //             data => {
    //                 res.send(data);
    //             },
    //             err => {
    //                 this.commonFunctionService.sendResErrorV3(err, res);
    //                 // if(err.response.data) {
    //                 //     res.status(err.response.data.error.context.resource[0].status_code);
    //                 //     res.send(err.response.data.error.context.resource[0].message)
    //                 // } else {
    //                 //     res.status(500);
    //                 //     res.send(err);
    //                 // }
    //             }
    //         )
    // }

    // /**
    //  * Update certificatio detail
    //  *
    //  * @param {*} updateCertificationDetailDTO
    //  * @param {*} req
    //  * @param {*} res
    //  * @memberof CertificationDetailController
    //  */
    // @UseGuards(ResourceGuard)
    // @Patch('certification-detail')
    // @Roles('ProfileAdmin')
    // @ApiOperation({ title: 'Update certification detail for this user profile' })
    // update(@Body() updateCertificationDetailDTO, @Req() req, @Res() res) {
    //     console.log(updateCertificationDetailDTO);

    //     res.send(updateCertificationDetailDTO);
    // }
}

