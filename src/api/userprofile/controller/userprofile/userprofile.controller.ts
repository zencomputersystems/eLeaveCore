import { Controller, UseGuards, Get, Req, Res, Param, Post, Patch, NotFoundException, Delete, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery, ApiImplicitParam } from '@nestjs/swagger';
import { Roles } from 'src/decorator/resource.decorator';
import { UserprofileService } from '../../service/userprofile.service';
import { switchMap, map } from 'rxjs/operators';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';
import { ResourceGuard } from 'src/guard/resource.guard';
import { EntitlementDetailDTO } from '../../dto/userprofile-detail/entitlement-detail/entitlement-detail.dto';
import { throws } from 'assert';
import { CommonFunctionService } from '../../../../common/helper/common-function.services';
import { UserInfoDbService } from '../../../../admin/holiday/db/user-info.db.service';
import { DisableUserDTO } from '../../../../admin/user/dto/disable-user.dto';
import { UserProfileStatusService } from '../../service/userprofile-status.service';

/**
 * Controller for user profile
 *
 * @export
 * @class UserprofileController
 */
@Controller('api')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserprofileController {

    /**
     *Creates an instance of UserprofileController.
     * @param {UserprofileService} userprofileService
     * @param {AccessLevelValidateService} accessLevelValidationService
     * @memberof UserprofileController
     */
    constructor(
        private readonly userprofileService: UserprofileService,
        private readonly accessLevelValidationService: AccessLevelValidateService,
        private readonly commonFunctionService: CommonFunctionService,
        private readonly userinfoDbService: UserInfoDbService,
        private readonly userProfileStatusService: UserProfileStatusService) { }

    /**
     * Find all user profile
     *
     * @param {*} req
     * @param {*} res
     * @memberof UserprofileController
     */
    @UseGuards(ResourceGuard)
    @Get('/users/:role')
    @ApiOperation({ title: 'Get list of employee' })
    @ApiImplicitParam({ name: 'role', description: 'Whether admin or employee', required: false })
    @Roles('ViewProfile', 'ProfileAdmin', 'EditProfile')
    findAll(@Param('role') role: string, @Req() req, @Res() res) {

        // let dataRole = null;
        // let dataRoleParam = req.query.role;
        // if (dataRoleParam == null) {
        //     dataRole = role;
        // } else {
        //     dataRole = dataRoleParam;
        // }
        // role = dataRole;

        // console.log(role);
        this.accessLevelValidationService.generateFilterWithChecking(req.user.TENANT_GUID, req.user.USER_GUID, req.accessLevel, [])
            .pipe(switchMap(filter => {
                // temp
                const tempQuery = `(FULLNAME LIKE '%test%')`;
                filter.push(tempQuery);

                if (role.toLowerCase() == 'employee') {
                    const extra = '(ACTIVATION_FLAG=1)';
                    filter.push(extra);
                }
                // console.log(filter);
                return this.userprofileService.getList(filter);
            }))
            .subscribe(
                data => {
                    return res.send(data);
                },
                err => {
                    res.status(500);
                    if (err.response.data) { res.send(err.response.data.error) }
                    else { res.send(err); }
                }
            )
    }

    /**
     * Set date of resign to user
     *
     * @param {*} id
     * @param {*} req
     * @param {*} res
     * @memberof UserprofileController
     */
    @Delete('/users/:id')
    @ApiOperation({ title: 'Set resign date' })
    @ApiImplicitQuery({ name: 'id', description: 'Delete by user guid', required: true })
    setResignDate(@Param('id') id, @Req() req, @Res() res) {
        id = this.commonFunctionService.findIdParam(req, res, id);
        this.commonFunctionService.runUpdateService(this.userinfoDbService.setResignUser(req.user, id, null), res);
    }

    /**
     * Set date resign user, if resign date < current -> set inactive
     *
     * @param {{user_guid:string,resign_date:Date}} data
     * @param {*} req
     * @param {*} res
     * @memberof UserprofileController
     */
    @Post('/users/disable')
    @ApiOperation({ title: 'Set disable user' })
    setDisabledUser(@Body() data: DisableUserDTO, @Req() req, @Res() res) {
        this.commonFunctionService.runUpdateService(this.userProfileStatusService.resignAndChangeStatus(req.user, data), res);
    }

    /**
     * Find one user profile using parameter id
     *
     * @param {*} id
     * @param {*} req
     * @param {*} res
     * @memberof UserprofileController
     */
    @UseGuards(ResourceGuard)
    @Get('userprofile/:id')
    @ApiOperation({ title: 'Get profile detail for requested user' })
    @ApiImplicitQuery({ name: 'id', description: 'filter user by USER_GUID', required: true })
    @Roles('ViewProfile', 'ProfileAdmin')
    findOne(@Param('id') id, @Req() req, @Res() res) {
        // let dataId = null;
        // let dataIdTemp = req.query.id;
        // if (dataIdTemp == null) { dataId = id; }
        // else { dataId = dataIdTemp; }
        // if (dataId == null) {
        //     res.status(400);
        //     res.send('id not found');
        // }
        let dataId = this.commonFunctionService.findIdParam(req, res, id);
        const user = req.user;
        this.accessLevelValidationService.generateFilterWithChecking(user.TENANT_GUID, user.USER_GUID, req.accessLevel, ['(USER_GUID=' + dataId + ')'])
            .pipe(
                switchMap(filter => {
                    let filters: string[] = [];
                    let merge: string;
                    for (var i = 0; i < filter.length; i++) {
                        merge = filter[i - 1] + ' AND ' + filter[i];
                    }
                    filters.push(merge);
                    return this.userprofileService.getDetail(filters);
                })
            ).subscribe(data => {
                // console.log(data);
                if (data) { this.getEntitlementProcess([data, res, user]); }
                else { res.send(new NotFoundException(`Data user guid not found`)); }
            }, err => {
                res.status(500);
                // if (err.response.data) { res.send(err.response.data1.error) } 
                // else { 
                res.send(err);
                // }
            });
    }

    /**
     * Get profile detail for requesting user
     *
     * @param {*} req
     * @param {*} res
     * @memberof UserprofileController
     */
    @Get('userprofile')
    @ApiOperation({ title: 'Get profile detail for requesting user' })
    findOwn(@Req() req, @Res() res) {

        //get the requesting user
        const user = req.user;

        const filters = ['(TENANT_GUID=' + user.TENANT_GUID + ') AND (USER_GUID=' + user.USER_GUID + ')'];

        this.userprofileService.getDetail(filters)
            .subscribe(
                data => { this.getEntitlementProcess([data, res, user]); },
                err => {

                    res.status(500);
                    if (err.response) { res.send(err.response.data.error) }
                    else { res.send(err); }
                }
            )

    }

    /**
     * Method get entitlement process
     *
     * @param {*} data1
     * @param {*} res
     * @param {*} user
     * @memberof UserprofileController
     */
    public getEntitlementProcess([data1, res, user]) {
        // console.log(data1);

        this.userprofileService.getEntitlementDetail(user.TENANT_GUID, data1.userId).subscribe(
            data => {
                let leaveData = [];
                for (let i = 0; i < data.length; i++) {
                    let tempObj = new EntitlementDetailDTO;
                    // console.log(data[i].LEAVE_TYPE_GUID);
                    tempObj.leaveTypeId = data[i].LEAVE_TYPE_GUID;
                    tempObj.leaveTypeName = data[i].LEAVE_CODE;
                    tempObj.entitledDays = data[i].ENTITLED_DAYS;
                    tempObj.pendingDays = data[i].TOTAL_PENDING;
                    tempObj.takenDays = data[i].TOTAL_APPROVED;
                    tempObj.balanceDays = data[i].BALANCE_DAYS;
                    leaveData.push(tempObj);
                }
                data1.entitlementDetail = leaveData;
                res.send(data1);
            },
            err => {
                res.status(500);
                if (err.response) { res.send(err.response.data.error) }
                else { res.send(err); }
            }
        )
    }

}
