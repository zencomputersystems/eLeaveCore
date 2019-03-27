import { Controller, Req, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { ADAuthGuard } from './passport/ad-extend';

@Controller('api/auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @Post('login')
    @UseGuards(AuthGuard('ad'))
    public async login(@Body() loginDTO: LoginDto,@Req() req) {

        return await this.authService.createToken(req.user);
        //return this.ad(loginDTO,req);
    }

    @Post('login/ad')
    @UseGuards(AuthGuard('ad'))
    public async ad(@Body() loginDTO: LoginDto,@Req() req) {

        return await this.authService.createToken(req.user);
    }

    @Post('login/email')
    @UseGuards(AuthGuard('local'))
    public async local(@Body() loginDTO: LoginDto,@Req() req) {

        return await this.authService.createToken(req.user);
    }
}
