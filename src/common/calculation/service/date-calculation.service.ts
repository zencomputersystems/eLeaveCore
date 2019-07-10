import { Injectable, HttpService } from '@nestjs/common';
import moment = require("moment");
import { holidayMock } from '../mock/holiday.mock';
import { HolidayModel } from 'src/admin/holiday/model/holiday.model';
// import { HolidayService } from 'src/admin/holiday/holiday.service';
// import { Observable } from 'rxjs';
// import { XMLParserService } from 'src/common/helper/xml-parser.service';
// import { QueryParserService } from 'src/common/helper/query-parser.service';
// import { map } from 'rxjs/operators';

@Injectable()
export class DateCalculationService {
    // constructor(public readonly httpService: HttpService,
    //     public readonly queryService: QueryParserService,
    //     private readonly xmlParserService: XMLParserService) { }
    // get duration between 2 date
    getDayDuration(startDate: moment.Moment, endDate: moment.Moment, isIncludeHoliday: boolean, isIncludeRestDay: boolean) {
        startDate.startOf('days');
        endDate.endOf('days');

        // let dataHoliday = this.getHolidayList('0b8e2250-9721-11e9-bdd4-6dce2bf8cec4');

        // console.log(dataHoliday);
        // mock holiday

        console.log(HolidayModel);

        const mockHoliday = holidayMock;
        const filterRestDay = new Array<any>();
        const filterHoliday = new Array<any>(); // hold the filtered holiday date

        // duration between start and end data
        let startEndDuration = 0;

        // console.log(isIncludeHoliday+' - '+startDate+' - '+endDate);

        const copyStartDate = startDate.clone();
        while (copyStartDate <= endDate) {
            startEndDuration++;

            if (!isIncludeRestDay) {
                if (mockHoliday.rest.find(x => x.fullname == copyStartDate.format("dddd").toUpperCase())) {
                    // console.log(copyStartDate.format("dddd").toUpperCase());
                    filterRestDay.push(copyStartDate);
                }
            }

            if (!isIncludeHoliday) {
                if (mockHoliday.holiday.find(x => x.date == copyStartDate.format("YYYY-MM-DD"))) {
                    // console.log(copyStartDate.format("dddd").toUpperCase());
                    filterHoliday.push(copyStartDate);
                }
            }

            copyStartDate.add('1', 'days');
        }



        // console.log('includeholiday' + isIncludeHoliday);
        // find holiday between start date and end date
        if (isIncludeHoliday) {
            mockHoliday.holiday.forEach(element => {

                // console.log('includeholiday' + element.date);
                const holidayDate = moment(element.date, 'YYYY-MM-DD');
                holidayDate.startOf('days');

                // check if holiday overlap with rest day
                if (holidayDate.isBetween(startDate, endDate) && filterRestDay.find(x => x == holidayDate.date()) == undefined) {
                    // console.log('overlap rest day');
                    filterHoliday.push(holidayDate);
                }
            });
        }

        const holidayAmount = filterHoliday.length;
        const restDayAmount = filterRestDay.length;

        const totalDuration = (startEndDuration - (holidayAmount + restDayAmount));

        // console.log(totalDuration+'-'+holidayAmount+'-'+restDayAmount);
        return totalDuration;

    }

    getLeaveDuration(firstDate: Date, secondDate: Date, dayType: number, isIncludeHoliday: boolean, isIncludeRestDay: boolean) {
        const startDate = moment(firstDate, 'YYYY-MM-DD');
        const endDate = moment(secondDate, 'YYYY-MM-DD');

        const duration = this.getDayDuration(startDate, endDate, isIncludeHoliday, isIncludeRestDay);

        if (duration <= 0) {
            return 0;
        }

        if (dayType == 1) {
            return (duration - 0.5);
        }

        if (dayType == 2) {
            return (duration - 0.75);
        }



        return duration;
    }

    // getHolidayList(calendarId: string) {
    //     console.log(calendarId);
    //     return this.findAll(calendarId)
    //         .pipe(map(res => {
    //             if (res.status == 200) {
    //                 let jsonHoliday = this.xmlParserService.convertXMLToJson(res.data.resource[0].PROPERTIES_XML);
    //                 console.log(jsonHoliday);
    //                 return jsonHoliday;
    //             }
    //         }))
    // }

    // findAll(calendarProfileId: string): Observable<any> {

    //     const fields = ['PROPERTIES_XML'];
    //     const filters = ['(CALENDAR_GUID=' + calendarProfileId + ')'];

    //     const url = this.queryService.generateDbQueryV2('l_calendar_profile', fields, filters, []);

    //     //call DF to validate the user
    //     return this.httpService.get(url);

    // }

}