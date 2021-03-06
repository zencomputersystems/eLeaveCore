import { Injectable, HttpService } from '@nestjs/common';
import moment = require("moment");
import { getHoliday } from '../mock/holiday.mock';
import { HolidayModel } from 'src/admin/holiday/model/holiday.model';
// import { HolidayService } from 'src/admin/holiday/holiday.service';
// import { Observable } from 'rxjs';
// import { QueryParserService } from 'src/common/helper/query-parser.service';
// import { map, filter } from 'rxjs/operators';

/** XMLparser from zen library  */
var { convertXMLToJson, convertJsonToXML } = require('@zencloudservices/xmlparser');

type LeaveDuration = [Date, Date, number, boolean, boolean];
/**
 * Service for date calculation
 *
 * @export
 * @class DateCalculationService
 */
@Injectable()
export class DateCalculationService {
    // constructor(public readonly httpService: HttpService,
    //     public readonly queryService: QueryParserService) { }
    // get duration between 2 date
    // /**
    //  * Get day duration
    //  *
    //  * @param {moment.Moment} startDate
    //  * @param {moment.Moment} endDate
    //  * @param {boolean} isIncludeHoliday
    //  * @param {boolean} isIncludeRestDay
    //  * @returns
    //  * @memberof DateCalculationService
    //  */
    // getDayDuration(startDate: moment.Moment, endDate: moment.Moment, isIncludeHoliday: boolean, isIncludeRestDay: boolean) {

    /**
     * Get day duration
     *
     * @param {[moment.Moment, moment.Moment, boolean, boolean]} [startDate, endDate, isIncludeHoliday, isIncludeRestDay]
     * @returns
     * @memberof DateCalculationService
     */
    getDayDuration([startDate, endDate, isExcludeHoliday, isExcludeRestDay]: [moment.Moment, moment.Moment, boolean, boolean]) {
        // getDayDuration([startDate, endDate, isIncludeHoliday, isIncludeRestDay]: [moment.Moment, moment.Moment, boolean, boolean]) {
        startDate.startOf('days');
        endDate.endOf('days');

        // let dataHoliday = this.getHolidayList('0b8e2250-9721-11e9-bdd4-6dce2bf8cec4');

        // console.log(dataHoliday);
        // mock holiday

        // console.log(HolidayModel);
        const mockHoliday = getHoliday();
        // const mockHoliday = holidayMock;
        const filterRestDay = new Array<any>();
        const filterHoliday = new Array<any>(); // hold the filtered holiday date

        // duration between start and end data
        let startEndDuration = 0;

        // console.log(isIncludeHoliday+' - '+startDate+' - '+endDate);

        const copyStartDate = startDate.clone();
        while (copyStartDate <= endDate) {
            startEndDuration++;

            // if (!isIncludeRestDay) {
            if (isExcludeRestDay) {
                if (mockHoliday.rest.find(x => x.fullname == copyStartDate.format("dddd").toUpperCase())) {
                    // console.log(copyStartDate.format("dddd").toUpperCase());
                    filterRestDay.push(copyStartDate);
                }
            }

            // if (!isIncludeHoliday) {
            if (isExcludeHoliday) {
                if (mockHoliday.holiday.find(x => moment(x.start).format("YYYY-MM-DD") === copyStartDate.format("YYYY-MM-DD"))) {
                    // console.log(copyStartDate.format("dddd").toUpperCase());
                    filterHoliday.push(copyStartDate);
                }
            }

            copyStartDate.add('1', 'days');
        }

        // find holiday between start date and end date
        // if (isIncludeHoliday) {
        if (!isExcludeHoliday) {
            mockHoliday.holiday.forEach(element => {

                const holidayDate = moment(element.start, 'YYYY-MM-DD');
                holidayDate.startOf('days');

                // check if holiday overlap with rest day
                if (holidayDate.isBetween(startDate, endDate) && filterRestDay.find(x => x == holidayDate.date()) == undefined) {
                    filterHoliday.push(holidayDate);
                }
            });
        }

        const holidayAmount = filterHoliday.length;
        const restDayAmount = filterRestDay.length;

        const totalDuration = (startEndDuration - (holidayAmount + restDayAmount));

        // console.log(totalDuration + '-' + holidayAmount + '-' + restDayAmount);
        return totalDuration;

    }

    // /**
    //  * Get leave duration
    //  *
    //  * @param {Date} firstDate
    //  * @param {Date} secondDate
    //  * @param {number} dayType
    //  * @param {boolean} isIncludeHoliday
    //  * @param {boolean} isIncludeRestDay
    //  * @returns
    //  * @memberof DateCalculationService
    //  */
    // getLeaveDuration(data: LeaveDuration) {
    //     let firstDate: Date = data[0];
    //     let secondDate: Date = data[1];
    //     let dayType: number = data[2];
    //     let isIncludeHoliday: boolean = data[3];
    //     let isIncludeRestDay: boolean = data[4];

    /**
     * Get leave duration
     *
     * @param {LeaveDuration} [firstDate,secondDate,dayType,isIncludeHoliday,isIncludeRestDay]
     * @returns
     * @memberof DateCalculationService
     */
    getLeaveDuration([firstDate, secondDate, dayType, isExcludeHoliday, isExcludeRestDay]: LeaveDuration) {
        // getLeaveDuration([firstDate, secondDate, dayType, isIncludeHoliday, isIncludeRestDay]: LeaveDuration) {

        const startDate = moment(firstDate, 'YYYY-MM-DD');
        const endDate = moment(secondDate, 'YYYY-MM-DD');

        const duration = this.getDayDuration([startDate, endDate, isExcludeHoliday, isExcludeRestDay]);
        // const duration = this.getDayDuration([startDate, endDate, isIncludeHoliday, isIncludeRestDay]);

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
    //                 let jsonHoliday = convertXMLToJson(res.data.resource[0].PROPERTIES_XML);
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