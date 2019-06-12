import { Controller, UseGuards, Get, Req, Res, Param, Post, Body, Patch, HttpService } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { HolidayService } from './holiday.service';
import { UpdateHolidayDTO } from './dto/update-holiday.dto';
import { ResourceGuard } from 'src/guard/resource.guard';
import { Roles } from 'src/decorator/resource.decorator';
import { CreateCalendarDTO } from './dto/create-calendar.dto';
var iso3166 = require('iso3166-2-db');

@Controller('/admin/api/holiday')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class HolidayController {


    constructor(private readonly holidayService: HolidayService, private http: HttpService) { }

    @Get('/calendar')
    @ApiOperation({ title: 'Get holiday list calendar' })
    @ApiImplicitQuery({ name: 'country', description: 'ref : https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes', required: false })
    @ApiImplicitQuery({ name: 'year', description: '2019, 2020, ...', required: false })
    @ApiImplicitQuery({ name: 'location', description: 'my-10, my-09, ...', required: false })
    @ApiImplicitQuery({ name: 'month', description: '1, 2, ...', required: false })
    findHoliday(@Req() req, @Res() res) {
        // console.log(req.query);
        var dt = new Date();

        let countryLink = req.query.country != null ? '&country=' + req.query.country : '&country=my';
        let yearLink = req.query.year != null ? '&year=' + req.query.year : '&year=' + dt.getFullYear();
        let locationLink = req.query.location != null ? '&location=' + req.query.location : '';
        let monthLink = req.query.month != null ? '&month=' + req.query.month : '';

        // console.log(countryLink+' '+yearLink+' '+locationLink+' '+Date());

        this.http.get('https://calendarific.com/api/v2/holidays?api_key=fc56e1848bee6b48e3af29bcb042a2d76c17ff55' + countryLink + yearLink + locationLink + monthLink).subscribe((response) => {
            // console.log(response.data);
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

    @Get('/countries')
    @ApiOperation({ title: 'Get country list' })
    findCountry(@Req() req, @Res() res) {
        var countries = iso3166;
        // console.log(countries.findCountryByName('Malaysia'));
        // const dataCountry = countries.findCountryByName('Malaysia');
        res.send(countries.getDataSet());
    }

    @Get()
    @ApiOperation({ title: 'Get holiday list' })
    findAll(@Req() req, @Res() res) {
        console.log(req.user);

        const userinfoid = '3080a2e0-3f24-11e9-a26d-69162988f772';

        this.holidayService.getList(userinfoid).subscribe(
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

    @UseGuards(ResourceGuard)
    @Get(':id')
    @ApiOperation({ title: 'Get holiday list' })
    @ApiImplicitQuery({ name: 'id', description: 'filter user by USER_INFO_GUID', required: true })
    @Roles('ViewProfile', 'ProfileAdmin')
    findOne(@Req() req, @Res() res) {
        console.log(req.query.id);

        let dataId = req.query.id;
        if (dataId == null) {
            res.status(400);
            res.send('id not found');
        }


        const userinfoid = '3080a2e0-3f24-11e9-a26d-69162988f772';

        this.holidayService.getList(dataId).subscribe(
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

    @Patch()
    update(@Body() updateHolidayDTO: UpdateHolidayDTO, @Req() req, @Res() res) {
        this.holidayService.update(req.user, updateHolidayDTO)
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

    @Post()
    create(@Body() createCalendarDTO: CreateCalendarDTO, @Req() req, @Res() res) {
        this.holidayService.create(req.user, createCalendarDTO)
            .subscribe(
                data => {
                    console.log(data);
                    //   if(data.status==200)
                    res.send(data);
                },
                err => {
                    //   console.log(err);
                    res.status(400);
                    res.send(err);
                    //console.log(err.response.data.error.context);
                }
            )
    }

}
