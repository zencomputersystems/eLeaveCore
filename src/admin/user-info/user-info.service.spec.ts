import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { UserInfoService } from './user-info.service';
describe('UserInfoService', () => {
  let service: UserInfoService;
  beforeEach(async () => {
    const httpServiceStub = { get: url1 => ({}) };
    const queryParserServiceStub = {
      generateDbQuery: (arg1, fields2, filters3) => ({})
    };
    const createUserDTOStub = {};
    const updateUserDTOStub = { id: {} };
    const userDtoStub = {
      employmentDetail: {
        designationId: {},
        departmentId: {},
        branchId: {},
        companyId: {},
        joinDate: {},
        confirmationDate: {},
        resignationDate: {},
        reportingToId: {},
        employmentStatus: {}
      },
      employeeName: {}
    };
    const xMLParserServiceStub = { convertJsonToXML: xmldata1 => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        UserInfoService,
        { provide: HttpService, useValue: httpServiceStub },
        { provide: QueryParserService, useValue: queryParserServiceStub },
        { provide: CreateUserDTO, useValue: createUserDTOStub },
        { provide: UpdateUserDTO, useValue: updateUserDTOStub },
        { provide: UserDto, useValue: userDtoStub },
        { provide: XMLParserService, useValue: xMLParserServiceStub }
      ]
    }).compile();
    // service = Test.get(UserInfoService);
    service = await module.get<UserInfoService>(UserInfoService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
