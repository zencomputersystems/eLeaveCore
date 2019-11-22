import { Test } from '@nestjs/testing';
import { InvitationService } from '../../../src/api/invitation/invitation.service';
import { ActivatedByPassword } from '../../../src/api/invitation/dto/activated-by-password.dto';
import { InvitationInviteService } from '../../../src/api/invitation/invitation-invite.service';
import { InvitationController } from '../../../src/api/invitation/invitation.controller';
describe('InvitationController', () => {
  let pipe: InvitationController;
  beforeEach(async () => {
    const invitationServiceStub = {
      acceptInvitation: token1 => ({ subscribe: () => ({}) }),
      setNewUserPassword: (arg1, arg2) => ({ subscribe: () => ({}) })
    };
    const activatedByPasswordStub = { id: {}, password: {} };
    const invitationInviteServiceStub = {
      invite: (inviteListDto1, arg2) => ({ subscribe: () => ({}) })
    };
    const module = await Test.createTestingModule({
      providers: [
        InvitationController,
        { provide: InvitationService, useValue: invitationServiceStub },
        { provide: ActivatedByPassword, useValue: activatedByPasswordStub },
        {
          provide: InvitationInviteService,
          useValue: invitationInviteServiceStub
        }
      ]
    }).compile();
    // pipe = Test.get(InvitationController);
    pipe = await module.get<InvitationController>(InvitationController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
