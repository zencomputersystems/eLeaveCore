import { Controller, Post, Param, Req, Res, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiImplicitParam, ApiOperation } from '@nestjs/swagger';
import { DefaultProfileService } from './default-profile.service';
import { Resource } from 'src/common/model/resource.model';
import { ProfileDefaultDbService } from '../profile-default/profile-default.db.service';
import { mergeMap } from 'rxjs/operators';

@Controller('api/default-profile')
export class DefaultProfileController {
  constructor(private readonly defaultProfileService: DefaultProfileService,
    private readonly profileDefaultDbService: ProfileDefaultDbService
  ) { }

  @Post('/:tenantId')
  @ApiOperation({ title: 'Create default profile for this tenant' })
  @ApiImplicitParam({ name: 'tenantId', description: 'Tenant guid', required: true })
  createDefaultProfile(@Param() param, @Req() req, @Res() res) {

    this.defaultProfileService.createDefaultProfile(param.tenantId).subscribe(
      data => {

        let roleId = data[0][0].ROLE_GUID;
        let workingHoursId = data[1][0].WORKING_HOURS_GUID;
        let calendarId = data[3][0].CALENDAR_GUID;

        this.storeDefaultSettingTenant([param.tenantId, calendarId, workingHoursId, roleId]);
        res.send(data);
      },
      err => { res.send(err); }
    );

  }

  @Post(':tenantId/:userId')
  @ApiOperation({ title: 'Assign default to first eleave user' })
  @ApiImplicitParam({ name: 'tenantId', description: 'Tenant guid', required: true })
  @ApiImplicitParam({ name: 'userId', description: 'User guid', required: true })
  assignDefaultData(@Param() param, @Req() req, @Res() res) {
    this.defaultProfileService.assignDefaultToUser([param.tenantId, param.userId]).subscribe(
      data => {
        // if (data.length > 0) {
        // console.log(data);
        res.send(data);
        // } else {
        //   res.status(HttpStatus.NOT_FOUND).send(new NotFoundException('Data not found'));
        // }
      },
      err => { res.send(err); }
    );
  }

  @Post(':tenantId/:companyName/:userId')
  @ApiOperation({ title: 'Create company policy' })
  @ApiImplicitParam({ name: 'tenantId', description: 'Tenant id', required: true })
  @ApiImplicitParam({ name: 'companyName', description: 'Company name', required: true })
  @ApiImplicitParam({ name: 'userId', description: 'User id', required: true })
  createCompanyPolicy(@Param() params, @Req() req, @Res() res) {
    let companyId;
    this.defaultProfileService.defaultCompanyPolicy([params.tenantId, params.companyName, params.userId]).pipe(
      mergeMap(res => {
        console.log(res.data.resource[0].TENANT_COMPANY_GUID);
        companyId = res.data.resource[0].TENANT_COMPANY_GUID;
        return this.defaultProfileService.assignCompanyToUser([params.userId, res.data.resource[0].TENANT_COMPANY_GUID]);
      }), mergeMap(res => {
        return this.defaultProfileService.createPolicy([params.tenantId, params.userId, companyId]);
      })
    ).subscribe(
      data => { res.send(data.data.resource) },
      err => { res.send(err); }
    );
  }

  public storeDefaultSettingTenant([tenantId, calendarId, workingHoursId, roleId]: [any, any, any, any]) {
    let resource = new Resource(new Array());
    let data = {};
    data['TENANT_GUID'] = tenantId;
    data['CALENDAR_PROFILE_GUID'] = calendarId;
    data['WORKING_HOURS_PROFILE_GUID'] = workingHoursId;
    data['ROLE_PROFILE_GUID'] = roleId;
    data['LOGIN_TYPE'] = 'local';
    resource.resource.push(data);

    this.profileDefaultDbService.createByModel(resource, [], [], []).subscribe(
      data => { console.log('data.data.resource'); },
      err => { console.log('err'); }
    );
  }

}