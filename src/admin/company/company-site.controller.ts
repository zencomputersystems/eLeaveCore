import { Controller, UseGuards, Get, Req, Res, Param, NotFoundException, Post, Body, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { UpdateCompanySiteDTO } from './dto/update-company-site.dto';
import { CompanySiteService } from './company-site.service';
import { CreateCompanySiteDTO } from './dto/create-company-site.dto';
import { verifyParam } from 'src/common/helper/basic-functions';

/**
 * controller for company site
 *
 * @export
 * @class CompanySiteController
 */
@Controller('api/company-site')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CompanySiteController {

	/**
     *Creates an instance of CompanySiteController.
     * @param {CompanySiteService} companySiteService company site service
     * @param {CommonFunctionService} commonFunctionService common function service
     * @memberof CompanySiteController
     */
    constructor(private readonly companySiteService: CompanySiteService, private readonly commonFunctionService: CommonFunctionService) { }

	/**
     * find all company site
     *
     * @param {*} req
     * @param {*} res
     * @memberof CompanySiteController
     */
    @Get()
    @ApiOperation({ title: 'Get company-site list' })
    findAll(@Req() req, @Res() res) {
        // this.companySiteService.findAll(req.user.TENANT_GUID).subscribe(
        //     data => { res.send(data); },
        //     err => { this.commonFunctionService.sendResErrorV3(err, res); }
        // )
        this.commonFunctionService.runGetServiceV2(this.companySiteService.findAll(req.user.TENANT_GUID), res);
    }


	/**
     * find by company guid
     *
     * @param {*} id
     * @param {*} req
     * @param {*} res
     * @memberof CompanySiteController
     */
    @Get('/:id')
    @ApiOperation({ title: 'Get company-site by company' })
    @ApiImplicitParam({ name: 'id', description: 'Filter by COMPANY_GUID', required: true })
    findById(@Param('id') id, @Req() req, @Res() res) {
        // console.log(id);
        // id = verifyParam([req, 'id', id]);
        // console.log(id);
        // id = this.commonFunctionService.findIdParam(req, res, id);
        this.companySiteService.findById(req.user.TENANT_GUID, id).subscribe(
            data => { res.send(data.data.resource); },
            err => { this.commonFunctionService.sendResErrorV3(err, res); }
        );
    }

	/**
     * create new company site
     *
     * @param {CreateCompanySiteDTO} data
     * @param {*} req
     * @param {*} res
     * @memberof CompanySiteController
     */
    @Post()
    @ApiOperation({ title: 'Create company-site' })
    createCompany(@Body() data: CreateCompanySiteDTO, @Req() req, @Res() res) {
        // this.companySiteService.create(req.user, data).subscribe(
        //     data => { if (data.status == 200) { res.send(data.data); } },
        //     err => { this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to create resource'); }
        // );
        this.commonFunctionService.runCreateService(this.companySiteService.create(req.user, data), res);
    }

	/**
     * update company site details
     *
     * @param {UpdateCompanySiteDTO} updateCompanySiteDTO
     * @param {*} req
     * @param {*} res
     * @memberof CompanySiteController
     */
    @Patch()
    @ApiOperation({ title: 'Update company-site' })
    updateCompany(@Body() updateCompanySiteDTO: UpdateCompanySiteDTO, @Req() req, @Res() res) {
        // this.companySiteService.update(req.user, updateCompanySiteDTO)
        //     .subscribe(
        //         data => { if (data.status == 200) { res.send(data.data); } },
        //         err => { this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to update resource'); }
        //     )
        this.commonFunctionService.runUpdateService(this.companySiteService.update(req.user, updateCompanySiteDTO), res);
    }

}
