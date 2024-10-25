import { SwapParamDto, SwapBodyDto } from '@/api/swap/dto';
import { SwapResponse } from '@/api/swap/response';
import { SwapService } from '@/api/swap/swap.service';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller('swap')
export class SwapController {
  constructor(private readonly swapService: SwapService) {}

  @Post('/:chainId/:pair')
  @ApiResponse({
    description: 'Swap information',
    type: SwapResponse,
  })
  async getSwap(
    @Param() { pair, chainId }: SwapParamDto,
    @Body() { amountIn }: SwapBodyDto,
  ) {
    return await this.swapService.getSwap(chainId, pair, amountIn);
  }
}
