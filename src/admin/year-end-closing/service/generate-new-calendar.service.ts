import { Injectable, HttpService, BadRequestException } from '@nestjs/common';
import { HolidayDbService } from '../../holiday/db/holiday.db.service';
import { CalendarProfileDbService } from '../../holiday/db/calendar-profile-db.service';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { CreateCalendarDTO } from '../../holiday/dto/create-calendar.dto';
import { HolidayDataDTO } from '../../holiday/dto/holiday-data.dto';
import { Resource } from 'src/common/model/resource.model';
import { CreateHolidayDetailsModel } from 'src/admin/holiday/model/create-holiday-details.model';
import { v1 } from 'uuid';
/** XMLparser from zen library  */
var { convertXMLToJson, convertJsonToXML } = require('@zencloudservices/xmlparser');

/**
 * Service generate new calendar
 *
 * @export
 * @class GenerateNewCalendarService
 */
@Injectable()
export class GenerateNewCalendarService {
  /**
   *Creates an instance of GenerateNewCalendarService.
   * @param {HolidayDbService} holidayDbService holiday db service
   * @param {CalendarProfileDbService} calendarProfileDbService calendar profile db service
   * @param {HttpService} http http service
   * @memberof GenerateNewCalendarService
   */
  constructor(
    private readonly holidayDbService: HolidayDbService,
    private readonly calendarProfileDbService: CalendarProfileDbService,
    private http: HttpService
  ) { }

  /**
   * Generate new calendar
   *
   * @param {*} user
   * @param {number} year
   * @returns
   * @memberof YearEndClosingService
   */
  public generateNewCalendar(user: any, year: number) {
    // var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds

    return this.holidayDbService.findAllProfile()
      .pipe(map(res => {
        let calendarProfileList = res.data.resource;
        let yearBase = year; // year closing
        year = year + 1; // next year setup

        // loop each calendar profile
        calendarProfileList.forEach(element => {
          this.checkCalendarExist([element, year, user, yearBase]);
        });

      })
      ).subscribe();

  }

  /**
   * Create new calendar
   *
   * @param {[Resource, string, number, CreateCalendarDTO, any]} [resource, calendar_guid, year, dataNewYear, user]
   * @returns
   * @memberof GenerateNewCalendarService
   */
  public createNewYearCalendar([resource, calendar_guid, year, dataNewYear, user]: [Resource, string, number, CreateCalendarDTO, any]) {

    const data: CreateHolidayDetailsModel = new CreateHolidayDetailsModel;

    data.CALENDAR_DETAILS_GUID = v1();
    data.CALENDAR_GUID = calendar_guid;
    data.YEAR = year;
    data.PROPERTIES_XML = convertJsonToXML(dataNewYear);
    data.CREATION_USER_GUID = user.USER_GUID;

    resource.resource.push(data);

    this.calendarProfileDbService.createByModel(resource, [], [], []).pipe(
      map(res => {
        const results = res.status == 200 ? res.data.resource : new BadRequestException();
        return results;
      })
    ).subscribe(
      data => {
        return data;
      }, err => {
        return err;
      });

    return resource;

  }

  /**
   * Check calendar exist
   *
   * @param {*} element
   * @param {number} year
   * @param {*} user
   * @param {*} yearBase
   * @memberof GenerateNewCalendarService
   */
  // public checkCalendarExist(element, year: number, user, yearBase) {
  public checkCalendarExist([element, year, user, yearBase]: [any, number, any, any]) {

    // console.log(element.CALENDAR_GUID + ' - ' + year);
    this.calendarProfileDbService.findByFilterV2([], ['(CALENDAR_GUID=' + element.CALENDAR_GUID + ')', '(YEAR=' + year + ')']).subscribe(
      data => {
        // console.log(data);
        if (data.length == 0) {
          console.log('data not exist');
          // get each calendar holiday one by one
          this.createCalendarProcess([element, year, user, yearBase]);
        }
      }, err => {
        console.log(err);
      }
    );

  }

  /**
   * Process create calendar
   *
   * @param {*} element
   * @param {*} year
   * @param {*} user
   * @param {*} yearBase
   * @memberof GenerateNewCalendarService
   */
  public createCalendarProcess([element, year, user, yearBase]) {
    this.calendarProfileDbService.findAll(element.CALENDAR_GUID, yearBase).pipe(
      mergeMap(res => {
        // find filter criteria and get data from calendarific
        let filters = convertXMLToJson(element.FILTER_CRITERIA);

        let calendarBaseUrl = 'https://calendarific.com/api/v2/holidays';
        let calendarApiKey = '?api_key=fc56e1848bee6b48e3af29bcb042a2d76c17ff55';
        let calendarFullURL = calendarBaseUrl + calendarApiKey;

        let countryLink = '&country=' + filters.country;
        let yearLink = '&year=' + year;
        let locationLink = '&location=' + filters.region;

        let calendarificData = this.http.get(calendarFullURL + countryLink + yearLink + locationLink);

        return forkJoin(of(res), calendarificData);
      })
    ).subscribe(data => {
      if (data[0].data.resource[0].PROPERTIES_XML != null) {
        let resource = new Resource(new Array);

        let dataCurrent: CreateCalendarDTO = convertXMLToJson(data[0].data.resource[0].PROPERTIES_XML);

        console.log(element.CALENDAR_GUID);
        let dataNewYear = new CreateCalendarDTO;
        let newYearHoliday = [];

        dataCurrent.holiday.forEach(element2 => {
          if (element2.holidayName != undefined) {
            // console.log(element2.holidayName);
            // console.log(element.CODE);
            // console.log(element2.holidayName);
            let dataSame = data[1].data.response.holidays.filter(x => x.name == element2.holidayName);

            if (dataSame.length > 0) {
              let dataArr = new HolidayDataDTO;
              // console.log(dataSame);
              dataArr.title = element2.title;
              dataArr.holidayName = dataSame[0].name;
              dataArr.start = dataSame[0].date.iso;
              dataArr.end = dataSame[0].date.iso;
              // console.log(dataArr);
              newYearHoliday.push(dataArr);
            }
          }
        });

        dataNewYear.code = dataCurrent.code;
        dataNewYear.filter = dataCurrent.filter;
        dataNewYear.rest = dataCurrent.rest;
        dataNewYear.holiday = newYearHoliday;

        // console.log(dataNewYear);

        let resTemp = this.createNewYearCalendar([resource, element.CALENDAR_GUID, year, dataNewYear, user]);
        console.log(resTemp);
        // dataCurrent.holiday.forEach(element => {
        //   if (element.holidayName != undefined) {
        //     console.log(element.holidayName);
        //   }
        //   // console.log(element.holidayName);
        // });
      } else {
        console.log('No data to insert');
      }
    }, err => {
      console.log(err);
    });
  }

}