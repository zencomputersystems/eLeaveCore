import { Controller, UseGuards, Post, Body, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { ApplyLeaveDTO } from '../../dto/apply-leave.dto';
import { ApprovalService } from 'src/common/approval/service/approval.service';
import { ApprovedLeaveDTO } from '../../dto/approved-leave.dto';

/**
 * Controller for approve leave
 *
 * @export
 * @class ApprovedController
 */
@Controller('api')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ApprovedController {

    /**
     *Creates an instance of ApprovedController.
     * @param {ApprovalService} approvedService
     * @memberof ApprovedController
     */
    constructor(private readonly approvedService: ApprovalService) { }

    /**
     * Approved leave policy change
     *
     * @param {*} req
     * @param {*} res
     * @memberof ApprovedController
     */
    @Post('leave/policy')
    @ApiOperation({ title: 'Approved Leave' })
    policyChange(@Req() req, @Res() res) {

        this.approvedService.onPolicyChanged("EVERYONE", 1, req.user.TENANT_GUID)
            .subscribe(
                data => {
                    res.send(data);
                },
                err => {
                    console.log(err);
                },
                () => {
                    res.send();
                }
            )
    }

    /**
     * Approved leave
     *
     * @param {ApprovedLeaveDTO} approvedLeaveDTO
     * @param {*} req
     * @param {*} res
     * @memberof ApprovedController
     */
    @Post('leave/approved')
    @ApiOperation({ title: 'Approved Leave' })
    approved(@Body() approvedLeaveDTO: ApprovedLeaveDTO, @Req() req, @Res() res) {

        this.approvedService.onApproveReject([approvedLeaveDTO.id, req.user.TENANT_GUID, req.user.USER_GUID, true])
            .subscribe(
                data => {
                    res.send(data);
                },
                err => {
                    console.log(err);
                    res.send(err);
                }
            )

    }

    /**
     * Rejected leave
     *
     * @param {ApprovedLeaveDTO} approvedLeaveDTO
     * @param {*} req
     * @param {*} res
     * @memberof ApprovedController
     */
    @Post('leave/rejected')
    @ApiOperation({ title: 'Approved Leave' })
    rejected(@Body() approvedLeaveDTO: ApprovedLeaveDTO, @Req() req, @Res() res) {

        this.approvedService.onApproveReject([approvedLeaveDTO.id, req.user.TENANT_GUID, req.user.USER_GUID, false])
            .subscribe(
                data => {
                    res.send(data);
                },
                err => {
                    console.log(err);
                    res.send(err);
                }
            )

    }


}
