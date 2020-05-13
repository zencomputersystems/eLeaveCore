import { Test } from '@nestjs/testing';
import { MailerService } from '@nest-modules/mailer';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { UserService } from 'src/admin/user/user.service';
import { InvitationDbService } from '../../../src/api/invitation/db/invitation.db.service';
import { EmailNodemailerService } from 'src/common/helper/email-nodemailer.service';
import { InvitationInviteService } from '../../../src/api/invitation/invitation-invite.service';
import { AuthDbService } from 'src/auth/auth.db.service';
describe('InvitationInviteService', () => {
  let service: InvitationInviteService;
  beforeEach(async () => {
    const mailerServiceStub = { sendMail: object1 => ({}) };
    const httpServiceStub = {};
    const queryParserServiceStub = {};
    const userServiceStub = {
      findByFilterV2: (array1, userFilter2) => ({ pipe: () => ({}) })
    };
    const invitationDbServiceStub = {
      findAll: tenantId1 => ({ pipe: () => ({}) }),
      createByModel: (inviteResourceArray1, array2, array3, array4) => ({
        pipe: () => ({})
      })
    };
    const emailNodemailerServiceStub = {
      mailProcess: (email1, token2) => ({})
    };
    const module = await Test.createTestingModule({
      providers: [
        InvitationInviteService,
        { provide: MailerService, useValue: mailerServiceStub },
        { provide: HttpService, useValue: httpServiceStub },
        { provide: QueryParserService, useValue: queryParserServiceStub },
        { provide: UserService, useValue: userServiceStub },
        { provide: InvitationDbService, useValue: invitationDbServiceStub },
        {
          provide: EmailNodemailerService,
          useValue: emailNodemailerServiceStub
        },
        AuthDbService
      ]
    }).compile();
    // service = Test.get(InvitationInviteService);
    service = await module.get<InvitationInviteService>(InvitationInviteService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
