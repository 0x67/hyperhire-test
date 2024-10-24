import { createUUID } from '@/utils';
import { IncomingMessage } from 'http';
import { Params } from 'nestjs-pino';
import { LevelWithSilent } from 'pino';
import { PrettyOptions } from 'pino-pretty';

/**
 * Levels to number mapping:
 * ref: https://github.com/pinojs/pino/blob/main/docs/api.md#loggerlevel-string-gettersetter
 * 10: 'trace',
 * 20: 'debug',
 * 30: 'info',
 * 40: 'warn',
 * 50: 'error',
 * 60: 'fatal',
 */
export const loggerConfig: Params = {
  pinoHttp: {
    timestamp: () => `,"timestamp":"${new Date().toUTCString()}"`,
    customLogLevel: function (_, res, err): LevelWithSilent {
      if (res.statusCode === 401 || res.statusCode === 403) {
        // Log as 'warn' for unauthorized or forbidden responses
        return 'warn';
      } else if (res.statusCode >= 400 && res.statusCode < 500) {
        // Other client errors as 'error'
        return 'error';
      } else if (res.statusCode >= 500 || err) {
        // Server errors or if an error object is present, log as 'fatal'
        return 'fatal';
      } else if (res.statusCode >= 300 && res.statusCode < 400) {
        // Silence logs for redirection responses
        return 'silent';
      } else if (res.statusCode >= 200 && res.statusCode < 300) {
        // Success responses as 'info'
        return 'info';
      }
      // Default to 'debug' for any other cases
      return 'debug';
    },
    customProps: (req: IncomingMessage) => {
      return {
        correlation_id: req.id,
        environment: process.env.NODE_ENV,
      };
    },
    genReqId: function (req) {
      return (
        (req.headers['x-request-id'] as string) ??
        req.headers['x-amzn-trace-id'] ??
        req.headers['x-correlation-id'] ??
        createUUID()
      );
    },
    redact: [
      'req.headers.authorization',
      'req.headers.cookie',
      'req.headers["set-cookie"]',
    ],
    serializers: {
      req(req) {
        return {
          headers: req.headers,
          method: req.method,
          url: req.url,
          query: req.query,
          hostname: req.hostname,
          ip: req.ip,
          remoteAddress: req.remoteAddress,
          remotePort: req.remotePort,
        };
      },
      res(res) {
        return {
          id: res.id,
          statusCode: res.statusCode,
        };
      },
      err: (err) => err?.stack,
    },
    messageKey: 'message',
    transport:
      process.env.NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              crlf: true,
            } as PrettyOptions,
          }
        : undefined, // TODO: setup streams to elastic search
  },
};
