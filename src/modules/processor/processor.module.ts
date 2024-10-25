import { SendEmailProcessor } from '@/modules/processor/send-email.processor';
import { Module } from '@nestjs/common';

@Module({
  providers: [SendEmailProcessor],
})
export class ProcessorModule {}
