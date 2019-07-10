import { ReflectMetadata } from '@nestjs/common';
import { ResourceDecoratorModel } from './resource.decorator.model';

/**
 * Resources
 */
export const Resources = (resources: ResourceDecoratorModel) => ReflectMetadata('resources', resources);
/**
 * Roles
 */
export const Roles = (...roles: string[]) => ReflectMetadata('roles', roles);