import { Controller, UseGuards, Post, UseInterceptors, FileInterceptor, UploadedFile, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import parse = require('csv-parse/lib/sync');

@Controller('api/admin/userimport')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserImportController {
    

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    import(@UploadedFile() file, @Req() req, @Res() res) {
        if(!req.file) {
            res.status(400);
            res.send("File is null");
        }
        
        const records = parse(file.buffer, {
            columns: true,
            skip_empty_lines: true
          })

        res.send(records);
        
    }

}
