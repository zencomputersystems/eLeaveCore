import { Controller, UseGuards, Get, Post, Body, Req, Res, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { YearEndClosingService } from './year-end-closing.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

/**
 * Controller year end closing
 *
 * @export
 * @class YearEndClosingController
 */
@Controller('api/admin/year-end-closing')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class YearEndClosingController {
  /**
   *Creates an instance of YearEndClosingController.
   * @param {YearEndClosingService} yearEndClosingService
   * @memberof YearEndClosingController
   */
  constructor(
    private readonly yearEndClosingService: YearEndClosingService,
    private readonly commonFunctionService: CommonFunctionService
  ) { }

  /**
   * Do process year end 
   * Disable resign user
   * Assign new leave entitlement
   * add carry forward based on leave policy
   *
   * @param {*} req
   * @param {*} res
   * @memberof YearEndClosingController
   */
  @Post('/:year')
  @ApiImplicitQuery({ name: 'year', description: 'Closing year', required: true })
  @ApiOperation({ title: 'Assign leave entitlement for next year' })
  create(@Param('year') year, @Req() req, @Res() res) {
    // console.log(year);
    // year = this.commonFunctionService.findIdParam(req, res, year);
    let dataYear = null;
    let dataIdParam = req.query.year;
    if (dataIdParam == null) {
      dataYear = year;
    } else {
      dataYear = dataIdParam;
    }
    if (dataYear == null) {
      res.status(400);
      res.send('id not found');
    }
    year = dataYear;
    // console.log(year);
    // console.log(new Date(year).getFullYear() + 1);
    this.yearEndClosingService.yearEndProcess(req.user, new Date(year).getFullYear() + 1).subscribe(data => {
      // console.log(data);
      let dataRes = {};
      dataRes['resignUser'] = this.trimData(data[0]);
      dataRes['disabledUser'] = this.trimData(data[1]);
      dataRes['activeUser'] = this.trimData(data[2]);

      res.send(dataRes);
    }, err => {
      res.send(err);
    })

    // this.runCreateService(this.userInfoService.create(req.user, createUserDTO), res);

  }


  public trimData(dataArr: string[]) {
    const keyDelete = ["TENANT_GUID", "TENANT_COMPANY_GUID", "USER_INFO_GUID", "DESIGNATION", "DEPARTMENT", "DIVISION", "BRANCH", "ATTACHMENT_ID", "STATUS_ACTIVATION", "RESIGNATION_DATE", "ACTIVATION_FLAG", "JOIN_DATE"]
    dataArr.forEach(userData => {
      keyDelete.forEach(keyTemp => {
        delete userData[keyTemp];
      });
    });
    return dataArr;
  }

}