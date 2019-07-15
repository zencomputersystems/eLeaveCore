import { Test } from '@nestjs/testing';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { NotificationService } from './notification.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { UserService } from '../user/user.service';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { NotificationController } from './notification.controller';
describe('NotificationController', () => {
  let pipe: NotificationController;
  beforeEach(async () => {
    const commonFunctionServiceStub = {};
    const notificationServiceStub = {
      findAll: arg1 => ({ pipe: () => ({ subscribe: () => ({}) }) })
    };
    const xMLParserServiceStub = { convertXMLToJson: arg1 => ({}) };
    const userServiceStub = {};
    const userInfoDbServiceStub = {
      findByFilterV2: (array1, userFilter2) => ({
        pipe: () => ({ subscribe: () => ({}) })
      })
    };
    const module = await Test.createTestingModule({
      providers: [
        NotificationController,
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: XMLParserService, useValue: xMLParserServiceStub },
        { provide: UserService, useValue: userServiceStub },
        { provide: UserInfoDbService, useValue: userInfoDbServiceStub }
      ]
    }).compile();
    // pipe = Test.get(NotificationController);
    pipe = await module.get<NotificationController>(NotificationController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
