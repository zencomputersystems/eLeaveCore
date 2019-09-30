import { Injectable, HttpStatus } from '@nestjs/common';
import { HolidayDbService } from './db/holiday.db.service';
import { map, mergeMap, concatMap } from 'rxjs/operators';
import { Resource } from 'src/common/model/resource.model';
import { HolidayModel } from './model/holiday.model';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { v1 } from 'uuid';
import { CreateHolidayModel } from './model/create-holiday.model';
import { CreateCalendarDTO } from './dto/create-calendar.dto';
import { CalendarDTO } from './dto/calendar.dto';
import { AssignerDataService } from 'src/common/helper/assigner-data.service';
import { UpdateUserCalendarModel } from './model/update-usercalendar.model';
import { UpdateCalendarDTO } from './dto/update-calendar.dto';
import { UserInfoDbService } from './db/user-info.db.service';
import { UpdateUserCalendarDTO } from './dto/update-usercalendar.dto';
import { of } from 'rxjs';
import { CalendarProfileDbService } from './db/calendar-profile-db.service';
import { CreateHolidayDetailsModel } from './model/create-holiday-details.model';

/**
 * Service for holiday
 *
 * @export
 * @class HolidayService
 */
@Injectable()
export class HolidayService {
    /**
     *Creates an instance of HolidayService.
     * @param {HolidayDbService} holidayDbService
     * @param {UserInfoDbService} userinfoDbService
     * @param {XMLParserService} xmlParserService
     * @param {AssignerDataService} assignerDataService
     * @memberof HolidayService
     */
    constructor(
        private readonly holidayDbService: HolidayDbService,
        private readonly userinfoDbService: UserInfoDbService,
        private readonly xmlParserService: XMLParserService,
        private readonly assignerDataService: AssignerDataService,
        private readonly calendarProfileDbService: CalendarProfileDbService) { }

    /**
     * List holiday for selected calendar by calendar guid
     *
     * @param {string} calendarId
     * @returns
     * @memberof HolidayService
     */
    public getHolidayList(calendarId: string, year: number) {
        // console.log(calendarId);
        // console.log(year);
        return this.calendarProfileDbService.findAll(calendarId, year)
            .pipe(map(res => {
                if (res.status == 200) {
                    // console.log(res.data.resource);
                    let jsonHoliday = this.xmlParserService.convertXMLToJson(res.data.resource[0].PROPERTIES_XML);
                    return jsonHoliday;
                }
            }))
    }

    /**
     * Get employee attach
     *
     * @param {string} calendarId
     * @returns
     * @memberof HolidayService
     */
    public getEmployeeAttach(calendarId: string) {
        const filters = ['(CALENDAR_GUID=' + calendarId + ')'];
        return this.userinfoDbService.findEmployeeAssign(filters)
            .pipe(map(res => {
                if (res.status == 200) {
                    // let jsonHoliday = this.xmlParserService.convertXMLToJson(res.data.resource[0].PROPERTIES_XML);
                    // return jsonHoliday;
                    return res.data.resource;
                }
            }))
    }

    /**
     * List all existing calendar
     *
     * @returns
     * @memberof HolidayService
     */
    public getCalendarProfileList() {
        return this.holidayDbService.findAllProfile()
            .pipe(map(res => {
                if (res.status == 200) {
                    let result = this.assignerDataService.assignArrayData(res.data.resource, CalendarDTO);
                    return result;
                }
            })
            )
    }

    /**
     * Assign calendar to employee user info table
     *
     * @param {*} user
     * @param {*} d
     * @returns
     * @memberof HolidayService
     */
    updateToEmployee(user: any, d: UpdateUserCalendarDTO) {
        const resource = new Resource(new Array);
        const data = new UpdateUserCalendarModel

        data.CALENDAR_GUID = d.calendar_guid;
        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;
        // let userList = '';
        // for (let i = 0; i < d.user_guid.length; i++) {
        //     if (userList == '') {
        //         userList = '"' + d.user_guid[i] + '"';
        //     } else {
        //         userList = userList + ',"' + d.user_guid[i] + '"';
        //     }
        // }
        let userList = this.assignerDataService.setBundleUserGuid(d);

        resource.resource.push(data);

        return this.userinfoDbService.updateByModel(resource, [], ['(USER_GUID IN (' + userList + '))'], []);
    }

    /**
     * Update calendar profile
     *
     * @param {*} user
     * @param {UpdateCalendarDTO} d
     * @returns
     * @memberof HolidayService
     */
    public updateCalendarProfile(user: any, d: UpdateCalendarDTO) {
        return this.updateCalendar(user, d).pipe(mergeMap(res => {
            return this.updateCalendarProfileName(user, d);
        }))
    }

    /**
     * Update calendar profile name
     *
     * @param {*} user
     * @param {UpdateCalendarDTO} d
     * @returns
     * @memberof HolidayService
     */
    updateCalendarProfileName(user: any, d: UpdateCalendarDTO) {
        const resource = new Resource(new Array);
        const data = new HolidayModel();

        // data.PROPERTIES_XML = this.xmlParserService.convertJsonToXML(d.data);
        data.CODE = d.data.code;
        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;

        resource.resource.push(data);

        return this.holidayDbService.updateByModel(resource, [], ['(CALENDAR_GUID=' + d.calendar_guid + ')'], ['CALENDAR_GUID', 'CODE']);
    }

    /**
     * Update existing calendar by calendar id
     *
     * @param {*} user
     * @param {UpdateCalendarDTO} d
     * @returns
     * @memberof HolidayService
     */
    updateCalendar(user: any, d: UpdateCalendarDTO) {
        const resource = new Resource(new Array);
        const data = new HolidayModel();

        data.PROPERTIES_XML = this.xmlParserService.convertJsonToXML(d.data);
        // data.CODE = d.data.code;
        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;

        resource.resource.push(data);

        return this.calendarProfileDbService.updateByModel(resource, [], ['(CALENDAR_GUID=' + d.calendar_guid + ')', '(YEAR=' + d.year + ')'], ['CALENDAR_GUID', 'YEAR', 'PROPERTIES_XML']);
    }

    /**
     * Delete calendar process
     *
     * @param {*} user
     * @param {UpdateCalendarDTO} d
     * @returns
     * @memberof HolidayService
     */
    deleteCalendar(user: any, calendar_guid: string) {
        const filters = ['(CALENDAR_GUID=' + calendar_guid + ')'];
        return this.userinfoDbService.findEmployeeAssign(filters).pipe(
            mergeMap(res => {
                if (res.data.resource.length > 0) {
                    // will return user attach to this calendar profile
                    return of(res);
                } else {
                    // will show deleted calendar
                    let deletedData = this.deleteProcess(user, calendar_guid);
                    return deletedData;
                }
            }),
        );
    }

    /**
     * Process delete
     *
     * @param {*} user
     * @param {string} calendar_guid
     * @returns
     * @memberof HolidayService
     */
    public deleteProcess(user: any, calendar_guid: string) {
        const resource = new Resource(new Array);
        const data = new HolidayModel();

        // data.PROPERTIES_XML = this.xmlParserService.convertJsonToXML(d.data);
        data.DELETED_AT = new Date().toISOString();
        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;

        resource.resource.push(data);

        return this.holidayDbService.updateByModel(resource, [], ['(CALENDAR_GUID=' + calendar_guid + ')'], ['CALENDAR_GUID', 'CODE']);
    }

    /**
     * Create calendar profile and details
     *
     * @param {*} user
     * @param {CreateCalendarDTO} data
     * @returns
     * @memberof HolidayService
     */
    public createCalendarProfile(user: any, data: CreateCalendarDTO) {
        return this.create(user, data).pipe(
            mergeMap(res => {
                return this.createCalendarDetails([user, data, res.data.resource[0].CALENDAR_GUID, data.filter.year]);
            }));

    }

    /**
     * Setup new calendar profile using data from calendarific
     *
     * @param {*} user
     * @param {CreateCalendarDTO} data
     * @returns
     * @memberof HolidayService
     */
    create(user: any, data: CreateCalendarDTO) {
        const resource = new Resource(new Array);
        const modelData = new CreateHolidayModel();

        modelData.CALENDAR_GUID = v1();
        modelData.CODE = data.code;
        modelData.FILTER_CRITERIA = this.xmlParserService.convertJsonToXML(data.filter);
        // modelData.PROPERTIES_XML = this.xmlParserService.convertJsonToXML(data);
        modelData.CREATION_TS = new Date().toISOString();
        modelData.CREATION_USER_GUID = user.USER_GUID;
        modelData.UPDATE_TS = null;
        modelData.UPDATE_USER_GUID = null;

        resource.resource.push(modelData);

        return this.holidayDbService.createByModel(resource, [], [], []);
    }

    /**
     * Create details data for calendar profile
     *
     * @param {[any, CreateCalendarDTO, string, number]} [user, data, calendar_guid, year]
     * @returns
     * @memberof HolidayService
     */
    createCalendarDetails([user, data, calendar_guid, year]: [any, CreateCalendarDTO, string, number]) {
        const resource = new Resource(new Array);
        const modelData = new CreateHolidayDetailsModel();

        modelData.CALENDAR_DETAILS_GUID = v1();
        modelData.CALENDAR_GUID = calendar_guid;
        modelData.YEAR = year;
        modelData.PROPERTIES_XML = this.xmlParserService.convertJsonToXML(data);
        modelData.CREATION_TS = new Date().toISOString();
        modelData.CREATION_USER_GUID = user.USER_GUID;

        resource.resource.push(modelData);

        return this.calendarProfileDbService.createByModel(resource, ['CALENDAR_DETAILS_GUID', 'CALENDAR_GUID', 'YEAR'], [], []);
    }

}