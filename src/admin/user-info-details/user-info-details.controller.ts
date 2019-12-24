import { Controller, Patch, Req, Res, Body, Param, UseGuards, Get, BadRequestException, NotFoundException, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiImplicitParam } from '@nestjs/swagger';
import { UpdateUserInfoItemDTO } from './dto/update-user-info-details.dto';
import { UserInfoDetailsService } from './user-info-details.service';
import { AuthGuard } from '@nestjs/passport';
import { EmploymentDetailsDTO } from './dto/employment-details.dto';
import { PersonalDetailsDTO } from './dto/personal-details.dto';
import { UserInfoActivateService } from './user-info-activate.service';
/** XMLparser from zen library  */
var { convertXMLToJson } = require('@zencloudservices/xmlparser');

/**
 * Controller user info details
 *
 * @export
 * @class UserInfoDetailsController
 */
@Controller('api/admin/user-info-details')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserInfoDetailsController {

  /**
   *Creates an instance of UserInfoDetailsController.
   * @param {UserInfoDetailsService} userInfoDetailsService Service user info details
   * @memberof UserInfoDetailsController
   */
  constructor(
    private readonly userInfoDetailsService: UserInfoDetailsService,
    private readonly userInfoActivateService: UserInfoActivateService
  ) { }

  @Get('/inactive/:id')
  @ApiOperation({ title: 'Get inactive user info' })
  @ApiImplicitParam({ name: 'id', description: 'User guid' })
  getInactiveUserInfo(@Param() params, @Req() req, @Res() res) {
    this.userInfoActivateService.getInfoUser(params.id, req.user.TENANT_GUID).subscribe(
      data => {
        res.send({ ...data[1][0], ...data[0][0] });
      }, err => {
        res.send(err);
      }
    );
  }

  @Post('/activate/:id')
  @ApiOperation({ title: 'Reactivate user and reate new user info' })
  @ApiImplicitParam({ name: 'id', description: 'User guid' })
  createNewUserInfo(@Param() params, @Req() req, @Res() res) {
    this.userInfoActivateService.createNewUserInfo(params.id, req.user.TENANT_GUID).subscribe(
      data => {
        // res.send({ ...data[1][0], ...data[0][0] });
        res.send(data.data.resource);
      }, err => {
        res.send(err);
      }
    );
  }

  /**
   * Get personal info
   *
   * @param {*} item
   * @param {*} req
   * @param {*} res
   * @memberof UserInfoDetailsController
   */
  @Get(':item')
  @ApiOperation({ title: 'Get employee personal info' })
  @ApiImplicitParam({ name: 'item', description: 'Get user info by category', enum: ['notification-rule', 'employment-detail', 'personal-details'], required: true })
  getPersonalInfo(@Param('item') item, @Req() req, @Res() res) {
    if (item != '{item}' && item.trim() != '') {
      this.userInfoDetailsService.getUserXMLInfoUserGuid(req.user.USER_GUID).subscribe(
        data => { this.userInfoDetailsService.filterResults([data, res, item]); },
        err => { throw new NotFoundException('No data found', 'Unreachable'); }
      );
    } else {
      throw new BadRequestException('Please input valid filter', 'Invalid filter');
    }
  }

  /**
   * Get personal user info by user info guid
   *
   * @param {*} param
   * @param {*} req
   * @param {*} res
   * @memberof UserInfoDetailsController
   */
  @Get(':item/:id')
  @ApiOperation({ title: 'Get employee personal info by user guid' })
  @ApiImplicitParam({ name: 'item', description: 'Get user info by category', enum: ['notification-rule', 'employment-detail', 'personal-details'], required: true })
  @ApiImplicitParam({ name: 'id', description: 'Get user info by user info guid', required: true })
  getPersonalUserInfo(@Param() param, @Req() req, @Res() res) {
    if (param.id != '{id}' && param.id != '' && param.item != '{item}' && param.item != '') {
      this.userInfoDetailsService.getUserXMLInfo(param.id).subscribe(
        data => {
          if (data.length > 0)
            this.userInfoDetailsService.filterResults([data, res, param.item]);
          else
            res.status(HttpStatus.BAD_REQUEST).send(new BadRequestException('Please input valid filter', 'Invalid filter'));
        },
        err => { throw new NotFoundException('No data found', 'Unreachable'); }
      );
    } else {
      throw new BadRequestException('Please input valid filter', 'Invalid filter');
    }

  }

  /**
   * Update all user info by user info guid
   *
   * @param {*} id
   * @param {UpdateUserInfoItemDTO} updateUserInfoItemDTO
   * @param {*} req
   * @param {*} res
   * @memberof UserInfoDetailsController
   */
  @Patch('/all/:id')
  @ApiOperation({ title: 'Edit user info by user info guid' })
  @ApiImplicitParam({ name: 'id', description: 'Edit by user info guid', required: true })
  editUserInfo(@Param('id') id, @Body() updateUserInfoItemDTO: UpdateUserInfoItemDTO, @Req() req, @Res() res) {
    this.runService([this.userInfoDetailsService.updateUserInfo([updateUserInfoItemDTO, id, req.user]), res, 'all']);
  }

  /**
   * Update employment user info xml by user info guid
   *
   * @param {*} id
   * @param {EmploymentDetailsDTO} employmentDetailsDTO
   * @param {*} req
   * @param {*} res
   * @memberof UserInfoDetailsController
   */
  @Patch('/employment/:id')
  @ApiOperation({ title: 'Edit employment info by user info guid' })
  @ApiImplicitParam({ name: 'id', description: 'Edit by user info guid', required: true })
  editEmploymentInfo(@Param('id') id, @Body() employmentDetailsDTO: EmploymentDetailsDTO, @Req() req, @Res() res) {
    this.runService([this.userInfoDetailsService.updateEmploymentInfo([employmentDetailsDTO, id, req.user]), res, 'employmentDetail']);
  }

  /**
   * Update personal user info xml by user info guid
   *
   * @param {*} id
   * @param {PersonalDetailsDTO} personalDetailsDTO
   * @param {*} req
   * @param {*} res
   * @memberof UserInfoDetailsController
   */
  @Patch('/personal/:id')
  @ApiOperation({ title: 'Edit personal info by user info guid' })
  @ApiImplicitParam({ name: 'id', description: 'Edit by user info guid', required: true })
  editPersonalInfo(@Param('id') id, @Body() personalDetailsDTO: PersonalDetailsDTO, @Req() req, @Res() res) {
    this.runService([this.userInfoDetailsService.updatePersonalInfo([personalDetailsDTO, id, req.user]), res, 'personalDetails']);
  }

  /**
   * Update notification rule user info xml by user info guid
   *
   * @param {*} id
   * @param {string[]} notificationRule
   * @param {*} req
   * @param {*} res
   * @memberof UserInfoDetailsController
   */
  @Patch('/notification-rule/:id')
  @ApiOperation({ title: 'Edit notification rule by user info guid' })
  @ApiImplicitParam({ name: 'id', description: 'Edit by user info guid', required: true })
  editNotificationRule(@Param('id') id, @Body() notificationRule: string[], @Req() req, @Res() res) {
    this.runService([this.userInfoDetailsService.updateNotificationRule([notificationRule, id, req.user]), res, 'notificationRule']);
  }

  /**
   * Run service function
   *
   * @param {[any, any, string]} [method, res, process]
   * @memberof UserInfoDetailsController
   */
  public runService([method, res, process]: [any, any, string]) {
    method.subscribe(
      data => {
        if (data.data.resource.length > 0) {
          let results = convertXMLToJson(data.data.resource[0].PROPERTIES_XML);
          let filterResult =
            process == 'notificationRule' ? results.root.notificationRule :
              process == 'employmentDetail' ? results.root.employmentDetail :
                process == 'personalDetails' ? results.root.personalDetails : results
          res.send(filterResult);
        } else {
          res.status(HttpStatus.BAD_REQUEST).send(new BadRequestException('Data not found', 'No data found'));
        }
      }, err => {
        res.send(err);
      }
    )
  }

}