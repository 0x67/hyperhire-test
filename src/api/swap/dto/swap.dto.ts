import { ApiProperty } from '@nestjs/swagger';
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
  /**
   * @example 1
   */
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  chainId: number;

  @ApiProperty({
    example: 'ETH_BTC',
    description:
      'Pair of tokens to swap, left side is tokenIn, right side is tokenOut',
    type: String,
  })
  @IsNotEmpty()
  @Transform(({ value }) => {
    console.log(value);
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
  /**
   * @example 100
   */
  @IsNotEmpty()
  amountIn: number;
}
