import { Controller, UseGuards, Get, Req, Res, Param, Post, Body, Patch, HttpService } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { HolidayService } from './holiday.service';
import { ResourceGuard } from 'src/guard/resource.guard';
import { Roles } from 'src/decorator/resource.decorator';
import { CreateCalendarDTO } from './dto/create-calendar.dto';
import { UpdateCalendarDTO } from './dto/update-calendar.dto';
import { CalendarDTO } from './dto/calendar.dto';
import { UpdateUserCalendarDTO } from './dto/update-usercalendar.dto';
// var iso3166 = require('iso3166-2-db');

/**
 *
 *
 * @export
 * @class HolidayController
 */
@Controller('/admin/api/holiday')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class HolidayController {


    constructor(private readonly holidayService: HolidayService, private http: HttpService) { }

    /**
     * list data from calendarific for admin to view and pick
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

        this.http.get('https://calendarific.com/api/v2/holidays?api_key=fc56e1848bee6b48e3af29bcb042a2d76c17ff55' + countryLink + yearLink + locationLink + monthLink).subscribe((response) => {
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

    /**
     * list all calendar profile for user admin to assign to employee
     *
     * @param {*} req
     * @param {*} res
     * @memberof HolidayController
     */
    @Get('/calendar-profile')
    @ApiOperation({ title: 'Get calendar profile list' })
    findAllCalendar(@Req() req, @Res() res) {
        this.holidayService.getCalendarProfileList().subscribe(
            data => {
                res.send(data);
            },
            err => {
                if (err.response.data) {
                    res.status(err.response.data.error.status_code);
                    res.send(err.response.data.error.message)
                } else {
                    res.status(500);
                    res.send(err);
                }
            }
        );

    }

    /**
     * update calendar-profile name n data
     *
     * @param {UpdateCalendarDTO} updateCalendarDTO
     * @param {*} req
     * @param {*} res
     * @memberof HolidayController
     */
    @Patch('/calendar-profile')
    @ApiOperation({ title: 'Edit calendar profile' })
    updateCalendarProfile(@Body() updateCalendarDTO: UpdateCalendarDTO, @Req() req, @Res() res) {
        this.holidayService.updateCalendar(req.user, updateCalendarDTO)
            .subscribe(
                data => {
                    if (data.status == 200)
                        res.send(data.data);
                },
                err => {
                    res.status(400);
                    res.send('Fail to update resource');
                }
            )
    }

    /**
     * create new calendar profile
     *
     * @param {CreateCalendarDTO} createCalendarDTO
     * @param {*} req
     * @param {*} res
     * @memberof HolidayController
     */
    @Post('/calendar-profile')
    @ApiOperation({ title: 'Setup calendar profile' })
    create(@Body() createCalendarDTO: CreateCalendarDTO, @Req() req, @Res() res) {
        this.holidayService.create(req.user, createCalendarDTO)
            .subscribe(
                data => {
                    // console.log(data);
                    if (data.status == 200)
                        res.send(data.data.resource);
                },
                err => {
                    //   console.log(err);
                    res.status(400);
                    res.send(err);
                    //console.log(err.response.data.error.context);
                }
            )
    }

    /**
     * list holiday from calendar profile id
     *
     * @param {*} req
     * @param {*} res
     * @memberof HolidayController
     */
    @UseGuards(ResourceGuard)
    @Get(':id')
    @ApiOperation({ title: 'Get holiday list by calendar profile' })
    @ApiImplicitQuery({ name: 'id', description: 'Filter by CALENDAR_GUID', required: true })
    @Roles('ViewProfile', 'ProfileAdmin')
    findOne(@Req() req, @Res() res) {
        console.log(req);
        let dataId = req.query.id;
        if (dataId == null) {
            res.status(400);
            res.send('id not found');
        }

        this.holidayService.getHolidayList(dataId).subscribe(
            data => {
                res.send(data);
            },
            err => {
                if (err.response.data) {
                    res.status(err.response.data.error.status_code);
                    res.send(err.response.data.error.message)
                } else {
                    res.status(500);
                    res.send(err);
                }
            }
        );

    }

    @Patch('/user-calendar')
    @ApiOperation({ title: 'Assign calendar profile to employee' })
    updateToEmployee(@Body() updateUserCalendarDTO: UpdateUserCalendarDTO, @Req() req, @Res() res) {
        this.holidayService.updateToEmployee(req.user, updateUserCalendarDTO)
            .subscribe(
                data => {
                    if (data.status == 200)
                        res.send(data.data);
                },
                err => {
                    res.status(400);
                    res.send('Fail to update resource');
                }
            )
    }


    // /**
    //  *
    //  *
    //  * @param {*} req
    //  * @param {*} res
    //  * @memberof HolidayController
    //  */
    // @Get()
    // @ApiOperation({ title: 'Get holiday list' })
    // findAll(@Req() req, @Res() res) {
    //     // console.log(req.user);

    //     const userinfoid = '3080a2e0-3f24-11e9-a26d-69162988f772';

    //     this.holidayService.getList(userinfoid).subscribe(
    //         data => {
    //             res.send(data);
    //         },
    //         err => {
    //             if (err.response.data) {
    //                 res.status(err.response.data.error.status_code);
    //                 res.send(err.response.data.error.message)
    //             } else {
    //                 res.status(500);
    //                 res.send(err);
    //             }
    //         }
    //     );

    // }



    
    



    // @Get('/countries')
    // @ApiOperation({ title: 'Get country list' })
    // findCountry(@Req() req, @Res() res) {
    //     var countries = iso3166;
    //     // console.log(countries.findCountryByName('Malaysia'));
    //     // const dataCountry = countries.findCountryByName('Malaysia');
    //     res.send(countries.getDataSet());
    // }

}
