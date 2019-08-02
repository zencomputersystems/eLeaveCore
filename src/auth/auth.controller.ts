import { Controller, Req, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { ADAuthGuard } from './passport/ad-extend';
import { ApiOperation } from '@nestjs/swagger';

/**
 * Controller for auth
 *
 * @export
 * @class AuthController
 */
@Controller('api/auth')
export class AuthController {

    /**
     *Creates an instance of AuthController.
     * @param {AuthService} authService
     * @memberof AuthController
     */
    constructor(
        private readonly authService: AuthService
    ) { }

    /**
     * Login api
     *
     * @param {LoginDto} loginDTO
     * @param {*} req
     * @returns
     * @memberof AuthController
     */
    @Post('login')
    @ApiOperation({ title: 'Login' })
    @UseGuards(AuthGuard('ad'))
    public async login(@Body() loginDTO: LoginDto, @Req() req) {

        return await this.authService.createToken(req.user);
        //return this.ad(loginDTO,req);
    }

    /**
     * ad
     *
     * @param {LoginDto} loginDTO
     * @param {*} req
     * @returns
     * @memberof AuthController
     */
    @Post('login/ad')
    @ApiOperation({ title: 'Login ad' })
    @UseGuards(AuthGuard('ad'))
    public async ad(@Body() loginDTO: LoginDto, @Req() req) {

        return await this.authService.createToken(req.user);
    }

    /**
     * local
     *
     * @param {LoginDto} loginDTO
     * @param {*} req
     * @returns
     * @memberof AuthController
     */
    @Post('login/email')
    @ApiOperation({ title: 'Login email' })
    @UseGuards(AuthGuard('local'))
    public async local(@Body() loginDTO: LoginDto, @Req() req) {

        return await this.authService.createToken(req.user);
    }
}
