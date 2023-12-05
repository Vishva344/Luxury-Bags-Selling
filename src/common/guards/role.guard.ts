import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { RequestWithPayload } from '../types/jwt-payload.type';
import { errorMessages } from 'src/config/messages.config';

/**
 * Description - Role Guard
 */
@Injectable()
export class RoleGuard implements CanActivate {
  /**
   * Description - Role Guard Dependencies
   * @param reflector
   */
  constructor(private readonly reflector: Reflector) {}

  /**
   * Description - Check role
   * @param context
   * @returns
   */
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) return true;

    console.log(
      '🚀 ~ file: role.guard.ts:26 ~ RoleGuard ~ canActivate ~ requiredRoles:',
      !requiredRoles,
      '##############################',
    );

    const request = context.switchToHttp().getRequest<RequestWithPayload>();
    const user = request.user;
    if (!requiredRoles.includes(user.role))
      throw new UnauthorizedException(errorMessages.PERMISSION_DENIED);

    return true;
  }
}
