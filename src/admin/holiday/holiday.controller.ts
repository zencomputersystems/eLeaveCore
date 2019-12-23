import { Controller, UseGuards, Get, Req, Res, Param, Post, Body, Patch, HttpService, Delete, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery, ApiImplicitParam } from '@nestjs/swagger';
import { HolidayService } from './holiday.service';
import { ResourceGuard } from 'src/guard/resource.guard';
import { Roles } from 'src/decorator/resource.decorator';
import { CreateCalendarDTO } from './dto/create-calendar.dto';
import { UpdateCalendarDTO } from './dto/update-calendar.dto';
import { UpdateUserCalendarDTO } from './dto/update-usercalendar.dto';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

/**
 * Controller for Holiday
 *
 * @export
 * @class HolidayController
 */
@Controller('/api/admin/holiday')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class HolidayController {
	/**
	 *Creates an instance of HolidayController.
	 * @param {HolidayService} holidayService Holiday service
	 * @param {HttpService} http Http Service
	 * @param {CommonFunctionService} commonFunctionService Common Function service
	 * @memberof HolidayController
	 */
	constructor(
		private readonly holidayService: HolidayService,
		private http: HttpService,
		private readonly commonFunctionService: CommonFunctionService
	) { }

	/**
	 * List data from calendarific for admin to view and pick
	 *
	 * @param {*} req
	 * @param {*} res
	 * @memberof HolidayController
	 */
	@Get('/calendar')
	@ApiOperation({ title: 'Get holiday list from calendarific' })
	@ApiImplicitQuery({ name: 'country', description: 'ref : https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes', required: false })
	@ApiImplicitQuery({ name: 'year', description: '2019, 2020, ...', required: false })
	@ApiImplicitQuery({ name: 'location', description: 'my-10, my-09, ...', required: false })
	@ApiImplicitQuery({ name: 'month', description: '1, 2, ...', required: false })
	findHoliday(@Req() req, @Res() res) {
		var dt = new Date();

		let countryLink = req.query.country != null ? '&country=' + req.query.country : '&country=my';
		let yearLink = req.query.year != null ? '&year=' + req.query.year : '&year=' + dt.getFullYear();
		let locationLink = req.query.location != null ? '&location=' + req.query.location : '';
		let monthLink = req.query.month != null ? '&month=' + req.query.month : '';
		let localNational = '&type=local,national';

		let arrKey = ['29106b407bdd770140057e044bcb3db0d64a3a51', 'fc56e1848bee6b48e3af29bcb042a2d76c17ff55'];

		let randomNumber = Math.round(Math.random());

		let calendarBaseUrl = 'https://calendarific.com/api/v2/holidays';
		let calendarApiKey = '?api_key=' + arrKey[randomNumber];

		let calendarFullURL = calendarBaseUrl + calendarApiKey;

		this.http.get(calendarFullURL + countryLink + yearLink + locationLink + monthLink + localNational)
			.subscribe((response) => {
				res.send(response.data);
			}, err => {
				res.send(new BadRequestException('Please input filter data'));
			});

	}

	/**
	 * List all calendar profile for user admin to assign to employee
	 *
	 * @param {*} res
	 * @memberof HolidayController
	 */
	@Get('/calendar-profile')
	@ApiOperation({ title: 'Get calendar profile list' })
	findAllCalendar(@Req() req, @Res() res) {
		this.commonFunctionService.runGetServiceV2(this.holidayService.getCalendarProfileList(req.user), res);
	}

	/**
	 * Update calendar-profile name and data
	 *
	 * @param {UpdateCalendarDTO} updateCalendarDTO
	 * @param {*} req
	 * @param {*} res
	 * @memberof HolidayController
	 */
	@Patch('/calendar-profile')
	@ApiOperation({ title: 'Edit calendar profile' })
	updateCalendarProfile(@Body() updateCalendarDTO: UpdateCalendarDTO, @Req() req, @Res() res) {
		this.commonFunctionService.runUpdateService(this.holidayService.updateCalendarProfile(req.user, updateCalendarDTO), res);
	}

	/**
	 * Create new calendar profile
	 *
	 * @param {CreateCalendarDTO} createCalendarDTO
	 * @param {*} req
	 * @param {*} res
	 * @memberof HolidayController
	 */
	@Post('/calendar-profile')
	@ApiOperation({ title: 'Setup calendar profile' })
	create(@Body() createCalendarDTO: CreateCalendarDTO, @Req() req, @Res() res) {
		this.commonFunctionService.runCreateService(this.holidayService.createCalendarProfile(req.user, createCalendarDTO), res);
	}

	/**
	 * Delete calendar profile
	 *
	 * @param {*} id
	 * @param {*} req
	 * @param {*} res
	 * @memberof HolidayController
	 */
	@Delete('/calendar-profile/:id')
	@ApiOperation({ title: 'Delete calendar profile' })
	@ApiImplicitParam({ name: 'id', description: 'Delete by CALENDAR_GUID', required: true })
	deleteHolidayProfile(@Param('id') id, @Req() req, @Res() res) {
		this.commonFunctionService.runUpdateService(this.holidayService.deleteCalendar(req.user, id), res);
	}

	/**
	 * List holiday from calendar profile id
	 *
	 * @param {*} res
	 * @param {*} param
	 * @memberof HolidayController
	 */
	@UseGuards(ResourceGuard)
	@Get('/calendar-profile/days/:id/:year')
	@ApiOperation({ title: 'Get holiday list by calendar profile' })
	@ApiImplicitParam({ name: 'id', description: 'CALENDAR_GUID', required: true })
	@ApiImplicitParam({ name: 'year', description: 'YEAR', required: true })
	@Roles('ViewProfile', 'ProfileAdmin')
	findOne(@Res() res, @Param() param) {
		this.commonFunctionService.runGetServiceV2(this.holidayService.getHolidayList(param.id, param.year), res);
	}

	/**
	 * List employee attach to calendar
	 *
	 * @param {*} res
	 * @param {*} id
	 * @memberof HolidayController
	 */
	@UseGuards(ResourceGuard)
	@Get('/calendar-profile/users/:id')
	@ApiOperation({ title: 'Get employee list by calendar profile' })
	@ApiImplicitParam({ name: 'id', description: 'Filter by CALENDAR_GUID', required: true })
	@Roles('ViewProfile', 'ProfileAdmin')
	findEmployeeAttach(@Req() req, @Res() res, @Param('id') id) {
		this.commonFunctionService.runGetServiceV2(this.holidayService.getEmployeeAttach(id, req.user.TENANT_GUID), res);
	}

	/**
	 * Assign calendar to employee user info
	 *
	 * @param {UpdateUserCalendarDTO} updateUserCalendarDTO
	 * @param {*} req
	 * @param {*} res
	 * @memberof HolidayController
	 */
	@Patch('/calendar-profile/user-calendar')
	@ApiOperation({ title: 'Assign calendar profile to employee' })
	updateToEmployee(@Body() updateUserCalendarDTO: UpdateUserCalendarDTO, @Req() req, @Res() res) {
		this.commonFunctionService.runUpdateService(this.holidayService.updateToEmployee(req.user, updateUserCalendarDTO), res);
	}

}
