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
    // console.log('starttttt');
    // console.log(res);
    // console.log('enddddd');
    // console.log(res);
    this.branchService.getList(req.user.TENANT_GUID).subscribe(
      data => {
        res.send(data);
      },
      err => {
        this.commonFunctionService.sendResErrorV3(err, res);
      }
    )

  }

  // @Get()
  // @ApiOperation({ title: 'Get branch list' })
  // findData(tenantId) {
  //   // console.log('starttttt');
  //   // console.log(res);
  //   // console.log('enddddd');
  //   // console.log(res);
  //   let result = this.branchService.getList(tenantId);
  //   console.log(result);
  //   return result;
  //   //.subscribe(
  //   //   data => {
  //   //     console.log(data);
  //   //     // res.send(data);
  //   //     return data;
  //   //   },
  //   //   err => {
  //   //     return err;
  //   //     // this.commonFunctionService.sendResErrorV3(err, res);
  //   //   }
  //   // )

  // }

  // @Post('sas')
  // public async getSAS(@Req() req) {
  //   const container = "cloudservices";
  //   const blobName = "eleave";
  //   const permission = "r";
  //   return await this.branchService.generateSasToken(container, blobName, permission);
  //   // return await this.branchService.generateSasToken(req.body.container, req.body.blobName, req.body.permissions);
  //   // return await this.authService.createToken(req.user);
  //   //return this.ad(loginDTO,req);
  // }
}
