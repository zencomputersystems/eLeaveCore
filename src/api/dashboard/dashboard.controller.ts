import { Controller, UseGuards, HttpService, Get, Req, Res, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { DreamFactory } from 'src/config/dreamfactory';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { DashboardService } from './dashboard.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { DashboardLeaveService } from './dashboard-leave.service';
import moment = require('moment');
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
		private dashboardLeaveService: DashboardLeaveService
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
				let holidayData = this.dashboardService.xmlParserService.convertXMLToJson(data.data.resource[0].PROPERTIES_XML);

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
	@ApiOperation({ title: 'Get upcoming long leave (>= 5 days)' })
	getLongLeave(@Req() req, @Res() res) {
		this.dashboardService.getLongLeave(req.user.USER_GUID, req.user.TENANT_GUID).subscribe(
			data => {
				let result;
				if (data.data.resource.length > 0) {
					result = this.dashboardService.processLongLeave(data.data.resource);
				} else {
					result = { "status": "Not available" };
				}

				res.send(result);
			}, err => {
				res.send(err);
			}
		);
	}

	/**
	 * Annual leave
	 *
	 * @param {*} req
	 * @param {*} res
	 * @memberof DashboardController
	 */
	@Get('/employee/dashboard-annual-leave')
	@ApiOperation({ title: 'Get dashboard annual leave' })
	getAnnualLeave(@Req() req, @Res() res) {
		this.getData(this.dashboardLeaveService.getAnnualLeave(req.user.USER_GUID), res);
	}

	/**
	 * Medical leave
	 *
	 * @param {*} req
	 * @param {*} res
	 * @memberof DashboardController
	 */
	@Get('/employee/dashboard-medical-leave')
	@ApiOperation({ title: 'Get dashboard medical leave' })
	getMedicalLeave(@Req() req, @Res() res) {
		this.getData(this.dashboardLeaveService.getMedicalLeave(req.user.USER_GUID), res);
	}

	/**
	 * Get replacement leave
	 *
	 * @param {*} req
	 * @param {*} res
	 * @memberof DashboardController
	 */
	@Get('/employee/dashboard-replacement-leave')
	@ApiOperation({ title: 'Get dashboard replacement leave' })
	getReplacementLeave(@Req() req, @Res() res) {
		this.dashboardLeaveService.getReplacementLeave(req.user.USER_GUID).subscribe(
			data => {
				if (data.length > 0)
					res.send(data);
				else
					res.send({ "status": "Not available" });
			}, err => {
				res.send(err);
			}
		);
	}

	/**
	 * Get my task on dashboard
	 *
	 * @param {*} req
	 * @param {*} res
	 * @memberof DashboardController
	 */
	@Get('/employee/dashboard-my-task')
	@ApiOperation({ title: 'Get my task' })
	getMyTask(@Req() req, @Res() res) {
		this.dashboardService.getMyTask(req.user.USER_GUID).subscribe(
			data => {
				// Forkjoin data[0] is pending leave, data[1] fullname
				if (data[0].data.resource.length > 0) {
					let combineData = [];
					data[0].data.resource.forEach(element => {
						let userData = data[1].data.resource.find(x => x.USER_GUID === element.USER_GUID);
						let dataToShow = {};
						dataToShow['leave_transaction_guid'] = element.LEAVE_TRANSACTION_GUID
						dataToShow['message'] = userData.FULLNAME + ' requested leave on ' + element.START_DATE;
						dataToShow['status'] = element.STATUS;
						dataToShow['start_date'] = element.START_DATE;
						dataToShow['end_date'] = element.END_DATE;
						dataToShow['no_of_days'] = element.NO_OF_DAYS;

						combineData.push(dataToShow);
					});
					res.send(combineData);
				} else {
					res.send({ "status": "Not available" });
				}
			}, err => {
				res.send(err);
			}
		);
	}

	@Get('/employee/:leavecode/:data')
	@ApiOperation({ title: 'Get my leave' })
	@ApiImplicitQuery({
		name: 'leavecode', description: 'Annual Leave (ANL), Birthday Leave (BDL), Compassionate Leave (CPL), Hospitalization Leave (HPL), Medical Leave (MDL), Paternity Leave (PTL), Replacement Leave (RPL), Maternity Leave (MTL), Marriage Leave (MRL)', required: true,
		enum: ['ANL', 'BDL', 'CPL', 'HPL', 'MDL', 'PTL', 'RPL', 'MTL', 'MRL']
	})
	@ApiImplicitQuery({
		name: 'data', description: 'Show eLeave summary or detailed', required: true,
		enum: ['simple', 'detailed']
	})
	getMyLeave(@Param() param, @Req() req, @Res() res) {

		let dataLeave = this.verifyItem([req, param.leavecode, 'leave']);
		let dataType = this.verifyItem([req, param.data, 'type']);

		if (dataLeave.item.includes(dataLeave.dataId) && dataType.item.includes(dataType.dataId)) {
			this.dashboardLeaveService.getMyLeave([dataLeave.dataId, dataType.dataId, req.user.USER_GUID]).subscribe(
				data => {
					if (data.length == 0) {
						data = { "status": "You are not entitled for this leavetype" };
					}
					res.send(data);
				}, err => {
					res.send(err);
				}
			);
		} else {
			res.status(400);
			res.send('item not found');
		}

	}

	public verifyItem([req, get_item, param]) {
		// list item to find
		let item;

		// item to get
		let dataId: string = null;

		// if have item from implicit query set to dataid param 
		let dataIdParam: string = null;

		if (param == 'leave') {
			item = ['ANL', 'BDL', 'CPL', 'HPL', 'MDL', 'PTL', 'RPL', 'MTL', 'MRL'];
			dataIdParam = req.query.leavecode;
		} else if (param == 'type') {
			item = ['simple', 'detailed'];
			dataIdParam = req.query.data;
		}

		// if no data, get from link
		dataId = dataIdParam == null ? get_item : dataIdParam;
		// lowercase all item
		// dataId = dataId.toLowerCase();

		return { dataId, item };
	}


	/**
	 * Refactor function
	 *
	 * @param {*} method
	 * @param {*} res
	 * @memberof DashboardController
	 */
	public getData(method, res) {
		method.subscribe(
			data => {
				// res.send(data[0]);
				if (data.length > 0)
					res.send(data[0]);
				else
					res.send({ "status": "Not available" });
			}, err => {
				res.send(err);
			}
		);
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
				data.data.forEach(element => { this.dashboardService.addTime(element); });
			}
			this.commonFunctionService.sendResSuccessV2(data, res);

		}, err => {
			this.commonFunctionService.sendResErrorV3(err, res);
		});
	}



}