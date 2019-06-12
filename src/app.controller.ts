import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 *
 *
 * @export
 * @class AppController
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

/**
 * To return Hello
 *
 * @returns {string}
 * @memberof AppController
 */
@Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
