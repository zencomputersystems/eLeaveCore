import { Controller, Get, UseGuards, Req, Res, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BranchService } from './branch.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

/**
 * Controller for branch
 *
 * @export
 * @class BranchController
 */
@Controller('api/branch')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class BranchController {

  constructor(private readonly branchService: BranchService, private readonly commonFunctionService: CommonFunctionService) { }

  /**
   * Get all branch list
   *
   * @param {*} req
   * @param {*} res
   * @memberof BranchController
   */
  @Get()
  @ApiOperation({ title: 'Get branch list' })
  findAll(@Req() req, @Res() res) {
    this.branchService.getList(req.user.TENANT_GUID).subscribe(
      data => { res.send(data); },
      err => { this.commonFunctionService.sendResErrorV3(err, res); }
    )

  }

}
