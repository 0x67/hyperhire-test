import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TokenPriceDto {
  address: string;
  symbol: string;
  chainId: string;
  tokenId: string;
  datetime: Date;
}

export class GetTokenPriceParams {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  chainId: number;

  @IsNotEmpty()
  @IsString()
  symbol: string;
}
