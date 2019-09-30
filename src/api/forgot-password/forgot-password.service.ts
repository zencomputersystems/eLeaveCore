import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { EmailNodemailerService } from 'src/common/helper/email-nodemailer.service';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly emailNodemailerService: EmailNodemailerService
  ) { }

  public forgotPasswordProcess(email: string) {
    console.log(email);
    let results = this.emailNodemailerService.mailProcessForgotPassword(email);
    // return of(results + " send email to " + email);
    return of(results);
  }
}