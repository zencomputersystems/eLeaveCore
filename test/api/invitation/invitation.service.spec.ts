import { Test } from '@nestjs/testing';
import { UserService } from 'src/admin/user/user.service';
import { UserModel } from 'src/admin/user/model/user.model';
import { ActivatedResultDTO } from '../../../src/api/invitation/dto/activated-result.dto';
import { InvitationDbService } from '../../../src/api/invitation/db/invitation.db.service';
import { InvitationService } from '../../../src/api/invitation/invitation.service';
describe('InvitationService', () => {
  let service: InvitationService;
  beforeEach(async () => {
    const userServiceStub = {
      findByFilterV2: (array1, filters2) => ({ pipe: () => ({}) }),
      updateByModel: (resource1, array2, array3, array4) => ({})
    };
    const userModelStub = {};
    const activatedResultDTOStub = {
      authMethod: {},
      userId: {},
      invitationId: {}
    };
    const invitationDbServiceStub = {
      findOne: filters1 => ({ pipe: () => ({}) }),
      update: (invitationId1, number2) => ({ pipe: () => ({}) })
    };
    const module = await Test.createTestingModule({
      providers: [
        InvitationService,
        { provide: UserService, useValue: userServiceStub },
        { provide: UserModel, useValue: userModelStub },
        { provide: ActivatedResultDTO, useValue: activatedResultDTOStub },
        { provide: InvitationDbService, useValue: invitationDbServiceStub }
      ]
    }).compile();
    // service = Test.get(InvitationService);
    service = await module.get<InvitationService>(InvitationService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
