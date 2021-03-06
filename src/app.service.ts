import { Injectable } from '@nestjs/common';
/**
 * Basic validation to tell the application is running.
 *
 * @export
 * @class AppService
 */
@Injectable()
export class AppService {
  /**
   * Return hello
   *
   * @returns {string}
   * @memberof AppService
   */
  getHello(): string {
    return 'Hello World!';
  }
}
