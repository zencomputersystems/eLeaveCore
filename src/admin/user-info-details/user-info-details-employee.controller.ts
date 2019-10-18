import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserInfoDetailsService } from './user-info-details.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/userprofiles')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserInfoDetailsEmployeeController {
  constructor(
    private readonly userInfoDetailsService: UserInfoDetailsService
  ) { }
  // @Get('personal-info-details')
  // @ApiOperation({ title: 'Get personal detail' })
  // findOwn(@Req() req, @Res() res) {
  //   console.log('are u here dude?');
  //   console.log(req);
  //   // this.userInfoDetailsService.getUserXMLInfo(req.user.USER_GUID).subscribe(
  //   //   data => {
  //   //     this.userInfoDetailsService.filterResults(data, res, 'personalDetails');
  //   //   }, err => {
  //   //     res.send(err);
  //   //   }
  //   // );
  // }

}