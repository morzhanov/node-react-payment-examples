import { createRouteParamDecorator } from '@nestjs/common';
import User from '../../user/user.entity';

export const AuthUser = createRouteParamDecorator((_, req): User => req.user);
