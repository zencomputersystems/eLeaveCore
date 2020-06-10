import { Controller, Post, Param, Req, Res } from '@nestjs/common';
import { ApiImplicitParam, ApiOperation } from '@nestjs/swagger';
import { DefaultProfileService } from './default-profile.service';

@Controller('api/default-profile')
export class DefaultProfileController {
  constructor(private readonly defaultProfileService: DefaultProfileService) { }

  @Post('/:tenantId')
  @ApiOperation({ title: 'Create default profile for this tenant' })
  @ApiImplicitParam({ name: 'tenantId', description: 'Tenant guid', required: true })
  createDefaultProfile(@Param() param, @Req() req, @Res() res) {

    this.defaultProfileService.createDefaultProfile(param.tenantId).subscribe(
      data => { res.send(data); },
      err => { res.send(err); }
    );

  }

}