import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RealIp = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const forwarded = request.headers['x-forwarded-for'];
    return forwarded ? forwarded.split(',')[0] : request.connection.remoteAddress;
  },
);
