import { Controller, UseGuards, Post, Param, Req, Res } from '@nestjs/common';
import { CommonFunctionService } from '../../common/helper/common-function.services';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { ForgotPasswordService } from './forgot-password.service';

@Controller('api/forgot-password')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ForgotPasswordController {
  constructor(
    private readonly forgotPasswordService: ForgotPasswordService
  ) { }

  @Post(':email')
  @ApiOperation({ title: 'Send email forgot password' })
  @ApiImplicitQuery({ name: 'email', description: 'Email user', required: true })
  create(@Param('email') email, @Req() req, @Res() res) {

    let dataEmail = null;
    let dataEmailParam = req.query.email;
    if (dataEmailParam == null) {
      dataEmail = email;
    } else {
      dataEmail = dataEmailParam;
    }
    if (dataEmail == null) {
      res.status(400);
      res.send('id not found');
    }
    email = dataEmail;

    this.forgotPasswordService.forgotPasswordProcess(email).subscribe(
      data => {
        console.log(data);
        res.send(data);
      }, err => {
        console.log(err);
        res.send(err);
      }
    );
    // this.commonFunctionService.runCreateService(this.workingHoursService.create(req.user, workingHoursSetupDTO), res);
  }

}