import { SetMetadata } from '@nestjs/common';
import { ResourceDecoratorModel } from './resource.decorator.model';

/**
 * Resources
 */
export const Resources = (resources: ResourceDecoratorModel) => SetMetadata('resources', resources);
/**
 * Roles
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);