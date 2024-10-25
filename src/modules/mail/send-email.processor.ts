import { Processor } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { WorkerHostProcessor } from '../processor/worker-host.processor';
import { Injectable } from '@nestjs/common';
import { QUEUE_TOKEN, SendEmailDto } from '@/modules/queue';
import { DatabaseService } from '@/modules/database/database.service';
import { MailService } from '@/modules/mail/mail.service';

@Processor(QUEUE_TOKEN.SEND_EMAIL)
@Injectable()
export class SendEmailProcessor extends WorkerHostProcessor {
  constructor(
    private readonly db: DatabaseService,
    private readonly mailService: MailService,
  ) {
    super();
  }

  async process(job: Job<SendEmailDto, unknown, string>) {
    const { data } = job;

    await this.mailService.sendMail({
      to: data.to,
      subject: data.subject,
      content: data.content,
    });
  }
}
