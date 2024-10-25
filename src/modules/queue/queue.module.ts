import { DynamicModule, Module } from '@nestjs/common';
import {
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from '@/modules/queue/queue.module-definition';
import { BullModule } from '@nestjs/bullmq';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { DEFAULT_BULL_OPTIONS } from '@/configs';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: (redisService: RedisService) => {
        const redis = redisService.getOrThrow('queue');

        return {
          connection: redis,
          defaultJobOptions: DEFAULT_BULL_OPTIONS,
        };
      },
      inject: [RedisService],
    }),
  ],
})
export class QueueModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const bullModules = options.queues.map((name) =>
      BullModule.registerQueue({ name }),
    );

    const flowProducers = (options.flows || []).map((flow) =>
      BullModule.registerFlowProducer({
        name: flow,
      }),
    );

    return {
      ...super.register(options),
      imports: [...bullModules, ...flowProducers],
      exports: [...bullModules, ...flowProducers],
    };
  }
}
