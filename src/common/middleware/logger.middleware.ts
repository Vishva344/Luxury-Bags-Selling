import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import pino from 'pino';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = pino();

  use(req: Request, res: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length') || '';

      this.logger.info(`${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`);
    });
    next();
  }
}
