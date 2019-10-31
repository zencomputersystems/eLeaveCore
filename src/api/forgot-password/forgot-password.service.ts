import { Injectable, BadRequestException } from '@nestjs/common';
import { of } from 'rxjs';
import { EmailNodemailerService } from 'src/common/helper/email-nodemailer.service';

/**
 * Service forgot password
 *
 * @export
 * @class ForgotPasswordService
 */
@Injectable()
export class ForgotPasswordService {
  /**
   *Creates an instance of ForgotPasswordService.
   * @param {EmailNodemailerService} emailNodemailerService email node module service
   * @memberof ForgotPasswordService
   */
  constructor(
    private readonly emailNodemailerService: EmailNodemailerService
  ) { }

  /**
   * Forgot password function
   *
   * @param {string} email
   * @returns
   * @memberof ForgotPasswordService
   */
  public forgotPasswordProcess(email: string) {

    if (email != '{email}' && email.trim() != '') {
      let results = this.emailNodemailerService.mailProcessForgotPassword(email);
      return of(results);
    } else {
      throw new BadRequestException('Please set an email', 'No email specify');
    }

  }
}