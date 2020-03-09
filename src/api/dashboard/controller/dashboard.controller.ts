import { Controller, UseGuards, Get, Req, Res, Param, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { DashboardService } from '../service/dashboard.service';
import { CommonFunctionService } from '../../../common/helper/common-function.services';
import { PendingLeaveService } from '../../../admin/approval-override/pending-leave.service';
import { mergeMap, find } from 'rxjs/operators';
// import moment = require('moment');
// /** XMLparser from zen library  */
// var { convertXMLToJson } = require('@zencloudservices/xmlparser');

/**
 * All dashboard api
 *
 * @export
 * @class DashboardController
 */
@Controller('/api/employee')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class DashboardController {
	/**
	 *Creates an instance of DashboardController.
	 * @param {DashboardService} dashboardService dashboard service
	 * @memberof DashboardController
	 */
	constructor(
		private readonly dashboardService: DashboardService,
		private readonly pendingLeaveService: PendingLeaveService
	) { }

	/**
	 * Get upcoming holiday
	 *
	 * @param {*} req
	 * @param {*} res
	 * @memberof DashboardController
	 */
	@Get('upcoming-holiday')
	@ApiOperation({ title: 'Get all list of upcoming holiday' })
	getUpcomingHoliday(@Req() req, @Res() res) {
		this.dashboardService.upcomingHolidays(req.user.USER_GUID).subscribe(
			data => {
				let upcomingHolidayArr = [];

				upcomingHolidayArr = this.dashboardService.convertData([upcomingHolidayArr, data]);
				upcomingHolidayArr.sort(function (a, b) {
					var c = new Date(a.start) as any;
					var d = new Date(b.start) as any;
					return c - d;
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
	@Get('date-of-birth')
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
	 * Find long leave
	 *
	 * @param {*} role
	 * @param {*} req
	 * @param {*} res
	 * @memberof DashboardController
	 */
	@Get('long-leave/:role')
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
	@Get('dashboard-my-task')
	@ApiOperation({ title: 'Get my task' })
	getMyTask(@Req() req, @Res() res) {
		this.dashboardService.getMyTask(req.user.USER_GUID).pipe(
			mergeMap(async res => {
				let leavetypeList = await this.pendingLeaveService.getLeavetypeList(req.user.TENANT_GUID);
				return { res, leavetypeList };
			})
		).subscribe(
			data => {
				let dataDashboard = data.res;
				let dataLeavetype = data.leavetypeList;

				// Forkjoin data[0] is pending leave, data[1] fullname
				this.processMyTaskResult([dataDashboard, dataLeavetype, res]);
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
	public processMyTaskResult([dataDashboard, dataLeavetype, res]) {

		if (dataDashboard[0].data.resource.length > 0) {
			let combineData = [];
			dataDashboard[0].data.resource.forEach(element => {
				let userData = dataDashboard[1].data.resource.find(x => x.USER_GUID === element.USER_GUID);
				let dataToShow = {};

				let findLeavetype = dataLeavetype.find(x => x.LEAVE_TYPE_GUID === element.LEAVE_TYPE_GUID);

				dataToShow['leave_transaction_guid'] = element.LEAVE_TRANSACTION_GUID
				dataToShow['message'] = userData.FULLNAME + ' requested leave on ' + element.START_DATE;
				dataToShow['reason'] = element.REASON;
				dataToShow['status'] = element.STATUS;
				dataToShow['start_date'] = element.START_DATE;
				dataToShow['end_date'] = element.END_DATE;
				dataToShow['no_of_days'] = element.NO_OF_DAYS;
				dataToShow['dateApplied'] = element.CREATION_TS;
				dataToShow['leaveTypeName'] = findLeavetype.CODE;

				combineData.push(dataToShow);
			});
			res.send(combineData);
		} else {
			res.send({ "status": "No pending leave" });
		}
	}

}