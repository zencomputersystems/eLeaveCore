import { Controller, UseGuards, Body, Res, Post, Req, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { ProfilePictureService } from './profile-picture.service';
import { ProfilePictureDto } from './dto/profile-picture.dto';
import { linkStorageEleave } from '../../constant/commonUsed';

/**
 * Profile picture controller
 *
 * @export
 * @class ProfilePictureController
 */
@Controller('api/profile-picture')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ProfilePictureController {

  /**
   *Creates an instance of ProfilePictureController.
   * @param {ProfilePictureService} profilePictureService Profile picture service
   * @memberof ProfilePictureController
   */
  constructor(private readonly profilePictureService: ProfilePictureService) { }

  /**
   * Save profile picture
   *
   * @param {ProfilePictureDto} profilePictureDto
   * @param {*} req
   * @param {*} res
   * @memberof ProfilePictureController
   */
  @Post()
  @ApiOperation({ title: 'Upoad profile picture' })
  storeProfilePicture(@Body() profilePictureDto: ProfilePictureDto, @Res() res) {
    this.profilePictureService.create([profilePictureDto]).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.send(err);
      }
    );
  }

  /**
   * Get profile picture filename
   *
   * @param {*} param
   * @param {*} req
   * @param {*} res
   * @memberof ProfilePictureController
   */
  @Get(':type')
  @ApiOperation({ title: 'Get profile picture' })
  @ApiImplicitParam({ name: 'type', description: 'all or personal', required: false })
  getProfilePicture(@Param() param, @Req() req, @Res() res) {
    this.profilePictureService.getProfilePicture([req.user, param.type]).subscribe(
      data => {
        let dataTemp = {};

        dataTemp['link'] = linkStorageEleave;
        dataTemp['details'] = data;

        res.send(dataTemp);
      }, err => {
        res.send(err);
      }
    );
  }

}