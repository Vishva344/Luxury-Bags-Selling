import pino, { LoggerOptions } from 'pino';
import { rotatingFile } from '@vrbo/pino-rotating-file';
import * as path from 'path';

const logsPath = path.join(path.resolve(), './logs/');

const pinoOptions: LoggerOptions = {
  level: 'debug',
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: ['req.headers.authorization', 'req.body.password'],
  formatters: {
    level(label) {
      return { level: label };
    },
  },
  serializers: {
    req(req) {
      return {
        method: req.method,
        url: req.url,
        headers: req.headers,
      };
    },
    res(res) {
      return {
        statusCode: res.statusCode,
      };
    },
    err(err) {
      return pino.stdSerializers.err(err);
    },
  },
};

const pinoLogger = pino(
  pinoOptions,
  rotatingFile({
    base: logsPath,
    size: '1m',
    maxFiles: 7,
    compress: true,
    interval: '1d',
    rotateExisting: true,
    template: '%Y-%m-%d.log',
  }),
);

export default pinoLogger;
