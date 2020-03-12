import { Controller, UseGuards, Body, Res, Post, Req, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { ProfilePictureService } from './profile-picture.service';
import { ProfilePictureDto } from './dto/profile-picture.dto';
import { linkStorageEleave } from '../../constant/commonUsed';

@Controller('api/profile-picture')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ProfilePictureController {

  constructor(private readonly profilePictureService: ProfilePictureService) { }

  @Post()
  @ApiOperation({ title: 'Get company list' })
  storeProfilePicture(@Body() profilePictureDto: ProfilePictureDto, @Req() req, @Res() res) {
    this.profilePictureService.create([req.user, profilePictureDto]).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.send(err);
      }
    );
  }

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