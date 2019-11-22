import { Test } from '@nestjs/testing';
import { RoleDTO } from '../../../src/admin/role/dto/role.dto';
import { RoleService } from '../../../src/admin/role/role.service';
import { UpdateRoleDTO } from '../../../src/admin/role/dto/update-role.dto';
import { UpdateUserRoleDTO } from '../../../src/admin/role/dto/update-userrole.dto';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { RoleController } from '../../../src/admin/role/role.controller';
describe('RoleController', () => {
  let pipe: RoleController;
  beforeEach(async () => {
    const roleDTOStub = {};
    const roleServiceStub = {
      findRoleProfile: () => ({}),
      create: (arg1, roleSetupDTO2) => ({}),
      updateRole: (arg1, updateRoleDTO2) => ({}),
      getRoleDetail: dataId1 => ({}),
      updateToEmployee: (arg1, updateUserRoleDTO2) => ({})
    };
    const updateRoleDTOStub = {};
    const updateUserRoleDTOStub = {};
    const commonFunctionServiceStub = {
      runGetServiceV2: (arg1, res2) => ({}),
      runCreateService: (arg1, res2) => ({}),
      runUpdateService: (arg1, res2) => ({})
    };

    const module = await Test.createTestingModule({
      providers: [
        RoleController,
        { provide: RoleDTO, useValue: roleDTOStub },
        { provide: RoleService, useValue: roleServiceStub },
        { provide: UpdateRoleDTO, useValue: updateRoleDTOStub },
        { provide: UpdateUserRoleDTO, useValue: updateUserRoleDTOStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    pipe = await module.get<RoleController>(RoleController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
