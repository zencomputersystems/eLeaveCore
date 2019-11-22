import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { HolidayService } from '../../../src/admin/holiday/holiday.service';
import { CreateCalendarDTO } from '../../../src/admin/holiday/dto/create-calendar.dto';
import { UpdateCalendarDTO } from '../../../src/admin/holiday/dto/update-calendar.dto';
import { UpdateUserCalendarDTO } from '../../../src/admin/holiday/dto/update-usercalendar.dto';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { HolidayController } from '../../../src/admin/holiday/holiday.controller';
describe('HolidayController', () => {
  let pipe: HolidayController;
  beforeEach(async () => {
    const httpServiceStub = { get: arg1 => ({ subscribe: () => ({}) }) };
    const holidayServiceStub = {
      getCalendarProfileList: () => ({}),
      updateCalendar: (arg1, updateCalendarDTO2) => ({}),
      create: (arg1, createCalendarDTO2) => ({}),
      getHolidayList: dataId1 => ({}),
      updateToEmployee: (arg1, updateUserCalendarDTO2) => ({})
    };
    const createCalendarDTOStub = {};
    const updateCalendarDTOStub = {};
    const updateUserCalendarDTOStub = {};
    const commonFunctionServiceStub = {
      sendResErrorV3: (err1, res2) => ({}),
      runGetServiceV2: (arg1, res2) => ({}),
      runUpdateService: (arg1, res2) => ({}),
      runCreateService: (arg1, res2) => ({})
    };
    const module = await Test.createTestingModule({
      providers: [
        HolidayController,
        { provide: HttpService, useValue: httpServiceStub },
        { provide: HolidayService, useValue: holidayServiceStub },
        { provide: CreateCalendarDTO, useValue: createCalendarDTOStub },
        { provide: UpdateCalendarDTO, useValue: updateCalendarDTOStub },
        { provide: UpdateUserCalendarDTO, useValue: updateUserCalendarDTOStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    // pipe = Test.get(HolidayController);
    pipe = await module.get<HolidayController>(HolidayController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
