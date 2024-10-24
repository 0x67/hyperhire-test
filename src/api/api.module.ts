import { Module } from '@nestjs/common';
import { SwapModule } from './swap/swap.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [SwapModule, TokenModule],
})
export class ApiModule {}
