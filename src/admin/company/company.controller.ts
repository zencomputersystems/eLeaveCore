import { Controller, UseGuards, Get, Req, Res, Param, NotFoundException, Post, Body, Patch, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { UpdateCompanyDTO } from './dto/update-company.dto';
import { map, mergeMap } from 'rxjs/operators';
import { GeneralLeavePolicyService } from '../general-leave-policy/general-leave-policy.service';
import { forkJoin, of } from 'rxjs';
import * as moment from 'moment';
import { pad } from 'lodash';
/** XMLparser from zen library  */
var { convertXMLToJson } = require('@zencloudservices/xmlparser');

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
	constructor(
		private readonly companyService: CompanyService,
		private readonly commonFunctionService: CommonFunctionService,
		private readonly generalLeavePolicyService: GeneralLeavePolicyService) { }

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
		let method = this.companyService.findAll([req.user.TENANT_GUID, 'list']);
		this.commonFunctionService.runGetServiceV2(method, res);
	}

	/**
	 * Company year end
	 *
	 * @param {*} req
	 * @param {*} res
	 * @memberof CompanyController
	 */
	@Get('year-end')
	@ApiOperation({ title: 'Get company list with year end verification' })
	findCompyearEnd(@Req() req, @Res() res) {
		let method = this.companyService.findAll([req.user.TENANT_GUID, 'year-end']).pipe(
			mergeMap(res => {
				let companyPolicy = this.generalLeavePolicyService.findByFilterV2([], [`(TENANT_GUID=${req.user.TENANT_GUID})`]);

				return forkJoin(of(res), companyPolicy);
			}), map(res => {
				const companyData = res[0];
				const companyPolicy = res[1];
				companyData.forEach(company => {
					const companyPolicyTemp = companyPolicy.find(x => x.TENANT_COMPANY_GUID === company.TENANT_COMPANY_GUID);

					company['YEAR_END_LIST'] = [];
					company['LAST_CLOSED_YEAR'] = company['YEAR_END'];
					company['NEXT_TO_CLOSED'] = company['YEAR_END'] + 1;

					company['AVAILABLE_DATE_CLOSE'] = 'No closed date found';
					company['POLICY'] = 'No policy found';
					company['STATUS'] = 'Year end closing not available';

					if (companyPolicyTemp) {
						const policyCompany = convertXMLToJson(companyPolicyTemp.PROPERTIES_XML);
						let year = moment().format('YYYY');
						if (policyCompany.allowYearEndClosing.relativeYear === 'Next year') {
							year = moment().add(1, 'year').format('YYYY');
						}
						company['AVAILABLE_DATE_CLOSE'] = year + '-' + policyCompany.allowYearEndClosing.month + '-' + policyCompany.allowYearEndClosing.day;
						company['POLICY'] = policyCompany.allowYearEndClosing;

						if (moment().format('YYYY-MMMM-D') > moment(company['AVAILABLE_DATE_CLOSE'], 'YYYY-MMMM-D').format('YYYY-MMMM-D')) {
							company['STATUS'] = 'Year end closing is available'
							company['YEAR_END_LIST'].push(company.YEAR_END + 1);
						} else {
							company['STATUS'] = 'Year end closing not available';
						}

					}
					delete company['YEAR_END'];

				});

				return companyData;
			})
		);
		this.commonFunctionService.runGetServiceV2(method, res);
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
