import { Transform, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class TokenAlertDto {
  tokenId: string;
  price: number;
  timestamp: Date;
}

export class SaveTokenAlertDto {
  /**
   * @example yourname@mail.com
   */
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  /**
   * @example 1
   */
  @IsNotEmpty()
  @Type(() => Number)
  chainId: number;

  /**
   * @example 'ETH'
   */
  @IsNotEmpty()
  @IsString()
  symbol: string;

  /**
   * Threshold price in USD
   * @example 100
   */
  @IsNotEmpty()
  @Type(() => Number)
  threshold: number;
}
