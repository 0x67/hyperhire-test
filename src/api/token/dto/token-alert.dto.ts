import { Transform, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class TokenAlertDto {
  tokenId: string;
  price: number;
  timestamp: Date;
}

export class SaveTokenAlertDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsNotEmpty()
  @Type(() => Number)
  chainId: number;

  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsNotEmpty()
  @Type(() => Number)
  threshold: number;
}
