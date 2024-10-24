import { Module } from '@nestjs/common';
import { MoralisService } from './moralis.service';
import { ConfigurableModuleClass } from '@/modules/moralis/moralis.module-definition';

@Module({
  providers: [MoralisService],
  exports: [MoralisService],
})
export class MoralisModule extends ConfigurableModuleClass {}
