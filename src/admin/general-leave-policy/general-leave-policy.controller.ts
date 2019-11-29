import { Controller, UseGuards, Get, Req, Res, Post, Patch, Body, Param, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { GeneralLeavePolicyService } from './general-leave-policy.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { CreateGeneralLeavePolicyDTO } from './dto/create-general-leave-policy.dto';
import { UpdateGeneralLeavePolicyDTO } from './dto/update-general-leave-policy.dto';
/** XMLparser from zen library  */
var { convertXMLToJson } = require('@zencloudservices/xmlparser');

/**
 * Controller for general leave policy
 *
 * @export
 * @class GeneralLeavePolicyController
 */
@Controller('api/admin/general-leave-policy')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class GeneralLeavePolicyController {
	/**
	 *Creates an instance of GeneralLeavePolicyController.
	 * @param {GeneralLeavePolicyService} generalLeavePolicyService General leave policy service
	 * @param {CommonFunctionService} commonFunctionService Common function service
	 * @memberof GeneralLeavePolicyController
	 */
	constructor(
		private readonly generalLeavePolicyService: GeneralLeavePolicyService,
		private readonly commonFunctionService: CommonFunctionService
	) { }

	/**
	 * Method find all
	 *
	 * @param {*} req
	 * @param {*} res
	 * @memberof GeneralLeavePolicyController
	 */
	@Get()
	@ApiOperation({ title: 'Get general leave policy' })
	findAll(@Req() req, @Res() res) {
		this.generalLeavePolicyService.findAll(req.user.TENANT_GUID).subscribe(
			data => {
				data.forEach(element => { element.PROPERTIES_XML = convertXMLToJson(element.PROPERTIES_XML); });
				res.send(data);
			},
			err => { this.commonFunctionService.sendResErrorV3(err, res); }
		)
	}

	/**
	 * Get general leave poslicy by company id
	 *
	 * @param {*} id
	 * @param {*} req
	 * @param {*} res
	 * @memberof GeneralLeavePolicyController
	 */
	@Get(':id')
	@ApiOperation({ title: 'Get general leave policy by company id' })
	@ApiImplicitParam({ name: 'id', description: 'Filter by TENANT_COMPANY_GUID', required: true })
	findOne(@Param('id') id, @Req() req, @Res() res) {
		this.generalLeavePolicyService.findOne(req.user.TENANT_GUID, id).subscribe(
			data => {
				if (data) {
					data.PROPERTIES_XML = convertXMLToJson(data.PROPERTIES_XML);
					res.send(data);
				} else {
					res.send(new NotFoundException('Failed to retrieve data', 'Failed to get data'));
				}
			},
			err => { this.commonFunctionService.sendResErrorV3(err, res); }
		)
	}

	/**
	 * Method create general leave policy
	 *
	 * @param {CreateGeneralLeavePolicyDTO} data
	 * @param {*} req
	 * @param {*} res
	 * @memberof GeneralLeavePolicyController
	 */
	@Post()
	@ApiOperation({ title: 'Create general leave policy' })
	createGeneralLeavePolicy(@Body() data: CreateGeneralLeavePolicyDTO, @Req() req, @Res() res) {
		this.generalLeavePolicyService.create(req.user, data).subscribe(
			data => { res.send(data.data); },
			err => { res.send(err); }
		);
	}

	/**
	 * Method update general leave policy
	 *
	 * @param {UpdateGeneralLeavePolicyDTO} updateGeneralLeavePolicyDTO
	 * @param {*} req
	 * @param {*} res
	 * @memberof GeneralLeavePolicyController
	 */
	@Patch()
	@ApiOperation({ title: 'Update general leave policy' })
	updateGeneralLeavePolicy(@Body() updateGeneralLeavePolicyDTO: UpdateGeneralLeavePolicyDTO, @Req() req, @Res() res) {
		this.generalLeavePolicyService.update(req.user, updateGeneralLeavePolicyDTO).subscribe(
			data => { res.send(data.data); },
			err => { res.send(err); }
		)
	}

}