import { Controller, UseGuards, Get, Req, Res, Param, Post, Patch, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { Roles } from 'src/decorator/resource.decorator';
import { UserprofileService } from '../../service/userprofile.service';
import { switchMap, map } from 'rxjs/operators';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';
import { ResourceGuard } from 'src/guard/resource.guard';
import { EntitlementDetailDTO } from '../../dto/userprofile-detail/entitlement-detail/entitlement-detail.dto';
import { throws } from 'assert';

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
        private readonly accessLevelValidationService: AccessLevelValidateService) { }

    /**
     * Find all user profile
     *
     * @param {*} req
     * @param {*} res
     * @memberof UserprofileController
     */
    @UseGuards(ResourceGuard)
    @Get('/users')
    @ApiOperation({ title: 'Get list of employee' })
    @Roles('ViewProfile', 'ProfileAdmin', 'EditProfile')
    findAll(@Req() req, @Res() res) {

        this.accessLevelValidationService.generateFilterWithChecking(req.user.TENANT_GUID, req.user.USER_GUID, req.accessLevel, [])
            .pipe(switchMap(filter => {
                return this.userprofileService.getList(filter);
            }))
            .subscribe(
                data => {
                    return res.send(data);
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

        let dataId = null;
        let dataIdTemp = req.query.id;
        if (dataIdTemp == null) {
            dataId = id;
        } else {
            dataId = dataIdTemp;
        }
        // console.log(req.query.id);
        if (dataId == null) {
            res.status(400);
            res.send('id not found');
        }
        //get the requesting user
        const user = req.user;
        // console.log(user);

        // const filter = ['(TENANT_GUID=' + user.TENANT_GUID + ')', '(USER_GUID=' + dataId + ')'];
        // console.log(user.TENANT_GUID + ' - ' + user.USER_GUID + ' - ' + req.accessLevel + ' - (USER_GUID=' + dataId + ')');

        this.accessLevelValidationService.generateFilterWithChecking(user.TENANT_GUID, user.USER_GUID, req.accessLevel, ['(USER_GUID=' + dataId + ')'])
            .pipe(
                switchMap(filter => {
                    // console.log(filter);
                    return this.userprofileService.getDetail(filter);
                    // filter;
                })
                ).subscribe(data => {
                    // console.log(data);
                    if(data){
                        // console.log('data');
                        this.getEntitlementProcess(data, res, user);
                    }else{
                        // console.log('nfe');
                        res.send(new NotFoundException(`Data user guid not found`));
                    }
                    // try{
                    //     console.log('data');
                    //     this.getEntitlementProcess(data, res, user);
                    // }catch(error){
                    //     console.log('nfe');
                    //     res.send(error)
                        
                    // }
                }, err => {
                    // console.log(err);
                    res.status(500);
                    if (err.response.data) {
                        res.send(err.response.data1.error)
                    } else {
                        res.send(err);
                    }
                });

        // console.log(filter);

        // })
        // )
        // .subscribe(
        //     data => {
        //         res.send(data);
        //         // console.log(data + " find");
        //         // this.getEntitlementProcess(data, res, user);
        //         // this.userprofileService.getEntitlementDetail(user.TENANT_GUID, user.USER_GUID).subscribe(
        //         //     data => {
        //         //         let leaveData = [];
        //         //         for (let i = 0; i < data.length; i++) {
        //         //             let tempObj = new EntitlementDetailDTO;
        //         //             tempObj.leaveTypeId = data[i].LEAVE_TYPE_GUID;
        //         //             tempObj.leaveTypeName = data[i].LEAVE_CODE;
        //         //             tempObj.entitledDays = data[i].ENTITLED_DAYS;
        //         //             tempObj.pendingDays = data[i].TOTAL_PENDING;
        //         //             tempObj.takenDays = data[i].TOTAL_APPROVED;
        //         //             tempObj.balanceDays = data[i].BALANCE_DAYS;
        //         //             leaveData.push(tempObj);
        //         //         }
        //         //         data1.entitlementDetail = leaveData;
        //         //         res.send(data1);
        //         //     },
        //         //     err => {
        //         //         res.status(500);
        //         //         if (err.response) {
        //         //             res.send(err.response.data.error)
        //         //         } else {
        //         //             res.send(err);
        //         //         }
        //         //     }
        //         // )

        //     },
        //     err => {

        //         res.status(500);
        //         if (err.response.data1) {
        //             res.send(err.response.data1.error)
        //         } else {
        //             res.send(err);
        //         }
        //     }
        // )
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

        const filters = ['(TENANT_GUID=' + user.TENANT_GUID + ')', '(USER_GUID=' + user.USER_GUID + ')'];

        this.userprofileService.getDetail(filters)
            .subscribe(
                data => {
                    // console.log(data + " own");
                    this.getEntitlementProcess(data, res, user);
                    // this.userprofileService.getEntitlementDetail(user.TENANT_GUID, user.USER_GUID).subscribe(
                    //     data => {
                    //         let leaveData = [];
                    //         for (let i = 0; i < data.length; i++) {
                    //             let tempObj = new EntitlementDetailDTO;
                    //             console.log(data[i].LEAVE_TYPE_GUID);
                    //             tempObj.leaveTypeId = data[i].LEAVE_TYPE_GUID;
                    //             tempObj.leaveTypeName = data[i].LEAVE_CODE;
                    //             tempObj.entitledDays = data[i].ENTITLED_DAYS;
                    //             tempObj.pendingDays = data[i].TOTAL_PENDING;
                    //             tempObj.takenDays = data[i].TOTAL_APPROVED;
                    //             tempObj.balanceDays = data[i].BALANCE_DAYS;
                    //             leaveData.push(tempObj);
                    //         }
                    //         data1.entitlementDetail = leaveData;
                    //         res.send(data1);
                    //     },
                    //     err => {
                    //         res.status(500);
                    //         if (err.response) {
                    //             res.send(err.response.data.error)
                    //         } else {
                    //             res.send(err);
                    //         }
                    //     }
                    // )
                },
                err => {

                    res.status(500);
                    if (err.response) {
                        res.send(err.response.data.error)
                    } else {
                        res.send(err);
                    }
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
    public getEntitlementProcess(data1, res, user) {
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
                if (err.response) {
                    res.send(err.response.data.error)
                } else {
                    res.send(err);
                }
            }
        )
    }

}
