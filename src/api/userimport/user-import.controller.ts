import { Controller, UseGuards, Post, UseInterceptors, FileInterceptor, UploadedFile, Req, Res, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import parse = require('csv-parse/lib/sync');
import { UserImportService } from './user-import.service';
import { UserCsvDto } from './dto/csv/user-csv.dto';

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
    constructor(private readonly userImportService: UserImportService) { }

    /**
     *create user import
     *
     * @param {[UserCsvDto]} userInviteDto
     * @param {*} req
     * @param {*} res
     * @memberof UserImportController
     */
    @Post()
    create(@Body() userInviteDto: [UserCsvDto], @Req() req, @Res() res) {

        // res.send(userInviteDto);

        this.userImportService.processImportData(req.user, userInviteDto)
            .subscribe(
                data => {
                    res.send(data);
                },
                err => {
                    res.status(400);
                    res.send("fail to process data");
                }
            )
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
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ title: 'Import user from CSV list' })
    importCSV(@UploadedFile() file, @Req() req, @Res() res) {

        if (!req.file) {
            res.status(400);
            res.send("File is null");
        }

        const records = parse(file.buffer, {
            columns: true,
            skip_empty_lines: true
        })

        console.log(records);
        this.userImportService.processImportData(req.user, records)
            .subscribe(
                data => {
                    res.send(data);
                },
                err => {
                    res.status(400);
                    res.send("fail to process data");
                }
            )

    }

}
