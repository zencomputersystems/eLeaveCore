import { Controller, UseGuards, Post, UseInterceptors, FileInterceptor, UploadedFile, Req, Res, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import parse = require('csv-parse/lib/sync');
import { UserImportService } from './user-import.service';
import { UserCsvDto } from './dto/user-csv.dto';
import { flatMap} from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Controller('api/admin/userimport')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserImportController {

    constructor(private readonly userImportService: UserImportService) {}
    
    @Post()
    create(@Body() userInviteDto: [UserCsvDto],@Req() req, @Res() res) {
       
        // this.userImportService.processImportList(req.user,userInviteDto)
        // .subscribe(
        //     data=> {
        //         res.send(data);
        //     },
        //     err => {
        //         res.status(400);
        //         res.send("Bad Request");
        //     }
        // )
    }

    @Post('csv')
    @UseInterceptors(FileInterceptor('file'))
    importCSV(@UploadedFile() file, @Req() req, @Res() res) {
        if(!req.file) {
            res.status(400);
            res.send("File is null");
        }
        
        const records = parse(file.buffer, {
            columns: true,
            skip_empty_lines: true
          })

        let f = [];
        this.userImportService.processImportData(req.user,records)
            .subscribe(
                data=>{
                    console.log("emitted");
                    //console.log(data);
                    res.send(data);
                },
                err => {
                    res.status(400);
                    //res.send(err);
                    console.log(err.response.data.error.context.resource);
                },
                () => {
                    console.log("complete");
                }
            )
        
    }

}
