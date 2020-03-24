import { Controller, UseGuards, Get, Req, Res, Patch, Body, Post, Delete, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { AnnouncementService } from './announcement.service';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { split } from 'lodash';
import { map } from 'rxjs/operators';

/**
 * Controller for announcement
 *
 * @export
 * @class AnnouncementController
 */
@Controller('/api/admin/announcement')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class AnnouncementController {

  /**
   *Creates an instance of AnnouncementController.
   * @param {AnnouncementService} announcementService
   * @param {CommonFunctionService} commonFunctionService
   * @memberof AnnouncementController
   */
  constructor(
    private readonly announcementService: AnnouncementService,
    private readonly commonFunctionService: CommonFunctionService) { }

  /**
   * Find all announcement
   *
   * @param {*} res
   * @memberof AnnouncementController
   */
  @Get()
  @ApiOperation({ title: 'get announcement list' })
  findAll(@Req() req, @Res() res) {
    let method = this.announcementService.findAll(req.user).pipe(
      map(res => {
        res.data.resource.forEach(element => {
          element.ATTACHMENT = split(element.ATTACHMENT, ',');
        });
        return res;
      })
    )
    this.commonFunctionService.getResults([method, res, 'Fail to fetch resource']);
  }

  /**
   * Update announcement
   *
   * @param {UpdateAnnouncementDto} d
   * @param {*} req
   * @param {*} res
   * @memberof AnnouncementController
   */
  @Patch()
  @ApiOperation({ title: 'Update announcement data' })
  updateAnnouncement(@Body() d: UpdateAnnouncementDto, @Req() req, @Res() res) {
    this.commonFunctionService.runUpdateService(this.announcementService.updateAnnouncement(d, req.user), res);
  }

  /**
   * Delete announcement
   *
   * @param {string} id
   * @param {*} req
   * @param {*} res
   * @memberof AnnouncementController
   */
  @Delete(':id')
  @ApiOperation({ title: 'Delete announcement data' })
  @ApiImplicitParam({ name: 'id', description: 'Delete by ANNOUNCEMENT_GUID', required: true })
  deleteAnnouncement(@Param('id') id: string, @Req() req, @Res() res) {
    this.commonFunctionService.runUpdateService(this.announcementService.deleteAnnouncement(id, req.user), res);
  }

  /**
   * Create announcement
   *
   * @param {CreateAnnouncementDto} d
   * @param {*} req
   * @param {*} res
   * @memberof AnnouncementController
   */
  @Post()
  @ApiOperation({ title: 'Create new announcement' })
  create(@Body() d: CreateAnnouncementDto, @Req() req, @Res() res) {
    this.commonFunctionService.runCreateService(this.announcementService.create(d, req.user), res);
  }

}