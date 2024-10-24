import { BadRequestError } from '@/common/exceptions';
import { DatabaseService } from '@/modules/database/database.service';
import { MoralisService } from '@/modules/moralis/moralis.service';
import { Injectable } from '@nestjs/common';

const SWAP_FEES = 0.03; // 3%

@Injectable()
export class SwapService {
  constructor(
    private readonly moralis: MoralisService,
    private readonly db: DatabaseService,
  ) {}

  async getSwap(chainId: number, pair: [string, string], amountIn: number) {
    const tokens = await this.validatePair(chainId, pair);
    const [tokenIn, tokenOut] = tokens;

    const tokenPrices = await this.moralis.EvmApi.token.getMultipleTokenPrices(
      {
        chain: chainId.toString(),
      },
      {
        tokens: tokens.map((t) => ({
          tokenAddress: t.address,
        })),
      },
    );

    // TODO: i think it's better to implement trigger in db to always lowercase the address
    const priceIn = tokenPrices.result.find(
      (price) =>
        price.tokenAddress.toLowerCase() === tokenIn.address.toLowerCase(),
    )?.usdPrice;

    const priceOut = tokenPrices.result.find(
      (price) =>
        price.tokenAddress.toLowerCase() === tokenOut.address.toLowerCase(),
    )?.usdPrice;

    const amountOut = (amountIn * priceIn) / priceOut;
    const swapFee = amountIn * SWAP_FEES;
    const swapFeeUsd = swapFee * priceIn;

    return {
      tokenIn,
      tokenOut,
      priceIn,
      priceOut,
      amountIn,
      amountInUsd: amountIn * priceIn,
      amountOut,
      amountOutUsd: amountOut * priceOut,
      swapFee,
      swapFeeUsd,
    };
  }

  private async validatePair(chainId: number, pair: [string, string]) {
    const pairs = await this.db
      .selectFrom('tokens')
      .where('chainId', '=', chainId)
      .where('symbol', 'in', pair)
      .selectAll()
      .execute();

    // Check which token is missing from the database
    const missingTokens = pair.filter(
      (symbol) => !pairs.find((p) => p.symbol === symbol),
    );

    if (missingTokens.length > 0) {
      throw new BadRequestError(
        missingTokens.map((symbol) => ({
          messages: [`Token ${symbol} is not supported on chain id ${chainId}`],
        })),
      );
    }

    // Sort the pairs in the order of the input
    return pairs.sort(
      (a, b) => pair.indexOf(a.symbol) - pair.indexOf(b.symbol),
    );
  }
}
