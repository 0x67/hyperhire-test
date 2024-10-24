import { Processor } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { WorkerHostProcessor } from './worker-host.processor';
import { Injectable } from '@nestjs/common';
import { QUEUE_TOKEN } from '@/modules/queue';
import { DatabaseService } from '@/modules/database/database.service';
import { UserTokenAlertDto } from '@/modules/queue/dto/user-token-alert.dto';

@Processor(QUEUE_TOKEN.USER_TOKEN_ALERT)
@Injectable()
export class UserTokenAlertProcessor extends WorkerHostProcessor {
  constructor(private readonly db: DatabaseService) {
    super();
  }

  async process(job: Job<UserTokenAlertDto, unknown, string>) {
    // compare time weighted average of token price within the last 1 hour
  }
}
