import { Controller, UseGuards, Get, Req, Res, Post, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { switchMap } from 'rxjs/operators';
import { ApplyLeaveService } from '../../service/apply-leave.service';
import { ApplyLeaveDTO } from '../../dto/apply-leave.dto';
import { Resources } from 'src/decorator/resource.decorator';
import { RolesGuard } from 'src/guard/role.guard';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';

/**
 * Controller for apply leave
 *
 * @export
 * @class ApplyController
 */
@Controller('api')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ApplyController {

    /**
     *Creates an instance of ApplyController.
     * @param {ApplyLeaveService} applyLeaveService
     * @memberof ApplyController
     */
    constructor(private readonly applyLeaveService: ApplyLeaveService,
        private readonly accessLevelValidationService: AccessLevelValidateService) { }

    /**
     * Method apply leave
     *
     * @param {ApplyLeaveDTO} applyLeaveDTO
     * @param {*} req
     * @param {*} res
     * @memberof ApplyController
     */
    @Post('leave/apply')
    @ApiOperation({ title: 'Apply leave' })
    findAll(@Body() applyLeaveDTO: ApplyLeaveDTO, @Req() req, @Res() res) {

        this.applyLeaveService.processLeave(applyLeaveDTO, req.user)
            .subscribe(
                data => {
                    res.send(data);
                },
                err => {
                    res.send(err);
                }
            )


    }

    /**
     * Method apply leave on behalf
     *
     * @param {*} id
     * @param {ApplyLeaveDTO} applyLeaveDTO
     * @param {*} req
     * @param {*} res
     * @memberof ApplyController
     */
    @UseGuards(RolesGuard)
    @Post('leave/apply-on-behalf/:id')
    @ApiOperation({ title: 'Apply leave on behalf' })
    @Resources({ resourceRef: 'allowLeaveManagement', resourceName: 'allowApplyOnBehalf' })
    createForOthers(@Param('id') id, @Body() applyLeaveDTO: ApplyLeaveDTO, @Req() req, @Res() res) {
        // console.log(req);
        // console.log(req.accessLevel);
        // res.send(id +' - '+ req.user.USER_GUID);
        this.accessLevelValidationService.generateFilterWithChecking(req.user.TENANT_GUID, req.user.USER_GUID, req.accessLevel, [])
            .pipe(switchMap(filter => {
                // console.log(filter);
                return this.applyLeaveService.processLeaveOnBehalf(applyLeaveDTO, req.user, id, filter);
                // return this.userprofileService.getList(filter);
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

        // this.applyLeaveService.processLeaveOnBehalf(id, req.user)
        //     .subscribe(
        //         data => {
        //             res.send(data);
        //         },
        //         err => {
        //             res.send(err);
        //         }
        //     )


    }
}
