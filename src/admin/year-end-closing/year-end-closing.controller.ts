import { Controller, UseGuards, Get, Post, Body, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { YearEndClosingService } from './year-end-closing.service';

@Controller('api/admin/year-end-closing')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class YearEndClosingController {
  constructor(private readonly yearEndClosingService: YearEndClosingService) { }

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