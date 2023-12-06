import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { Response } from 'express';
import { Observable, map } from 'rxjs';
import pinoLogger from 'src/config/logger.config';
import { CommonResponse } from '../types/common-response.type';

@Injectable()
export class ResponseInterceptorsService implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((sentResponse: CommonResponse<any>) => {
        pinoLogger.info(sentResponse);

        if (sentResponse?.status) {
          response.status(sentResponse.statusCode);
        }
        return sentResponse;
      }),
    );
  }
}
