import { Controller, UseGuards, HttpService, Get, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { DreamFactory } from 'src/config/dreamfactory';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { DashboardService } from './dashboard.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import moment = require('moment');
import { elementAt } from 'rxjs/operators';
import { LongLeaveDTO } from './dto/long-leave.dto';

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
    constructor(
        private http: HttpService,
        private commonFunctionService: CommonFunctionService,
        private dashboardService: DashboardService,
        private xmlParserService: XMLParserService
    ) { }

    /**
     * Get total employee and onleave count
     *
     * @param {*} req
     * @param {*} res
     * @memberof DashboardController
     */
    @Get('/employee/status-onleave')
    @ApiOperation({ title: 'Get total employee status onleave' })
    // @ApiImplicitQuery({ name: 'tenantguid', description: 'Tenant guid', required: true })
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
    @ApiOperation({ title: 'Get total employee on leave' })
    // @ApiImplicitQuery({ name: 'tenantguid', description: 'Tenant guid', required: true })
    @ApiImplicitQuery({ name: 'startdate', description: 'Start date leave', required: true })
    @ApiImplicitQuery({ name: 'enddate', description: 'End date leave', required: true })
    findEmployeeLeaveList(@Req() req, @Res() res) {
        this.runService(req, res, 'employee_leave_list');
    }

    /**
     * Calendar leave list
     *
     * @param {*} req
     * @param {*} res
     * @memberof DashboardController
     */
    @Get('/employee/calendar-leave-list')
    @ApiOperation({ title: 'Get all list of employee to calendar' })
    // @ApiImplicitQuery({ name: 'tenantguid', description: 'Tenant guid', required: true })
    @ApiImplicitQuery({ name: 'startdate', description: 'Start date leave', required: true })
    @ApiImplicitQuery({ name: 'enddate', description: 'End date leave', required: true })
    findCalendarLeaveList(@Req() req, @Res() res) {
        this.runService(req, res, 'calendar_leave');
    }

    /**
     * Get upcoming holiday
     *
     * @param {*} req
     * @param {*} res
     * @memberof DashboardController
     */
    @Get('/employee/upcoming-holiday')
    @ApiOperation({ title: 'Get all list of upcoming holiday' })
    getUpcomingHoliday(@Req() req, @Res() res) {
        this.dashboardService.upcomingHolidays(req.user.USER_GUID).subscribe(
            data => {
                let upcomingHolidayArr = [];
                let holidayData = this.xmlParserService.convertXMLToJson(data.data.resource[0].PROPERTIES_XML);

                holidayData.holiday.forEach(element => {
                    if (moment(element.start, 'YYYY-MM-DD') > moment()) {
                        upcomingHolidayArr.push(element);
                    }
                });
                res.send(upcomingHolidayArr);
            }, err => {
                res.send(err);
            }
        );
    }

    /**
     * Get date of birth
     *
     * @param {*} req
     * @param {*} res
     * @memberof DashboardController
     */
    @Get('/employee/date-of-birth')
    @ApiOperation({ title: 'Get date of birth' })
    getDateOfBirth(@Req() req, @Res() res) {
        this.dashboardService.getBirthday(req.user.USER_GUID, req.user.TENANT_GUID).subscribe(
            data => {
                res.send(data);
            }, err => {
                res.send(err);
            }
        );
    }

    /**
     * Get long leave
     *
     * @param {*} req
     * @param {*} res
     * @memberof DashboardController
     */
    @Get('/employee/long-leave')
    @ApiOperation({ title: 'Get upcoming long leave' })
    getLongLeave(@Req() req, @Res() res) {
        this.dashboardService.getLongLeave(req.user.USER_GUID, req.user.TENANT_GUID).subscribe(
            data => {
                let result = this.processLongLeave(data.data.resource);
                res.send(result);
            }, err => {
                res.send(err);
            }
        );
    }

    /**
     * Process long leave
     *
     * @param {*} data
     * @returns
     * @memberof DashboardController
     */
    public processLongLeave(data) {

        let daystogo = moment(data[0].START_DATE, 'YYYY-MM-DD').diff(moment(), 'days');
        let longLeaveData = new LongLeaveDTO;
        longLeaveData.startDate = moment(data[0].START_DATE, 'YYYY-MM-DD').format('DD MMMM YYYY');
        longLeaveData.endDate = moment(data[0].END_DATE, 'YYYY-MM-DD').format('DD MMMM YYYY');
        longLeaveData.noOfDays = data[0].NO_OF_DAYS;
        longLeaveData.daysToGo = daystogo + ' days to go';
        return longLeaveData;
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
        let url = DreamFactory.df_host_proc + `${method_procedure}(${req.user.TENANT_GUID},${req.query.startdate},${req.query.enddate})`;
        this.http.get(url).subscribe(data => {
            if (method_procedure == 'calendar_leave') {
                // for calendar leave list add time to start date and end date
                data.data.forEach(element => { this.addTime(element); });
            }
            this.commonFunctionService.sendResSuccessV2(data, res);

        }, err => {
            this.commonFunctionService.sendResErrorV3(err, res);
        });
    }

    /**
     * Add time to date for calendar usage
     *
     * @param {*} element
     * @returns
     * @memberof DashboardController
     */
    public addTime(element) {
        // get working hours details for each user
        let workingHours = this.xmlParserService.convertXMLToJson(element.PROPERTIES_XML);

        if (element.TIME_SLOT == null) {
            // for full day leave
            let fullPath = workingHours.property.fullday;
            element.START_DATE = element.START_DATE + ' ' + fullPath.start_time;
            element.END_DATE = element.END_DATE + ' ' + fullPath.end_time;
        } else if (element.TIME_SLOT == 'AM' || element.TIME_SLOT == 'PM') {
            // for halfday leave (AM,PM)
            let halfPath = workingHours.property.halfday[element.TIME_SLOT];
            element.START_DATE = element.START_DATE + ' ' + halfPath.start_time;
            element.END_DATE = element.END_DATE + ' ' + halfPath.end_time;
        } else {
            // for quarterday leave (Q1,Q2,Q3,Q4)
            let quarterPath = workingHours.property.quarterday[element.TIME_SLOT];
            element.START_DATE = element.START_DATE + ' ' + quarterPath.start_time;
            element.END_DATE = element.END_DATE + ' ' + quarterPath.end_time;
        }

        // remove properties xml from array
        delete element.PROPERTIES_XML;

        return element;
    }

}