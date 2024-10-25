import { Module } from '@nestjs/common';
import { ApiModule } from '@/api/api.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { loggerConfig } from '@/configs';
import { RedisModule, RedisService } from '@liaoliaots/nestjs-redis';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';
import { DatabaseModule } from './modules/database/database.module';
import { MoralisModule } from './modules/moralis/moralis.module';
import { ProcessorModule } from '@/modules/processor/processor.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    LoggerModule.forRoot(loggerConfig),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          commonOptions: {
            url: config.get<string>('REDIS_URL'),
            host: config.get<string>('REDIS_HOST'),
            port: config.get<number>('REDIS_PORT'),
            username: config.get<string>('REDIS_USERNAME'),
            password: config.get<string>('REDIS_PASSWORD'),
            // tls: {},
          },
          config: [
            {
              namespace: 'queue',
              db: 0,
              // bull specific options
              maxRetriesPerRequest: null,
            },
            {
              namespace: 'cache',
              db: 1,
            },
          ],
          readyLog: true,
        };
      },
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService, RedisService],
      useFactory: async (config: ConfigService, redis: RedisService) => {
        const client = redis.getOrThrow('cache');
        const store = await redisStore({ ...client.options });

        return {
          ttl: config.get<number>('CACHE_TTL') ?? 1000 * 5, // 5 seconds in milliseconds
          max: config.get<number>('CACHE_MAX') ?? 1000,
          store: store,
        };
      },
    }),
    PrismaModule,
    DatabaseModule,
    MoralisModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        isGlobal: true,
        apiKey: config.get<string>('MORALIS_API_KEY'),
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    ApiModule,
    ProcessorModule,
  ],
})
export class AppModule {}
