import { SendEmailProcessor } from '@/modules/processor/send-email.processor';
import { UserTokenAlertProcessor } from '@/modules/processor/user-token-alert.processor';
import { Module } from '@nestjs/common';

@Module({
  providers: [UserTokenAlertProcessor, SendEmailProcessor],
})
export class ProcessorModule {}
