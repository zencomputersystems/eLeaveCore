import { Controller, UseGuards, Get, Post, Body, Req, Res, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
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
    private readonly yearEndClosingService: YearEndClosingService
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
  @ApiImplicitParam({ name: 'year', description: 'Closing year', required: true })
  @ApiOperation({ title: 'Assign leave entitlement for next year' })
  create(@Param('year') year, @Req() req, @Res() res) {
    year = year == new Date().getFullYear() ? year - 1 : year;
    this.yearEndClosingService.yearEndProcess(req.user, new Date(year).getFullYear() + 1).subscribe(data => {
      let dataRes = {};
      dataRes['resignUser'] = this.trimData(data[0]);
      dataRes['disabledUser'] = this.trimData(data[1]);
      dataRes['activeUser'] = this.trimData(data[2]);

      res.send(dataRes);
    }, err => {
      res.send(err);
    })
  }

  /**
   * Close by company
   *
   * @param {*} param
   * @param {*} req
   * @param {*} res
   * @memberof YearEndClosingController
   */
  @Post('/:year/:companyid')
  @ApiImplicitParam({ name: 'year', description: 'Closing year', required: true })
  @ApiImplicitParam({ name: 'companyid', description: 'Company guid', required: true })
  @ApiOperation({ title: 'Assign leave entitlement for next year' })
  closeYearEnd(@Param() param, @Req() req, @Res() res) {
    let year: number = param.year;
    let companyId = param.companyid;
    // console.log(year);
    // console.log(new Date().getFullYear());
    // year = year == new Date().getFullYear() ? year - 1 : year;
    // console.log(year);
    // console.log(year + 1);
    year++;
    // console.log(year)
    this.yearEndClosingService.yearEndProcessCompany([req.user, year, companyId]).subscribe(data => {
      let dataRes = {};
      dataRes['resignUser'] = this.trimData(data[0]);
      dataRes['disabledUser'] = this.trimData(data[1]);
      dataRes['activeUser'] = this.trimData(data[2]);

      res.send(dataRes);
    }, err => {
      res.send(err);
    })
  }

  /**
   * Get only wanted data, trim some keys
   *
   * @param {string[]} dataArr
   * @returns
   * @memberof YearEndClosingController
   */
  public trimData(dataArr: string[]) {
    const keyDelete = ["TENANT_GUID", "TENANT_COMPANY_GUID", "USER_INFO_GUID", "DESIGNATION", "DEPARTMENT", "DIVISION", "BRANCH", "ATTACHMENT_ID", "STATUS_ACTIVATION", "RESIGNATION_DATE", "ACTIVATION_FLAG"]
    dataArr.forEach(userData => {
      keyDelete.forEach(keyTemp => {
        delete userData[keyTemp];
      });
    });
    return dataArr;
  }

}