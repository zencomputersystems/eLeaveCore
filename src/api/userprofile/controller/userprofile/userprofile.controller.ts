import { Controller, UseGuards, Get, Req, Res, Param, Post, Patch } from '@nestjs/common';
import { RolesGuard } from 'src/guard/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Resources } from 'src/decorator/resource.decorator';
import { ResourceDecoratorModel } from 'src/decorator/resource.decorator.model';
import { jsontest } from '../../mockdata/userprofile-list';
import { UserprofileService } from '../../userprofile.service';

@Controller('api/userprofile')
@UseGuards(AuthGuard('jwt'),RolesGuard)
@ApiBearerAuth()
export class UserprofileController {

    constructor(private readonly userprofileService: UserprofileService) {}

    @Get('list')
    @ApiOperation({title: 'Get list of employee'})
    @Resources(new ResourceDecoratorModel('userprofile-list','read'))
    getUserProfiles(@Req() req, @Res() res) {
        this.userprofileService.getData()
            .subscribe(
                data => {
                    return res.send(data.data.resource);
                },
                err => {
                    console.log(err);
                }
            )
    }

    @Get('detail/:id')
    @ApiOperation({title: 'Get profile detail for requested user'})
    @Resources(new ResourceDecoratorModel('userprofile-detail','read'))
    getUserProfile(@Param('id') id, @Req() req,@Res() res) {
        
        //get the requesting user
        const user = req.user;

        this.userprofileService.getDetail(id,user.TENANT_GUID)
            .subscribe(
                data => {
                    res.send(data);
                },
                err => {
                    console.log(err);
                    res.status(500);
                    res.send();
                }
            )
    }

    @Get('me')
    @ApiOperation({title: 'Get profile detail for requesting user'})
    @Resources(new ResourceDecoratorModel('userprofile-detail','read'))
    getOwnUserProfile(@Req() req,@Res() res) {
        
        //get the requesting user
        const user = req.user;

        this.userprofileService.getDetail(req.user.USER_GUID,user.TENANT_GUID)
            .subscribe(
                data => {
                    res.send(data);
                },
                err => {
                    console.log(err);
                    res.status(500);
                    res.send();
                }
            )
    }
  
}
