import { Test } from '@nestjs/testing';
import { HolidayDbService } from '../../../src/admin/holiday/db/holiday.db.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { CreateCalendarDTO } from '../../../src/admin/holiday/dto/create-calendar.dto';
import { AssignerDataService } from 'src/common/helper/assigner-data.service';
import { UpdateCalendarDTO } from '../../../src/admin/holiday/dto/update-calendar.dto';
import { UserInfoDbService } from '../../../src/admin/holiday/db/user-info.db.service';
import { UpdateUserCalendarDTO } from '../../../src/admin/holiday/dto/update-usercalendar.dto';
import { HolidayService } from '../../../src/admin/holiday/holiday.service';
import { CalendarProfileDbService } from '../../../src/admin/holiday/db/calendar-profile-db.service';
import { UserprofileDbService } from '../../../src/api/userprofile/db/userprofile.db.service';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from '../../../src/common/helper/query-parser.service';
describe('HolidayService', () => {
  let service: HolidayService;
  let dbService: HolidayDbService;
  let assignerDataService: AssignerDataService;
  beforeEach(async () => {
    const holidayDbServiceStub = {
      findAll: calendarId1 => ({ pipe: () => ({}) }),
      findAllProfile: () => ({ pipe: () => ({}) }),
      updateByModel: (resource1, array2, array3, array4) => ({}),
      createByModel: (resource1, array2, array3, array4) => ({})
    };
    const xMLParserServiceStub = {
      convertXMLToJson: arg1 => ({}),
      convertJsonToXML: arg1 => ({})
    };
    const createCalendarDTOStub = { code: {} };
    const assignerDataServiceStub = {
      assignArrayData: (arg1, calendarDTO2) => ({})
    };
    const updateCalendarDTOStub = { data: { code: {} }, calendar_guid: {} };
    const userInfoDbServiceStub = {
      updateByModel: (resource1, array2, array3, array4) => ({})
    };
    const updateUserCalendarDTOStub = {
      calendar_guid: {},
      user_guid: { length: {} }
    };
    const calendarProfileDbServiceStub = {}
    const httpServiceStub = {
      get: url1 => ({
        subscribe: () => ({})
      })
    };
    const module = await Test.createTestingModule({
      providers: [
        HolidayService,
        { provide: HolidayDbService, useValue: holidayDbServiceStub },
        { provide: XMLParserService, useValue: xMLParserServiceStub },
        { provide: CreateCalendarDTO, useValue: createCalendarDTOStub },
        { provide: AssignerDataService, useValue: assignerDataServiceStub },
        { provide: UpdateCalendarDTO, useValue: updateCalendarDTOStub },
        { provide: UserInfoDbService, useValue: userInfoDbServiceStub },
        { provide: UpdateUserCalendarDTO, useValue: updateUserCalendarDTOStub },
        { provide: CalendarProfileDbService, useValue: calendarProfileDbServiceStub },
        UserprofileDbService,
        {
          provide: HttpService,
          useValue: httpServiceStub
        },
        QueryParserService
      ]
    }).compile();
    // service = Test.get(HolidayService);
    service = await module.get<HolidayService>(HolidayService);
    dbService = await module.get<HolidayDbService>(HolidayDbService);
    assignerDataService = await module.get<AssignerDataService>(AssignerDataService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  // describe('getCalendarProfileList', () => {
  //   it('makes expected calls', () => {
  //     const holidayDbServiceStub: HolidayDbService = dbService;
  //     const assignerDataServiceStub: AssignerDataService = assignerDataService;
  //     spyOn(holidayDbServiceStub, 'findAllProfile').and.callThrough();
  //     spyOn(assignerDataServiceStub, 'assignArrayData').and.callThrough();
  //     service.getCalendarProfileList(null);
  //     expect(holidayDbServiceStub.findAllProfile).toHaveBeenCalled();
  //     // expect(assignerDataServiceStub.assignArrayData).toHaveBeenCalled();
  //   });
  // });
});
