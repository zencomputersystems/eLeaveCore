import { Controller, UseGuards, Get, Req, Res, Patch, Param, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { ProfileDefaultService } from './profile-default.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

/**
 * Profile default controller
 *
 * @export
 * @class ProfileDefaultController
 */
@Controller('/api/admin/profile-default')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ProfileDefaultController {

  /**
   *Creates an instance of ProfileDefaultController.
   * @param {ProfileDefaultService} profileDefaultService Profile default service
   * @param {CommonFunctionService} commonFunctionService Common function service
   * @memberof ProfileDefaultController
   */
  constructor(
    private readonly profileDefaultService: ProfileDefaultService,
    private readonly commonFunctionService: CommonFunctionService
  ) { }

  /**
   * Find default profile
   *
   * @param {*} req
   * @param {*} res
   * @memberof ProfileDefaultController
   */
  @Get()
  @ApiOperation({ title: 'Find default profile' })
  findDefaultProfile(@Req() req, @Res() res) {
    this.profileDefaultService.findOne([req.user.TENANT_GUID]).subscribe(
      data => { res.send(data); },
      err => { this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to fetch resource'); }
    );
  }

  /**
   * Update and create profile default
   *
   * @param {*} param
   * @param {*} req
   * @param {*} res
   * @memberof ProfileDefaultController
   */
  @Post(':profile/:id')
  @ApiOperation({ title: 'Update profile default' })
  @ApiImplicitParam({ name: 'id', description: 'Calendar guid', required: true })
  @ApiImplicitParam({ name: 'profile', description: 'Profile to set default', enum: ['calendar', 'working-hour', 'role'], required: true })
  updateProfileDefault(@Param() param, @Req() req, @Res() res) {
    this.profileDefaultService.updateProfile([req.user, param]).subscribe(
      data => { res.send(data.data.resource) },
      err => { res.send(err) }
    );
  }
}