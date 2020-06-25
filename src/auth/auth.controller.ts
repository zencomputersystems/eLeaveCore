import { Controller, Req, Post, UseGuards, Body, Param, Res, UnauthorizedException, HttpService, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { ADAuthGuard } from './passport/ad-extend';
import { ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { ProfileDefaultDbService } from 'src/admin/profile-default/profile-default.db.service';
import { map, mergeMap } from 'rxjs/operators';
import { Response } from 'express';
import { AuthDbService } from './auth.db.service';
/** atob decryption */
var atob = require('atob');
/** dot env library */
const dotenv = require('dotenv');
dotenv.config();
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
        private readonly authService: AuthService,
        private readonly profileDefaultDbService: ProfileDefaultDbService,
        private readonly httpService: HttpService,
        private readonly authDbService: AuthDbService
    ) { }

    // /**
    //  * Login api
    //  *
    //  * @param {LoginDto} loginDTO
    //  * @param {*} req
    //  * @returns
    //  * @memberof AuthController
    //  */
    // @Post('login')
    // @ApiOperation({ title: 'Login' })
    // @UseGuards(AuthGuard('ad'))
    // public async login(@Body() loginDTO: LoginDto, @Req() req) {
    //     // console.log(req.user);
    //     return await this.authService.createToken([req.user, 'ad']);
    //     //return this.ad(loginDTO,req);
    // }

    /**
     * Login for ad and local merged
     *
     * @param {LoginDto} loginDTO
     * @param {*} req
     * @param {Response} result
     * @memberof AuthController
     */
    @Post('login')
    @ApiOperation({ title: 'Login and verify' })
    public checkLoginType(@Body() loginDTO: LoginDto, @Req() req, @Res() result: Response) {
        loginDTO.password = atob(loginDTO.password);

        let baseUrlLogin = process.env.URL_API + '/api/auth/login/';
        // let baseUrlLogin = 'http://localhost:3000/api/auth/login/';
        let urlAD = baseUrlLogin + 'ad';
        let urlLocal = baseUrlLogin + 'email';
        // console.log(urlAD + '-' + urlLocal);
        // console.log(loginDTO.email + '-' + loginDTO.password);

        this.authService.userService.findByFilterV2(['EMAIL', 'TENANT_GUID'], [`(LOGIN_ID=${loginDTO.email})`]).pipe(
            mergeMap(res => {
                return this.profileDefaultDbService.findByFilterV2([], [`(TENANT_GUID=${res[0].TENANT_GUID})`]);
                // return this.authDbService.findByFilterV2([], [`(SUBSCRIPTION_GUID=${res[0].TENANT_GUID})`]);
            })
        ).subscribe(
            async data => {
                let url = '';
                if (data[0].LOGIN_TYPE == 'ad') {
                    url = urlAD;
                }
                else if (data[0].LOGIN_TYPE == 'local') {
                    url = urlLocal;
                }

                this.httpService.post(url, loginDTO).subscribe(
                    data => {
                        result.send(data.data);
                    }, err => {
                        result.status(HttpStatus.UNAUTHORIZED).send(new UnauthorizedException('Invalid Credential'));
                    }
                );

            },
            err => {
                result.status(HttpStatus.UNAUTHORIZED).send(new UnauthorizedException('Invalid Credential'));
            }
        );
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
        // console.log('ad');
        // console.log(loginDTO);
        // console.log(req.user);
        return await this.authService.createToken([req.user, 'ad']);
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

        return await this.authService.createToken([req.user, 'local']);
    }

    // @Post('login/verify')
    // @ApiOperation({ title: 'Login and verify' })
    // @UseGuards(AuthGuard('ad'))
    // public async checkLoginType(@Body() loginDTO: LoginDto, @Req() req, @Res() result: Response) {
    //     // return await result.redirect(this.ad(loginDTO, req1).toString());
    //     try {
    //         this.authService.userService.findByFilterV2(['EMAIL', 'TENANT_GUID'], [`(LOGIN_ID=${loginDTO.email})`]).pipe(map(res => {
    //             return this.profileDefaultDbService.findByFilterV2([], [`(TENANT_GUID=${res[0].TENANT_GUID})`]);
    //         }), mergeMap(res => {
    //             return res;
    //         }), map(async res => {
    //             if (res[0].LOGIN_TYPE == 'ad') {
    //                 return this.ad(loginDTO, req);
    //             }
    //             else if (res[0].LOGIN_TYPE == 'local') {
    //                 return this.local(loginDTO, req);
    //             }
    //         })).subscribe(
    //             async data => { console.log(await data); },
    //             err => { console.log(err); }
    //         );

    //     } catch (error) {
    //         result.send(error);
    //     }
    // }



}
