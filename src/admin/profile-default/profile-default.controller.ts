import { Controller, UseGuards, Get, Req, Res, Patch, Param, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { ProfileDefaultService } from './profile-default.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

@Controller('/api/admin/profile-default')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ProfileDefaultController {

  constructor(
    private readonly profileDefaultService: ProfileDefaultService,
    private readonly commonFunctionService: CommonFunctionService
  ) { }

  @Get()
  @ApiOperation({ title: 'Find default profile' })
  findAllLeavetype(@Req() req, @Res() res) {
    this.profileDefaultService.findOne([req.user.TENANT_GUID]).subscribe(
      data => { res.send(data); },
      err => { this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to fetch resource'); }
    );
  }

  @Post(':id')
  @ApiOperation({ title: 'Update profile default' })
  @ApiImplicitParam({ name: 'id', description: 'calendar guid', required: true })
  updateProfileDefault(@Param() param, @Req() req, @Res() res) {
    this.profileDefaultService.updateProfile([req.user, param.id]).subscribe(
      data => { res.send(data.data.resource) },
      err => { res.send(err) }
    );
  }
}