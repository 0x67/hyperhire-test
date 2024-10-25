import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenScheduler } from './token.scheduler';
import { QueueModule } from '@/modules/queue';
import {
  TokenPriceAlertProcessor,
  TokenPriceProcessor,
} from '@/api/token/processor';
import { TokenController } from './token.controller';

@Module({
  imports: [
    QueueModule.register({
      queues: ['TOKEN_PRICE', 'USER_TOKEN_ALERT', 'SEND_EMAIL'],
    }),
  ],
  providers: [
    TokenScheduler,
    TokenService,
    TokenPriceProcessor,
    TokenPriceAlertProcessor,
  ],
  controllers: [TokenController],
})
export class TokenModule {}
