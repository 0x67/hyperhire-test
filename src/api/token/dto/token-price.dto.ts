import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TokenPriceDto {
  address: string;
  symbol: string;
  chainId: string;
  tokenId: string;
  datetime: Date;
}

export class GetTokenPriceChartParams {
  /**
   * @example 1
   */
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  chainId: number;

  /**
   * @example 'ETH'
   */
  @IsNotEmpty()
  @IsString()
  symbol: string;
}
