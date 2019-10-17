import { Controller, Patch, Req, Res, Body, Param, UseGuards, Get } from '@nestjs/common';
import { ApiOperation, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateUserInfoItemDTO } from './dto/update-user-info-details.dto';
import { UserInfoDetailsService } from './user-info-details.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { AuthGuard } from '@nestjs/passport';
import { EmploymentDetailsDTO } from './dto/employment-details.dto';
import { PersonalDetailsDTO } from './dto/personal-details.dto';
import { XMLParserService } from '../../common/helper/xml-parser.service';

@Controller('api/admin/user-info-details')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserInfoDetailsController {

  constructor(
    private readonly userInfoDetailsService: UserInfoDetailsService,
    private readonly commonFunctionService: CommonFunctionService,
    private readonly xmlParserService: XMLParserService
  ) { }

  @Get(':item')
  @ApiOperation({ title: 'Get employee personal info' })
  @ApiImplicitQuery({ name: 'item', description: 'Get user info by category', enum: ['notification-rule', 'employment-detail', 'personal-details'], required: true })
  getPersonalInfo(@Param('item') item, @Req() req, @Res() res) {
    let dataId = null;
    let dataIdParam = req.query.item;

    if (dataIdParam == null) {
      dataId = item;
    } else {
      dataId = dataIdParam;
    }

    if (dataId == null) {
      res.status(400);
      res.send('item not found');
    }

    this.userInfoDetailsService.getUserXMLInfo(req.user.USER_GUID).subscribe(
      data => {
        this.filterResults(data, res, dataId);
      }, err => {
        res.send(err);
      }
    );
  }

  @Patch('/all/:id')
  @ApiOperation({ title: 'Edit user info by user guid' })
  @ApiImplicitQuery({ name: 'id', description: 'Edit by user guid', required: true })
  editUserInfo(@Param('id') id, @Body() updateUserInfoItemDTO: UpdateUserInfoItemDTO, @Req() req, @Res() res) {
    id = this.commonFunctionService.findIdParam(req, res, id);
    this.runService([this.userInfoDetailsService.updateUserInfo([updateUserInfoItemDTO, id, req.user]), res, 'all']);
  }

  @Patch('/employment/:id')
  @ApiOperation({ title: 'Edit employment info by user guid' })
  @ApiImplicitQuery({ name: 'id', description: 'Edit by user guid', required: true })
  editEmploymentInfo(@Param('id') id, @Body() employmentDetailsDTO: EmploymentDetailsDTO, @Req() req, @Res() res) {
    id = this.commonFunctionService.findIdParam(req, res, id);
    this.runService([this.userInfoDetailsService.updateEmploymentInfo([employmentDetailsDTO, id, req.user]), res, 'employmentDetail']);
  }

  @Patch('/personal/:id')
  @ApiOperation({ title: 'Edit personal info by user guid' })
  @ApiImplicitQuery({ name: 'id', description: 'Edit by user guid', required: true })
  editPersonalInfo(@Param('id') id, @Body() personalDetailsDTO: PersonalDetailsDTO, @Req() req, @Res() res) {
    id = this.commonFunctionService.findIdParam(req, res, id);
    this.runService([this.userInfoDetailsService.updatePersonalInfo([personalDetailsDTO, id, req.user]), res, 'personalDetails']);
  }

  @Patch('/notification-rule/:id')
  @ApiOperation({ title: 'Edit notification rule by user guid' })
  @ApiImplicitQuery({ name: 'id', description: 'Edit by user guid', required: true })
  editNotificationRule(@Param('id') id, @Body() notificationRule: string[], @Req() req, @Res() res) {
    id = this.commonFunctionService.findIdParam(req, res, id);
    this.runService([this.userInfoDetailsService.updateNotificationRule([notificationRule, id, req.user]), res, 'notificationRule']);
  }

  public runService([method, res, process]: [any, any, string]) {
    method.subscribe(
      data => {
        let results = this.xmlParserService.convertXMLToJson(data.data.resource[0].PROPERTIES_XML);
        let filterResult =
          process == 'notificationRule' ? results.root.notificationRule :
            process == 'employmentDetail' ? results.root.employmentDetail :
              process == 'personalDetails' ? results.root.personalDetails : results
        res.send(filterResult);
      }, err => {
        res.send(err);
      }
    )
  }

  public filterResults(data, res, dataId) {
    let results = data.data.resource[0];
    let resultItem = {};

    let dataXML = this.xmlParserService.convertXMLToJson(data.data.resource[0].PROPERTIES_XML);
    resultItem['id'] = results.USER_INFO_GUID;
    resultItem['userId'] = results.USER_GUID;
    resultItem['employeeName'] = results.FULLNAME;

    if (dataId == 'personal-details') {
      resultItem['employeeDesignation'] = results.DESIGNATION;
      resultItem['employeeLocation'] = results.BRANCH;
      resultItem['employeeDepartment'] = results.DEPARTMENT;
      resultItem['calendarId'] = results.CALENDAR_GUID;
      resultItem['tenantId'] = results.TENANT_GUID;
      resultItem['link'] = "https://zencloudservicesstore.blob.core.windows.net/cloudservices/eleave/";
      resultItem['personalDetail'] = dataXML.root.personalDetails;
      resultItem['personalDetail']['gender'] = dataXML.root.personalDetails.gender == 1 ? 'Male' : 'Female';
      resultItem['personalDetail']['maritalStatus'] = dataXML.root.personalDetails.maritalStatus == 1 ? 'Married' : 'Single';

    } else if (dataId == 'employment-detail') {
      resultItem['employmentDetail'] = dataXML.root.employmentDetail;

    } else if (dataId == 'notification-rule') {
      resultItem['notificationRule'] = dataXML.root.notificationRule;

    }

    res.send(resultItem);
  }

}