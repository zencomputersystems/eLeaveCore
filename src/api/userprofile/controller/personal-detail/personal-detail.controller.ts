import { Controller, UseGuards, Get, Req, Res } from '@nestjs/common';
import { RolesGuard } from 'src/guard/role.guard';
import { Resources } from 'src/decorator/resource.decorator';
import { ResourceDecoratorModel } from 'src/decorator/resource.decorator.model';

@Controller('personal-detail')
@UseGuards(RolesGuard)
export class PersonalDetailController {

    @Resources(new ResourceDecoratorModel('personalDetail','edit'))
    @Get()
    findAll(@Req() req,@Res() res) {
        res.send("success");
    }
}
