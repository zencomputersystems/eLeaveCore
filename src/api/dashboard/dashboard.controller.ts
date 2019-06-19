import { Controller, UseGuards, HttpService, Get, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { DreamFactory } from 'src/config/dreamfactory';

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
    constructor(private http: HttpService) { }

    @Get('/employee/status-onleave')
    @ApiOperation({ title: 'Get total employee' })
    @ApiImplicitQuery({ name: 'tenantguid', description: 'Tenant guid', required: true })
    @ApiImplicitQuery({ name: 'startdate', description: 'Start date leave', required: true })
    @ApiImplicitQuery({ name: 'enddate', description: 'End date leave', required: true })
    findTotalEmployee(@Req() req, @Res() res) {
        let url = DreamFactory.df_host_proc+`dashboard_onleave(${req.query.tenantguid},${req.query.startdate},${req.query.enddate})`;
        this.runService(url,res);
    }

    @Get('/employee/leave-list')
    @ApiOperation({ title: 'Get total employee' })
    @ApiImplicitQuery({ name: 'tenantguid', description: 'Tenant guid', required: true })
    @ApiImplicitQuery({ name: 'startdate', description: 'Start date leave', required: true })
    @ApiImplicitQuery({ name: 'enddate', description: 'End date leave', required: true })
    findEmployeeLeaveList(@Req() req, @Res() res) {
        let url = DreamFactory.df_host_proc+`employee_leave_list(${req.query.tenantguid},${req.query.startdate},${req.query.enddate})`;
        this.runService(url,res);
    }

    public runService(url,res){
        this.http.get(url).subscribe((response) => {
            res.send(response.data);
        }, err => {
            if (err.response.data) {
                res.status(err.response.data.error.status_code);
                res.send(err.response.data.error.message)
            } else {
                res.status(500);
                res.send(err);
            }
        });
    }

}