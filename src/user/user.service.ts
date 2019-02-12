import { Injectable, HttpService } from '@nestjs/common';
import {DreamFactory} from '../config/dreamfactory';
import CryptoJS = require('crypto-js');

@Injectable()
export class UserService {

    constructor(private readonly httpService: HttpService){}

    //find single user
    public async findOne(email: string,password: string): Promise<any> {

        //url
        const url = DreamFactory.df_host+"user_main?fields=EMAIL%2CUSER_GUID%2CTENANT_GUID&filter=(EMAIL="+email+")AND(PASSWORD="+CryptoJS.SHA256(password.trim()).toString(CryptoJS.enc.Hex)+")";
 
        //call DF to validate the user
        return this.httpService.get(url).toPromise();
        
      }
}
