import { Controller, UseGuards, Post, UseInterceptors, FileInterceptor, UploadedFile, Req, Res, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import parse = require('csv-parse/lib/sync');
import { UserImportService } from './user-import.service';
import { UserCsvDto } from './dto/csv/user-csv.dto';

@Controller('api/userimport')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserImportController {

    constructor(private readonly userImportService: UserImportService) {}
    
    @Post()
    create(@Body() userInviteDto: [UserCsvDto],@Req() req, @Res() res) {

    }

    @Post('csv')
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({title: 'Import user from CSV list'})
    importCSV(@UploadedFile() file, @Req() req, @Res() res) {

        if(!req.file) {
            res.status(400);
            res.send("File is null");
        }
        
        const records = parse(file.buffer, {
            columns: true,
            skip_empty_lines: true
          })

        this.userImportService.processImportData(req.user,records)
            .subscribe(
                data=>{
                    //console.log(data);
                    res.send(data);
                },
                err => {
                    console.log(err);
                    res.status(400);
                    //res.send(err);
                    //console.log(err.response.data.error.context.resource);
                },
                () => {
                    console.log("complete");
                }
            )
        
    }

}
