import { TokenResponse } from '@/api/token/response';
import { ApiResponseProperty } from '@nestjs/swagger';

export class SwapResponse {
  @ApiResponseProperty({
    type: TokenResponse,
  })
  tokenIn: TokenResponse;
  @ApiResponseProperty({
    type: TokenResponse,
  })
  tokenOut: TokenResponse;

  @ApiResponseProperty()
  priceIn: number;

  @ApiResponseProperty()
  priceOut: number;

  @ApiResponseProperty()
  amountIn: number;

  @ApiResponseProperty()
  amountInUsd: number;

  @ApiResponseProperty()
  amountOut: number;

  @ApiResponseProperty()
  amountOutUsd: number;

  @ApiResponseProperty()
  swapFee: number;

  @ApiResponseProperty()
  swapFeeUsd: number;
}
