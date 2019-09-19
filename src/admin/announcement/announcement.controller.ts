import { Controller, UseGuards, Get, Req, Res, Patch, Body, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AnnouncementService } from './announcement.service';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

@Controller('/api/admin/announcement')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class AnnouncementController {

  constructor(
    private readonly announcementService: AnnouncementService,
    private readonly commonFunctionService: CommonFunctionService) { }

  @Get()
  @ApiOperation({ title: 'get announcement list' })
  findAll(@Res() res) {
    this.commonFunctionService.runGetService(this.announcementService.findAll(), res);
  }

  @Patch()
  @ApiOperation({ title: 'Update announcement data' })
  updateAnnouncement(@Body() d: UpdateAnnouncementDto, @Req() req, @Res() res) {
    this.commonFunctionService.runUpdateService(this.announcementService.updateAnnouncement(d, req.user), res);
  }

  @Post()
  @ApiOperation({ title: 'Create new announcement' })
  create(@Body() d: CreateAnnouncementDto, @Req() req, @Res() res) {
    this.commonFunctionService.runCreateService(this.announcementService.create(d, req.user), res);
  }

}