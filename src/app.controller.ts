import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Controller for app
 *
 * @export
 * @class AppController
 */
@Controller()
export class AppController {
  /**
   *Creates an instance of AppController.
   * @param {AppService} appService Service for app
   * @memberof AppController
   */
  constructor(private readonly appService: AppService) { }

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
