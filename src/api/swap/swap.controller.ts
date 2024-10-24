import { SwapParamDto, SwapBodyDto } from '@/api/swap/dto';
import { SwapService } from '@/api/swap/swap.service';
import { Body, Controller, Param, Post } from '@nestjs/common';

@Controller('swap')
export class SwapController {
  constructor(private readonly swapService: SwapService) {}

  @Post('/:chainId/:pair')
  async getSwap(
    @Param() { pair, chainId }: SwapParamDto,
    @Body() { amountIn }: SwapBodyDto,
  ) {
    return await this.swapService.getSwap(chainId, pair, amountIn);
  }
}
