import { Controller, Patch, Req, Res, Body, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateUserInfoDetailsDTO } from './dto/update-user-info-details.dto';
import { UserInfoDetailsService } from './user-info-details.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { AuthGuard } from '@nestjs/passport';
import { EmploymentDetailsDTO } from './dto/employment-details.dto';
import { PersonalDetailsDTO } from './dto/personal-details.dto';

@Controller('api/admin/user-info-details')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserInfoDetailsController {

  constructor(
    private readonly userInfoDetailsService: UserInfoDetailsService,
    private readonly commonFunctionService: CommonFunctionService
  ) { }

  @Patch('/all/:id')
  @ApiOperation({ title: 'Edit user info by user guid' })
  @ApiImplicitQuery({ name: 'id', description: 'Edit by user guid', required: true })
  editUserInfo(@Param('id') id, @Body() updateUserInfoDetailsDTO: UpdateUserInfoDetailsDTO, @Req() req, @Res() res) {
    id = this.commonFunctionService.findIdParam(req, res, id);
    this.userInfoDetailsService.updateUserInfo(updateUserInfoDetailsDTO, id).subscribe(
      data => {
        res.send(data);
      }, err => {
        res.send(err);
      }
    )
    // this.commonFunctionService.runUpdateService(this.workingHoursService.updateWorkingHours(req.user, updateWorkingHoursDTO), res);
  }

  @Patch('/employment/:id')
  @ApiOperation({ title: 'Edit user info by user guid' })
  @ApiImplicitQuery({ name: 'id', description: 'Edit by user guid', required: true })
  editEmploymentInfo(@Param('id') id, @Body() employmentDetailsDTO: EmploymentDetailsDTO, @Req() req, @Res() res) {
    id = this.commonFunctionService.findIdParam(req, res, id);
    this.userInfoDetailsService.updateEmploymentInfo(employmentDetailsDTO, id).subscribe(
      data => {
        res.send(data);
      }, err => {
        res.send(err);
      }
    )
    // this.commonFunctionService.runUpdateService(this.workingHoursService.updateWorkingHours(req.user, updateWorkingHoursDTO), res);
  }

  @Patch('/personal/:id')
  @ApiOperation({ title: 'Edit user info by user guid' })
  @ApiImplicitQuery({ name: 'id', description: 'Edit by user guid', required: true })
  editPersonalInfo(@Param('id') id, @Body() personalDetailsDTO: PersonalDetailsDTO, @Req() req, @Res() res) {
    id = this.commonFunctionService.findIdParam(req, res, id);
    this.userInfoDetailsService.updatePersonalInfo(personalDetailsDTO, id).subscribe(
      data => {
        res.send(data);
      }, err => {
        res.send(err);
      }
    )
    // this.commonFunctionService.runUpdateService(this.workingHoursService.updateWorkingHours(req.user, updateWorkingHoursDTO), res);
  }

}