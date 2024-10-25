import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendEmailProcessor } from '@/modules/mail/send-email.processor';

@Module({
  providers: [MailService, SendEmailProcessor],
})
export class MailModule {}
