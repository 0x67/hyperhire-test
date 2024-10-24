import { Processor } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { WorkerHostProcessor } from './worker-host.processor';
import { Injectable } from '@nestjs/common';
import { QUEUE_TOKEN, SendEmailDto } from '@/modules/queue';
import { DatabaseService } from '@/modules/database/database.service';

@Processor(QUEUE_TOKEN.SEND_EMAIL)
@Injectable()
export class SendEmailProcessor extends WorkerHostProcessor {
  constructor(private readonly db: DatabaseService) {
    super();
  }

  async process(job: Job<SendEmailDto, unknown, string>) {}
}
