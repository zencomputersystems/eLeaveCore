import { Controller, UseGuards, Get, Req, Res, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

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
		this.companyService.findAll(req.user.TENANT_GUID).subscribe(
			data => { res.send(data); },
			err => { this.commonFunctionService.sendResErrorV3(err, res); }
		)
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
	findById(@Param('id') id,@Req() req, @Res() res) {
		this.companyService.findById(req.user.TENANT_GUID,id).subscribe(
			data => { res.send(data); },
			err => { this.commonFunctionService.sendResErrorV3(err, res); }
		)
	}

}
