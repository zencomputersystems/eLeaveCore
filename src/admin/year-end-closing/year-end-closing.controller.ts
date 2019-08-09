import { Controller, UseGuards, Get, Post, Body, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { YearEndClosingService } from './year-end-closing.service';

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
  constructor(private readonly yearEndClosingService: YearEndClosingService) { }

  /**
   * Do process year end 
   * Disable resign user
   * Assign new leave entitlement
   *
   * @param {*} req
   * @param {*} res
   * @memberof YearEndClosingController
   */
  @Post()
  @ApiOperation({ title: 'Create user info' })
  create(@Req() req, @Res() res) {
    this.yearEndClosingService.yearEndProcess(req.user).subscribe(data => {
      res.send(data);
    }, err => {
      res.send(err);
    })

    // this.runCreateService(this.userInfoService.create(req.user, createUserDTO), res);

  }

}