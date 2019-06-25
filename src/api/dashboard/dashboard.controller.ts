import { Controller, UseGuards, HttpService, Get, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { DreamFactory } from 'src/config/dreamfactory';
import { ResultStatusService } from 'src/common/helper/result-status.service';

/**
 * All dashboard api
 *
 * @export
 * @class DashboardController
 */
@Controller('/api')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class DashboardController {
    constructor(private http: HttpService, private resultStatusService: ResultStatusService) { }

    /**
     * Get total employee and onleave count
     *
     * @param {*} req
     * @param {*} res
     * @memberof DashboardController
     */
    @Get('/employee/status-onleave')
    @ApiOperation({ title: 'Get total employee' })
    @ApiImplicitQuery({ name: 'tenantguid', description: 'Tenant guid', required: true })
    @ApiImplicitQuery({ name: 'startdate', description: 'Start date leave', required: true })
    @ApiImplicitQuery({ name: 'enddate', description: 'End date leave', required: true })
    findTotalEmployee(@Req() req, @Res() res) {
        this.runService(req, res, 'dashboard_onleave');
    }

    /**
     * Get employee onleave (name and designation)
     *
     * @param {*} req
     * @param {*} res
     * @memberof DashboardController
     */
    @Get('/employee/leave-list')
    @ApiOperation({ title: 'Get total employee' })
    @ApiImplicitQuery({ name: 'tenantguid', description: 'Tenant guid', required: true })
    @ApiImplicitQuery({ name: 'startdate', description: 'Start date leave', required: true })
    @ApiImplicitQuery({ name: 'enddate', description: 'End date leave', required: true })
    findEmployeeLeaveList(@Req() req, @Res() res) {
        this.runService(req, res, 'employee_leave_list');
    }

    /**
     * Function refactor run service 
     *
     * @param {*} req
     * @param {*} res
     * @param {*} method_procedure
     * @memberof DashboardController
     */
    public runService(req, res, method_procedure) {
        let url = DreamFactory.df_host_proc + `${method_procedure}(${req.query.tenantguid},${req.query.startdate},${req.query.enddate})`;
        this.http.get(url).subscribe(data => {
            this.resultStatusService.sendSuccess(data, res);
        }, err => {
            this.resultStatusService.sendError(err, res);
        });
    }

}