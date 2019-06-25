import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, UseGuards } from '@nestjs/common';


/**
 * Controller for user
 *
 * @export
 * @class UserController
 */
@Controller('api/admin/user')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserController {
}
