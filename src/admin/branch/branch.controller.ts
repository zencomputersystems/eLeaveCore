import { Controller,Get,UseGuards, Req, Res} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BranchService } from './branch.service';
import { ApiBearerAuth, ApiOperation} from '@nestjs/swagger';

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

    constructor(private readonly branchService: BranchService) {}

    @Get()
    @ApiOperation({title: 'Get branch list'})
    findAll(@Req() req,@Res() res) {

      this.branchService.getList(req.user.TENANT_GUID).subscribe(
        data => {
          res.send(data);
        },
        err => {
          if(err.response.data) {
            res.status(err.response.data.error.status_code);
            res.send(err.response.data.error.message)
          } else {
              res.status(500);
              res.send(err);
          }
        }
      )

    }
  
}
