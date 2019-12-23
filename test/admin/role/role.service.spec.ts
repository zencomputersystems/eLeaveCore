import { Test } from '@nestjs/testing';
import { RoleDTO } from '../../../src/admin/role/dto/role.dto';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { RoleDbService } from '../../../src/admin/role/db/role.db.service';
import { AssignerDataService } from 'src/common/helper/assigner-data.service';
import { UpdateRoleDTO } from '../../../src/admin/role/dto/update-role.dto';
import { UpdateUserRoleDTO } from '../../../src/admin/role/dto/update-userrole.dto';
import { UserInfoDbService } from '../../../src/admin/holiday/db/user-info.db.service';
import { RoleService } from '../../../src/admin/role/role.service';
describe('RoleService', () => {
  let service: RoleService;
  let roleDbService: RoleDbService;
  let assignerDataService: AssignerDataService;
  beforeEach(async () => {
    const roleDTOStub = { code: {}, description: {} };
    const xMLParserServiceStub = {
      convertXMLToJson: arg1 => ({}),
      convertJsonToXML: data1 => ({})
    };
    const roleDbServiceStub = {
      findAllRoleProfile: () => ({ pipe: () => ({}) }),
      findAll: roleId1 => ({ pipe: () => ({}) }),
      createByModel: (resource1, array2, array3, array4) => ({}),
      updateByModel: (resource1, array2, array3, array4) => ({})
    };
    const assignerDataServiceStub = {
      assignArrayData: (arg1, roleListDTO2) => ({})
    };
    const updateRoleDTOStub = {
      data: { code: {}, description: {} },
      role_guid: {}
    };
    const updateUserRoleDTOStub = { role_guid: {}, user_guid: { length: {} } };
    const userInfoDbServiceStub = {
      updateByModel: (resource1, array2, array3, array4) => ({})
    };
    const module = await Test.createTestingModule({
      providers: [
        RoleService,
        { provide: RoleDTO, useValue: roleDTOStub },
        { provide: XMLParserService, useValue: xMLParserServiceStub },
        { provide: RoleDbService, useValue: roleDbServiceStub },
        { provide: AssignerDataService, useValue: assignerDataServiceStub },
        { provide: UpdateRoleDTO, useValue: updateRoleDTOStub },
        { provide: UpdateUserRoleDTO, useValue: updateUserRoleDTOStub },
        { provide: UserInfoDbService, useValue: userInfoDbServiceStub }
      ]
    }).compile();
    // service = Test.get(RoleService);
    service = await module.get<RoleService>(RoleService);
    roleDbService = await module.get<RoleDbService>(RoleDbService);
    assignerDataService = await module.get<AssignerDataService>(AssignerDataService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  // describe('findRoleProfile', () => {
  //   it('makes expected calls', () => {
  //     const roleDbServiceStub: RoleDbService = roleDbService; // Test.get(RoleDbService);
  //     const assignerDataServiceStub: AssignerDataService = assignerDataService // Test.get(AssignerDataService);
  //     spyOn(roleDbServiceStub, 'findAllRoleProfile').and.callThrough();
  //     spyOn(assignerDataServiceStub, 'assignArrayData').and.callThrough();
  //     service.findRoleProfile(null);
  //     expect(roleDbServiceStub.findAllRoleProfile).toHaveBeenCalled();
  //     // expect(assignerDataServiceStub.assignArrayData).toHaveBeenCalled();
  //   });
  // });
});
