import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { QueueNotificationDTO } from './dto/queue-notification.dto';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { NotificationService } from './notification.service';
describe('NotificationService', () => {
  let service: NotificationService;
  beforeEach(async () => {
    const httpServiceStub = { get: url1 => ({}) };
    const queueNotificationDTOStub = {
      employeeId: {},
      message: {},
      category: {},
      remarks: {}
    };
    const queryParserServiceStub = {
      generateDbQueryV2: (arg1, fields2, filters3, array4) => ({})
    };
    const module = await Test.createTestingModule({
      providers: [
        NotificationService,
        { provide: HttpService, useValue: httpServiceStub },
        { provide: QueueNotificationDTO, useValue: queueNotificationDTOStub },
        { provide: QueryParserService, useValue: queryParserServiceStub }
      ]
    }).compile();
    service = await module.get<NotificationService>(NotificationService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
