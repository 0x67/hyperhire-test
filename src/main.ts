import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { exceptionFactory } from '@/common/exceptions';
import { AnyExceptionFilter, HttpExceptionFilter } from '@/common/filters';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';
import compression from '@fastify/compress';
import { createUUID } from '@/utils';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      genReqId: function (req) {
        return (req.headers['x-request-id'] as string) ?? createUUID(7);
      },
      ignoreDuplicateSlashes: true,
      ignoreTrailingSlash: true,
    }),
    {
      bufferLogs: true,
    },
  );

  // register fastify plugins
  await app.register(compression, { encodings: ['br', 'gzip', 'deflate'] });
  app.setGlobalPrefix('api');
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory,
    }),
  );
  app.useGlobalFilters(new AnyExceptionFilter(), new HttpExceptionFilter());

  await app.listen({
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    host: process.env.HOST || '0.0.0.0', // default to all network interfaces
  });
}
bootstrap();
