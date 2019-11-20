import { Controller, UseGuards, Get, Req, Res, Param, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { DashboardService } from '../service/dashboard.service';
import moment = require('moment');

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
	/**
	 *Creates an instance of DashboardController.
	 * @param {DashboardService} dashboardService dashboard service
	 * @memberof DashboardController
	 */
	constructor(
		private dashboardService: DashboardService
	) { }

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

	// /**
	//  * Get long leave
	//  *
	//  * @param {*} req
	//  * @param {*} res
	//  * @memberof DashboardController
	//  */
	// @Get('/employee/long-leave')
	// @ApiOperation({ title: 'Get upcoming long leave (>= 5 days)' })
	// getLongLeave(@Req() req, @Res() res) {
	// 	this.dashboardService.getLongLeave([req.user.USER_GUID, req.user.TENANT_GUID, null]).subscribe(
	// 		data => {
	// 			let result;
	// 			if (data.data.resource.length > 0) {
	// 				result = this.dashboardService.processLongLeave(data.data.resource);
	// 			} else {
	// 				result = { "status": "Not available" };
	// 			}

	// 			res.send(result);
	// 		}, err => {
	// 			res.send(err);
	// 		}
	// 	);
	// }

	@Get('/employee/long-leave/:role')
	@ApiOperation({ title: 'Get upcoming long leave (>= 5 days)' })
	@ApiImplicitParam({ name: 'role', description: 'Role user', required: false })
	findLongLeave(@Param('role') role, @Req() req, @Res() res) {
		let method;
		if (role == 'admin') {
			method = this.dashboardService.getLongLeave([req.user.USER_GUID, req.user.TENANT_GUID, role]);
		} else {
			method = this.dashboardService.getLongLeaveSuperior([req.user.USER_GUID, req.user.TENANT_GUID, role]);
		}

		method.subscribe(
			data => {
				let result;
				if (data[0].data.resource.length > 0) {
					result = this.dashboardService.processLongLeave(data[0].data.resource, data[1]);
				} else {
					result = { "status": "Not available" };
				}
				res.send(result);
			}, err => {
				res.send(new NotFoundException('Failed to get long elave'));
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
				this.processMyTaskResult(data, res);
			}, err => {
				res.send(err);
			}
		);
	}

	/**
	 * display my task result
	 *
	 * @param {*} data
	 * @param {*} res
	 * @memberof DashboardController
	 */
	public processMyTaskResult(data, res) {

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
	}

}