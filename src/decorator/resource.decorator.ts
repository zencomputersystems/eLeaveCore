import { ReflectMetadata } from '@nestjs/common';
import { ResourceDecoratorModel } from './resource.decorator.model';

export const Resources = (resources: ResourceDecoratorModel) => ReflectMetadata('resources', resources);