import { Module } from '@nestjs/common';
import { SwapModule } from './swap/swap.module';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SwapModule, TokenModule, UserModule],
})
export class ApiModule {}
