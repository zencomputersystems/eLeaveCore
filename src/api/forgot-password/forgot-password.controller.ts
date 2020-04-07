import { Controller, Post, Param, Req, Res, Body, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiImplicitParam, ApiBearerAuth } from '@nestjs/swagger';
import { ForgotPasswordService } from './forgot-password.service';
import { UserService } from '../../admin/user/user.service';
import { ProfileDefaultDbService } from 'src/admin/profile-default/profile-default.db.service';
import { AuthGuard } from '@nestjs/passport';
import { Resource } from 'src/common/model/resource.model';
import { UserModel } from 'src/admin/user/model/user.model';
import { ChangePasswordDto } from './dto/change-password.dto';

/**
 * Controller forgot password
 *
 * @export
 * @class ForgotPasswordController
 */
@Controller('api')

export class ForgotPasswordController {
  /**
   * Forgot pasword service
   * @param {ForgotPasswordService} forgotPasswordService
   * @memberof ForgotPasswordController
   */
  constructor(
    private readonly forgotPasswordService: ForgotPasswordService,
    private readonly userService: UserService,
    private readonly profileDefaultDbService: ProfileDefaultDbService
  ) { }

  // /**
  //  * Send email forgot password
  //  *
  //  * @param {*} email
  //  * @param {*} req
  //  * @param {*} res
  //  * @memberof ForgotPasswordController
  //  */
  // @Post('forgot-password/:email')
  // @ApiOperation({ title: 'Send email forgot password' })
  // @ApiImplicitParam({ name: 'email', description: 'Email user', required: true })
  // create(@Param('email') email, @Req() req, @Res() res) {

  //   this.forgotPasswordService.forgotPasswordProcess(email).subscribe(
  //     data => {
  //       console.log(data);
  //       res.send(data);
  //     }, err => {
  //       console.log(err);
  //       res.send(err);
  //     }
  //   );

  // }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('change-password/:process')
  @ApiOperation({ title: 'Send email forgot password' })
  @ApiImplicitParam({ name: 'process', description: 'Check or change', enum: ['verify', 'execute'], required: true })
  verifyPassword(@Param('process') process, @Body() data: ChangePasswordDto, @Res() res) {
    if (process == 'execute') {
      this.executeChangePassword([data, res]);
    } else {
      this.verifyPasswordProcess([data, res]);
    }


  }

  private verifyPasswordProcess([data, res]) {
    this.userService.findByFilterV2([], [`(LOGIN_ID=${data.loginId})`, `(PASSWORD=${data.password})`]).subscribe(
      data => {
        let status = data.length > 0 ? true : false;
        const arrStatus = {};
        arrStatus['status'] = status;
        res.send(arrStatus);

      }, err => {
        res.send(err);
      }
    )
  }

  private executeChangePassword([data, res]) {
    let resource = new Resource(new Array);
    let model = new UserModel();

    // model.USER_GUID = req.user.USER_GUID;
    model.LOGIN_ID = data.loginId;
    model.PASSWORD = data.password;

    resource.resource.push(model);
    this.userService.updateByModel(resource, [], [`(LOGIN_ID=${data.loginId})`], []).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.send(err);
      }
    )
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('login-type')
  @ApiOperation({ title: 'Get login type' })
  getLeaveType(@Req() req, @Res() res) {
    this.profileDefaultDbService.findByFilterV2(['LOGIN_TYPE'], [`(TENANT_GUID=${req.user.TENANT_GUID})`]).subscribe(
      data => {
        res.send(data);
      }, err => {
        res.send(err);
      }
    )
  }

}