import { Controller, UseGuards, Get, Req, Res, Post, Patch, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GeneralLeavePolicyService } from './general-leave-policy.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { CreateGeneralLeavePolicyDTO } from './dto/create-general-leave-policy.dto';
import { UpdateGeneralLeavePolicyDTO } from './dto/update-general-leave-policy.dto';
import { XMLParserService } from '../../common/helper/xml-parser.service';

@Controller('api/admin/general-leave-policy')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class GeneralLeavePolicyController {
	constructor(private readonly generalLeavePolicyService: GeneralLeavePolicyService,
		private readonly commonFunctionService: CommonFunctionService,
		private readonly xmlParserService: XMLParserService) { }

	@Get()
	@ApiOperation({ title: 'Get general leave policy' })
	findAll(@Req() req, @Res() res) {
		this.generalLeavePolicyService.findAll(req.user.TENANT_GUID).subscribe(
			data => {
				data.forEach(element => { element.PROPERTIES_XML = this.xmlParserService.convertXMLToJson(element.PROPERTIES_XML); });
				res.send(data);
			},
			err => { this.commonFunctionService.sendResErrorV3(err, res); }
		)
	}

	@Post()
	@ApiOperation({ title: 'Create general leave policy' })
	createCompany(@Body() data: CreateGeneralLeavePolicyDTO, @Req() req, @Res() res) {
		this.generalLeavePolicyService.create(req.user, data).subscribe(
			data => { res.send(data.data); },
			err => { res.send(err); }
		);
	}

	@Patch()
	@ApiOperation({ title: 'Update general leave policy' })
	updateCompany(@Body() updateGeneralLeavePolicyDTO: UpdateGeneralLeavePolicyDTO, @Req() req, @Res() res) {
		this.generalLeavePolicyService.update(req.user, updateGeneralLeavePolicyDTO).subscribe(
			data => { res.send(data.data); },
			err => { console.log(err); res.send(err); }
		)
	}

}