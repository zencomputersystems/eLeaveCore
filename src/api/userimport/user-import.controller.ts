import { Controller, UseGuards, Post, UseInterceptors, UploadedFile, Req, Res, Body, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitFile } from '@nestjs/swagger';
import parse = require('csv-parse/lib/sync');
import { UserImportService } from './user-import.service';
import { UserCsvDto } from './dto/csv/user-csv.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SubscriptionDbService } from './subscription.db.service';
import { runServiceCallback } from 'src/common/helper/basic-functions';

/**
 * Controller for user import
 *
 * @export
 * @class UserImportController
 */
@Controller('api/userimport')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserImportController {

	/**
	 *Creates an instance of UserImportController.
	 * @param {UserImportService} userImportService
	 * @memberof UserImportController
	 */
	constructor(
		private readonly userImportService: UserImportService,
		private readonly subscriptionDbService: SubscriptionDbService
	) { }

	/**
	 *create user import
	 *
	 * @param {[UserCsvDto]} userInviteDto
	 * @param {*} req
	 * @param {*} res
	 * @memberof UserImportController
	 */
	@Post()
	@ApiOperation({ title: 'Import user' })
	async create(@Body() userInviteDto: [UserCsvDto], @Req() req, @Res() res) {
		let method = this.subscriptionDbService.findByFilterV2([], [`(CUSTOMER_GUID=${req.user.TENANT_GUID})`]);
		let quotaData = await runServiceCallback(method);
		// console.log(quotaData);
		// res.send(quotaData[0].ACTIVE_QUOTA_LIST);
		// quotaData[0].ACTIVE_QUOTA_LIST = 0;
		console.log(quotaData[0].ACTIVE_QUOTA + '-' + quotaData[0].USED_QUOTA);
		let balanceQuota = quotaData[0].ACTIVE_QUOTA - quotaData[0].USED_QUOTA;
		if (balanceQuota > 0)
			this.runService([req.user, userInviteDto, res]);
		else
			res.status(HttpStatus.BAD_REQUEST).send(new BadRequestException(`You don't have enough quota to add users. Total quota is ${quotaData[0].ACTIVE_QUOTA} and only ${balanceQuota} left`));
	}

	/**
	 * import csv user import
	 *
	 * @param {*} file
	 * @param {*} req
	 * @param {*} res
	 * @memberof UserImportController
	 */
	@Post('csv')
	@ApiImplicitFile({ name: 'file', required: true, description: 'The file to upload' })
	@UseInterceptors(FileInterceptor('file'))
	@ApiOperation({ title: 'Import user from CSV list' })
	async importCSV(@UploadedFile() file, @Req() req, @Res() res) {
		if (!req.file) {
			res.status(400).send("File is null");
		}

		const records = parse(file.buffer, {
			columns: true,
			skip_empty_lines: true,
			skip_lines_with_empty_values: true
		})

		let method = this.subscriptionDbService.findByFilterV2([], [`(CUSTOMER_GUID=${req.user.TENANT_GUID})`]);
		let quotaData = await runServiceCallback(method);

		// console.log(quotaData[0].ACTIVE_QUOTA);
		// console.log(quotaData[0].USED_QUOTA);
		// console.log(records.length);
		let balanceQuota = quotaData[0].ACTIVE_QUOTA - quotaData[0].USED_QUOTA;

		if (records.length <= balanceQuota) //  quotaData[0].ACTIVE_QUOTA_LIST)
			// this.runService([req.user, userInviteDto, res]); 
			this.runService([req.user, records, res]);
		// res.send('data');
		else
			res.send(new BadRequestException(`You don't have enough quota to add users. Total quota is ${quotaData[0].ACTIVE_QUOTA} and only ${balanceQuota} left`));

		// this.runService([req.user, records, res]);
	}

	/**
	 * run service userimport
	 *
	 * @private
	 * @param {*} [user, data, res]
	 * @memberof UserImportController
	 */
	private runService([user, data, res]) {
		this.userImportService.processImportData(user, data).subscribe(
			data => { res.send(data); },
			err => { res.status(400).send("fail to process data"); }
		)
	}

}
