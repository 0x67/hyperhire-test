import { GetTokenPriceParams } from '@/api/token/dto';
import { TokenService } from '@/api/token/token.service';
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('tokens')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  async listTokens(@Query('chainId') chainId?: string) {
    return await this.tokenService.listTokens(parseInt(chainId));
  }

  @Get(':chainId/:symbol/prices')
  async getTokenPriceHistory(
    @Param() { symbol, chainId }: GetTokenPriceParams,
  ) {
    return await this.tokenService.getTokenPriceHistory(symbol, chainId);
  }
}
