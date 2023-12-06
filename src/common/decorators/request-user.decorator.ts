import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

/**
 *  Description - Request User Decorator
 */
export const RequestUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  console.log(
    '🚀 ~ file: request-user.decorator.ts:9 ~ RequestUser ~ request:',
    request['user'],
    '*********************************************************************',
  );
  return request['user'] as object;
});
