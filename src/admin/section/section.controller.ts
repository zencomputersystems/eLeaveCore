import { Controller, Post, Body, Req, Res, Patch, Get, Param, UseGuards } from '@nestjs/common';
import { SectionService } from './section.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

/**
 * Controller for section
 *
 * @export
 * @class SectionController
 */
@Controller('api/admin/section')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class SectionController {

  constructor(private readonly sectionService: SectionService,
    private readonly commonFunctionService: CommonFunctionService) { }

  /**
   * Create new section
   *
   * @param {CreateSectionDto} createSectionDTO
   * @param {*} req
   * @param {*} res
   * @memberof SectionController
   */
  @Post()
  create(@Body() createSectionDTO: CreateSectionDto, @Req() req, @Res() res) {

    this.sectionService.create(req.user, createSectionDTO.name)
      .subscribe(
        data => { if (data.status == 200) { res.send(data.data); } },
        err => { this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to create resource'); }
      )
  }

  /**
   * Update existing section
   *
   * @param {UpdateSectionDto} updateSectionDTO
   * @param {*} req
   * @param {*} res
   * @memberof SectionController
   */
  @Patch()
  updateSection(@Body() updateSectionDTO: UpdateSectionDto, @Req() req, @Res() res) {
    this.sectionService.update(req.user, updateSectionDTO)
      .subscribe(
        data => { if (data.status == 200) { res.send(data.data); } },
        err => { this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to update resource'); }
      )
  }

  /**
   * Get all section
   *
   * @param {*} req
   * @param {*} res
   * @memberof SectionController
   */
  @Get()
  findAllSection(@Req() req, @Res() res) {
    this.sectionService.findAll(req.user.TENANT_GUID).subscribe(
      data => {
        res.send(data.data.resource);
      },
      err => {
        this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to fetch resource');
      }
    );

  }

  /**
   * get one section by id
   *
   * @param {*} id
   * @param {*} req
   * @param {*} res
   * @memberof SectionController
   */
  @Get(':id')
  findOne(@Param('id') id, @Req() req, @Res() res) {
    this.sectionService.findById(req.user.TENANT_GUID, id).subscribe(
      data => {
        res.send(data.data.resource[0]);
      },
      err => {
        this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to fetch resource');
      }
    );
  }

}
