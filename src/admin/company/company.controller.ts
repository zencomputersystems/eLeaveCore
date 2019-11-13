import { Controller, UseGuards, Get, Req, Res, Param, NotFoundException, Post, Body, Patch, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
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
	 *  function find all company
	 *
	 * @param {*} req
	 * @param {*} res
	 * @memberof CompanyController
	 */
	@Get()
	@ApiOperation({ title: 'Get company list' })
	findAll(@Req() req, @Res() res) {
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
	@ApiImplicitParam({ name: 'id', description: 'Get by company guid', required: true })
	findById(@Param('id') id, @Req() req, @Res() res) {

		if (id == null || id == '' || id == '{id}') { throw new NotFoundException('Id not found'); }

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

		if (name == null || name == '' || name == '{name}') { throw new NotFoundException('Name not found'); }

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
	@ApiImplicitParam({ name: 'id', description: 'Delete by company guid', required: true })
	deleteRoleProfile(@Param('id') id, @Req() req, @Res() res) {

		if (id == null || id == '' || id == '{id}') { throw new NotFoundException('Id not found'); }

		this.commonFunctionService.runUpdateService(this.companyService.deleteCompany(req.user, id), res);
	}

}
