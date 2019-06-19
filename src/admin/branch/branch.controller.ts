import { Controller,Get,UseGuards, Req, Res} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BranchService } from './branch.service';
import { ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import { ResultStatusService } from 'src/common/helper/result-status.service';

/**
 *
 *
 * @export
 * @class BranchController
 */
@Controller('api/branch')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class BranchController {

    constructor(private readonly branchService: BranchService,private readonly resultStatusService: ResultStatusService) {}

    @Get()
    @ApiOperation({title: 'Get branch list'})
    findAll(@Req() req,@Res() res) {

      this.branchService.getList(req.user.TENANT_GUID).subscribe(
        data => {
          res.send(data);
        },
        err => {
          this.resultStatusService.sendError(err,res);
        }
      )

    }
  
}
