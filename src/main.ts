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
import fastifyCompress from '@fastify/compress';
import fastifyStatic from '@fastify/static';
import { createUUID } from '@/utils';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  // change default logger to pino
  app.useLogger(app.get(Logger));

  // set global prefix ie. /api/:path
  app.setGlobalPrefix('api');

  // register fastify plugins
  await app.register(fastifyCompress, { encodings: ['br', 'gzip', 'deflate'] });
  await app.register(fastifyStatic, {
    root: '/api',
  });

  // register global pipes, filters, and interceptors
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory,
    }),
  );
  app.useGlobalFilters(new AnyExceptionFilter(), new HttpExceptionFilter());

  // setup swagger
  const config = new DocumentBuilder()
    .setTitle('Hyperhire Test')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen({
    port: process.env.PORT ? parseInt(process.env.PORT) : 3001,
    host: process.env.HOST || '0.0.0.0', // default to all network interfaces
  });
}
bootstrap();
