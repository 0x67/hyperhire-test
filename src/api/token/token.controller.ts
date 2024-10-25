import {
  GetTokenPriceChartParams,
  ListTokenQuery,
  SaveTokenAlertDto,
} from '@/api/token/dto';
import {
  TokenAlertResponse,
  TokenPriceChartResponse,
  TokenResponse,
} from '@/api/token/response';
import { TokenService } from '@/api/token/token.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller('tokens')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  @ApiResponse({
    description: 'Get list of tokens',
    type: TokenResponse,
    isArray: true,
  })
  async listTokens(@Query() { chainId }: ListTokenQuery) {
    return await this.tokenService.listTokens(chainId);
  }

  @Get(':chainId/:symbol/prices')
  @ApiResponse({
    description:
      'Get token price history, if dataset is not available, it will return empty array',
    type: TokenPriceChartResponse,
    isArray: true,
  })
  async getTokenPriceHistory(
    @Param() { symbol, chainId }: GetTokenPriceChartParams,
  ) {
    return (await this.tokenService.getTokenPriceHistory(
      symbol,
      chainId,
    )) as TokenPriceChartResponse[];
  }

  @Post('alert')
  @ApiResponse({
    description: 'Save token alert',
    type: TokenAlertResponse,
  })
  async saveTokenAlert(@Body() data: SaveTokenAlertDto) {
    return await this.tokenService.saveTokenAlert(data);
  }
}
