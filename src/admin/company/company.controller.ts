import { Controller, UseGuards, Get, Req, Res, Param, NotFoundException, Post, Body, Patch, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { UpdateCompanyDTO } from './dto/update-company.dto';

/**
 * Controller for company
 *
 * @export
 * @class CompanyController
 */
@Controller('api/company')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CompanyController {

	/**
	 *Creates an instance of CompanyController.
	 * @param {CompanyService} companyService Company service function
	 * @param {CommonFunctionService} commonFunctionService Common function refactor
	 * @memberof CompanyController
	 */
	constructor(private readonly companyService: CompanyService, private readonly commonFunctionService: CommonFunctionService) { }

	/**
	 *  function find alll company
	 *
	 * @param {*} req
	 * @param {*} res
	 * @memberof CompanyController
	 */
	@Get()
	@ApiOperation({ title: 'Get company list' })
	findAll(@Req() req, @Res() res) {
		// this.companyService.findAll(req.user.TENANT_GUID).subscribe(
		// 	data => { res.send(data); },
		// 	err => { this.commonFunctionService.sendResErrorV3(err, res); }
		// )
		this.commonFunctionService.runGetServiceV2(this.companyService.findAll(req.user.TENANT_GUID), res);
	}

	/**
	 * find by id
	 *
	 * @param {*} id
	 * @param {*} req
	 * @param {*} res
	 * @memberof CompanyController
	 */
	@Get('/:id')
	@ApiOperation({ title: 'Get one company' })
	@ApiImplicitQuery({ name: 'id', description: 'Get by company guid', required: true })
	findById(@Param('id') id, @Req() req, @Res() res) {
		id = this.commonFunctionService.findIdParam(req, res, id);

		if (id == null || id == '' || id == '{id}') {
			// res.send('id not found') 
			throw new NotFoundException('Id not found');
		}

		this.companyService.findById(req.user.TENANT_GUID, id).subscribe(
			data => { res.send(data); },
			err => {
				res.status(500);
				res.send(err);
			}
		);
	}

	/**
	 * create company
	 *
	 * @param {string} name
	 * @param {*} req
	 * @param {*} res
	 * @memberof CompanyController
	 */
	@Post('/:name')
	@ApiOperation({ title: 'Create company' })
	createCompany(@Param('name') name: string, @Req() req, @Res() res) {
		// this.companyService.create(req.user, name).subscribe(
		// 	data => { if (data.status == 200) { res.send(data.data); } },
		// 	err => { this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to create resource'); }
		// );
		this.commonFunctionService.runCreateService(this.companyService.create(req.user, name), res);
	}

	/**
	 * update company
	 *
	 * @param {UpdateCompanyDTO} updateCompanyDTO
	 * @param {*} req
	 * @param {*} res
	 * @memberof CompanyController
	 */
	@Patch()
	@ApiOperation({ title: 'Update company' })
	updateCompany(@Body() updateCompanyDTO: UpdateCompanyDTO, @Req() req, @Res() res) {
		// this.companyService.update(req.user, updateCompanyDTO)
		// 	.subscribe(
		// 		data => { if (data.status == 200) { res.send(data.data); } },
		// 		err => { this.commonFunctionService.sendResErrorV2(res, 400, 'Fail to update resource'); }
		// 	)
		this.commonFunctionService.runUpdateService(this.companyService.update(req.user, updateCompanyDTO), res);
	}

	/**
	 * Delete company
	 *
	 * @param {*} id
	 * @param {*} req
	 * @param {*} res
	 * @memberof CompanyController
	 */
	@Delete('/:id')
	@ApiOperation({ title: 'Delete company' })
	@ApiImplicitQuery({ name: 'id', description: 'Delete by company guid', required: true })
	deleteRoleProfile(@Param('id') id, @Req() req, @Res() res) {
		id = this.commonFunctionService.findIdParam(req, res, id);
		this.commonFunctionService.runUpdateService(this.companyService.deleteCompany(req.user, id), res);
	}

}
