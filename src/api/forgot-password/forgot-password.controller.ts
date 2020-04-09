import { Controller, Post, Param, Req, Res, Body, Get, UseGuards, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ApiOperation, ApiImplicitParam, ApiBearerAuth } from '@nestjs/swagger';
import { ForgotPasswordService } from './forgot-password.service';
import { UserService } from '../../admin/user/user.service';
import { ProfileDefaultDbService } from 'src/admin/profile-default/profile-default.db.service';
import { AuthGuard } from '@nestjs/passport';
import { Resource } from 'src/common/model/resource.model';
import { UserModel } from 'src/admin/user/model/user.model';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ExecuteChangePasswordDto } from './dto/execute-change-password.dto';
import { map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

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
  @Post('change-password/verify')
  @ApiOperation({ title: 'Send email forgot password' })
  verifyPassword(@Body() data: ChangePasswordDto, @Res() res) {
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

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('change-password/execute')
  @ApiOperation({ title: 'Send email forgot password' })
  changePassword(@Body() data: ExecuteChangePasswordDto, @Res() res) {

    this.userService.findByFilterV2([], [`(LOGIN_ID=${data.loginId})`, `(PASSWORD=${data.oldPassword})`]).pipe(
      mergeMap(res => {
        let status = res.length > 0 ? true : false;
        if (status) {
          let resource = new Resource(new Array);
          let model = new UserModel();

          // model.USER_GUID = req.user.USER_GUID;
          model.LOGIN_ID = data.loginId;
          model.PASSWORD = data.password;

          resource.resource.push(model);
          return this.userService.updateByModel(resource, [], [`(LOGIN_ID=${data.loginId})`], [])
        } else {
          throw new ForbiddenException();
        }
      })).subscribe(
        data => {
          if (data.data.resource.length > 0)
            res.send({ "message": "You've successfully changed your password" });
          else
            throw new ForbiddenException();
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