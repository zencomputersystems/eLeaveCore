import { Injectable } from "@nestjs/common";
import moment = require("moment");
import { holidayMock } from "../mock/holiday.mock";
import { ApplyLeaveDTO } from "src/api/leave/dto/apply-leave.dto";

@Injectable()
export class DateCalculationService {

    // get duration between 2 date
    getDayDuration(startDate: moment.Moment, endDate: moment.Moment, isIncludeHoliday: boolean, isIncludeRestDay: boolean) {
        startDate.startOf('days');
        endDate.endOf('days');

        // mock holiday
        const mockHoliday = holidayMock;
        const filterRestDay = new Array<any>();
        const filterHoliday = new Array<any>(); // hold the filtered holodau date
        
        // duration between start and end data
        let startEndDuration = 0;

        const copyStartDate = startDate.clone();
        while(copyStartDate<=endDate) {
            startEndDuration++; 

            if(isIncludeRestDay) {
                if(mockHoliday.rest.find(x=>x.fullname==copyStartDate.format("dddd").toUpperCase())) {
                    filterRestDay.push(copyStartDate);
                }
            }

            copyStartDate.add('1','days');
        }


    
        // find holiday between start date and end date
        if(isIncludeHoliday) {
            mockHoliday.holiday.forEach(element => {
                const holidayDate = moment(element.date,'YYYY-MM-DD');
                holidayDate.startOf('days');
                
                // check if holiday overlap with rest day
                if(holidayDate.isBetween(startDate,endDate)&& filterRestDay.find(x=>x==holidayDate.date())==undefined ) {

                    filterHoliday.push(holidayDate);
                }
            });
        }

        const holidayAmount = filterHoliday.length;
        const restDayAmount = filterRestDay.length;

        const totalDuration = (startEndDuration-(holidayAmount+restDayAmount));
        
        return totalDuration;

    }

    getLeaveDuration(firstDate: Date, secondDate: Date, dayType: number,isIncludeHoliday: boolean, isIncludeRestDay: boolean) {
        const startDate = moment(firstDate,'YYYY-MM-DD');
        const endDate = moment(secondDate,'YYYY-MM-DD');

        const duration = this.getDayDuration(startDate,endDate,isIncludeHoliday,isIncludeRestDay);

        if(dayType==1) {
            return (duration-0.5);
        }

        if(dayType==2) {
            return (duration-0.75);
        }

        return duration;
    }
}