import { Controller, Req, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('login')
    @UseGuards(AuthGuard('local'))
    public async login(@Req() req) {
        return await this.authService.createToken(req.user);
    }
}
