import { Controller, Req, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { ADAuthGuard } from './passport/ad-extend';
import { AuthGuards } from './passport/authGuards';

@Controller('api/auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('login')
    @UseGuards(AuthGuard('local'))
    public async login(@Body() loginDTO: LoginDto,@Req() req) {

        return await this.authService.createToken(req.user);
    }
}
