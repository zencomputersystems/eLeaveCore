import { Controller, Post, Param, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { ForgotPasswordService } from './forgot-password.service';

/**
 * Controller forgot password
 *
 * @export
 * @class ForgotPasswordController
 */
@Controller('api/forgot-password')

export class ForgotPasswordController {
  /**
   * Forgot pasword service
   * @param {ForgotPasswordService} forgotPasswordService
   * @memberof ForgotPasswordController
   */
  constructor(
    private readonly forgotPasswordService: ForgotPasswordService
  ) { }

  /**
   * Send email forgot password
   *
   * @param {*} email
   * @param {*} req
   * @param {*} res
   * @memberof ForgotPasswordController
   */
  @Post(':email')
  @ApiOperation({ title: 'Send email forgot password' })
  @ApiImplicitParam({ name: 'email', description: 'Email user', required: true })
  create(@Param('email') email, @Req() req, @Res() res) {

    this.forgotPasswordService.forgotPasswordProcess(email).subscribe(
      data => {
        console.log(data);
        res.send(data);
      }, err => {
        console.log(err);
        res.send(err);
      }
    );

  }

}