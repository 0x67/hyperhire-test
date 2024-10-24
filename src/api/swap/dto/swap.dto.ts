import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class SwapParamDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  chainId: number;

  @IsNotEmpty()
  @Transform(({ value }) => {
    const [tokenA, tokenB] = value.toUpperCase().trim().split('_');
    return [tokenA, tokenB] as [string, string];
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  pair: [string, string];
}

export class SwapBodyDto {
  @IsNotEmpty()
  amountIn: number;
}
