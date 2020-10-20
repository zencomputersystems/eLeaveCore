import { Controller, UseGuards, Get, Req, Res, Post, Patch, Body, Param, NotFoundException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { GeneralLeavePolicyService } from './general-leave-policy.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { CreateGeneralLeavePolicyDTO } from './dto/create-general-leave-policy.dto';
import { UpdateGeneralLeavePolicyDTO } from './dto/update-general-leave-policy.dto';
import { ApplyAnniversaryLeaveService } from '../year-end-closing/service/apply-anniversary-leave.service';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';
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
		private readonly commonFunctionService: CommonFunctionService,
		private readonly applyAnniversaryLeaveService: ApplyAnniversaryLeaveService
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
				data.forEach(element => {
					let pxml = convertXMLToJson(element.PROPERTIES_XML);
					if (pxml.hasOwnProperty('anniversaryBonus')) {
						if (pxml.anniversaryBonus.applyLeaveOnDate == '')
							pxml.anniversaryBonus.applyLeaveOnDate = [];
						else if (pxml.anniversaryBonus.applyLeaveOnDate == 'birthday' || pxml.anniversaryBonus.applyLeaveOnDate == 'join-date') {
							let temp = [];
							temp.push(pxml.anniversaryBonus.applyLeaveOnDate);
							pxml.anniversaryBonus.applyLeaveOnDate = temp;
						}
					}
					element.PROPERTIES_XML = pxml;
				});
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
					let pxml = convertXMLToJson(data.PROPERTIES_XML);
					if (pxml.hasOwnProperty('anniversaryBonus')) {
						if (pxml.anniversaryBonus.applyLeaveOnDate == '')
							pxml.anniversaryBonus.applyLeaveOnDate = [];
						else if (pxml.anniversaryBonus.applyLeaveOnDate == 'birthday' || pxml.anniversaryBonus.applyLeaveOnDate == 'join-date') {
							let temp = [];
							temp.push(pxml.anniversaryBonus.applyLeaveOnDate);
							pxml.anniversaryBonus.applyLeaveOnDate = temp;
						}
					}
					data.PROPERTIES_XML = pxml;
					res.send(data);
				} else {
					res.status(HttpStatus.NOT_FOUND).send(new NotFoundException('Failed to retrieve data', 'Failed to get data'));
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
		// this.generalLeavePolicyService.create(req.user, data).subscribe(
		// 	data => { res.send(data.data); },
		// 	err => { res.send(err); }
		// );
		this.runServicePolicy([this.generalLeavePolicyService.create(req.user, data), res, data]);
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
		// this.generalLeavePolicyService.update(req.user, updateGeneralLeavePolicyDTO).subscribe(
		// 	data => { res.send(data.data); },
		// 	err => { res.send(err); }
		// )
		this.runServicePolicy([this.generalLeavePolicyService.update(req.user, updateGeneralLeavePolicyDTO), res, updateGeneralLeavePolicyDTO.data]);
	}

	@Patch('resync/:companyPolicyId')
	@ApiOperation({ title: 'Resync general policy setting' })
	@ApiImplicitParam({ name: 'companyPolicyId', description: 'Company policy guid' })
	resyncPolicySetting(@Param('companyPolicyId') policyId, @Res() res) {
		this.generalLeavePolicyService.syncPolicy([policyId]).subscribe(
			data => { res.send(data); },
			err => { res.send(err); }
		);
	}

	/**
	 * Run service for create and update general leave policy
	 *
	 * @private
	 * @param {*} [method, res]
	 * @memberof GeneralLeavePolicyController
	 */
	private runServicePolicy([method, res, data]: [Observable<any>, any, CreateGeneralLeavePolicyDTO]) {
		method.pipe(map(res => {
			// this.applyAnniversaryLeaveService.verifyAnniversaryLeave([data, null, null]);
			this.generalLeavePolicyService.syncPolicy([res.data.resource[0].MAIN_GENERAL_POLICY_GUID]).subscribe();

			return res;
		})
		)
			.subscribe(
				data => {
					res.send(data.data);
				},
				err => { res.send(err); }
			)
	}

}