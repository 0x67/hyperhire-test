import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenScheduler } from './token.scheduler';
import { QueueModule, TokenPriceProcessor } from '@/modules/queue';

@Module({
  imports: [
    QueueModule.register({
      queues: ['TOKEN_PRICE', 'USER_TOKEN_ALERT'],
    }),
  ],
  providers: [TokenScheduler, TokenService],
})
export class TokenModule {}
