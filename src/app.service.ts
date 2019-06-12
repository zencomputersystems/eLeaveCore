import { Injectable } from '@nestjs/common';
/**
 * Basic validation to tell the application is running.
 *
 * @export
 * @class AppService
 */
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
