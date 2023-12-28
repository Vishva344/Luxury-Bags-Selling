import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const responseBody = {
      statusCode: httpStatus,
      timeStamp: new Date(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
// import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
// import { HttpAdapterHost } from '@nestjs/core';
// import { QueryFailedError } from 'typeorm';

// @Catch()
// export class AllExceptionFilter implements ExceptionFilter {
//   constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

//   catch(exception: unknown, host: ArgumentsHost): void {
//     const { httpAdapter } = this.httpAdapterHost;
//     const ctx = host.switchToHttp();

//     let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
//     let responseBody: any = {
//       statusCode: httpStatus,
//       timeStamp: new Date(),
//       path: httpAdapter.getRequestUrl(ctx.getRequest()),
//     };

//     if (exception instanceof HttpException) {
//       httpStatus = exception.getStatus();
//       responseBody = {
//         statusCode: httpStatus,
//         timeStamp: new Date(),
//         path: httpAdapter.getRequestUrl(ctx.getRequest()),
//         message: exception.message,
//       };
//     } else if (exception instanceof QueryFailedError) {
//       httpStatus = HttpStatus.CONFLICT;
//       responseBody = {
//         statusCode: httpStatus,
//         timeStamp: new Date(),
//         path: httpAdapter.getRequestUrl(ctx.getRequest()),
//         message: 'Duplicate entry. This record already exists.',
//       };
//     }

//     httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
//   }
// }
