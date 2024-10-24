import { InjectQueue, Processor } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { WorkerHostProcessor } from '../../modules/processor/worker-host.processor';
import { Injectable } from '@nestjs/common';
import { TokenPriceDto, QUEUE_TOKEN, InjectBullQueue } from '@/modules/queue';
import { MoralisService } from '@/modules/moralis/moralis.service';
import { DatabaseService } from '@/modules/database/database.service';

@Processor(QUEUE_TOKEN.TOKEN_PRICE)
// @Injectable()
export class TokenPriceProcessor extends WorkerHostProcessor {
  constructor(
    private readonly moralis: MoralisService,
    private readonly db: DatabaseService,
    @InjectQueue('TOKEN_PRICE')
    private readonly tokenAlertQueue: Queue,
  ) {
    console.log(tokenAlertQueue);
    super();
  }

  async process({ data }: Job<TokenPriceDto>) {
    const blockNumber = await this.moralis.getBlockNumber(
      data.chainId,
      data.datetime,
    );
    const price = await this.moralis.EvmApi.token.getTokenPrice({
      address: data.address,
      chain: data.chainId,
      toBlock: blockNumber,
    });

    await this.db
      .insertInto('tokenPrices')
      .values({
        tokenId: data.tokenId,
        price: price.result.usdPrice.toString(),
        timestamp: data.datetime,
      })
      .execute();
  }
}

const flow = {
  name: 'AlertTokenPrice',
  queue: QUEUE_TOKEN.TOKEN_PRICE,
  children: [],
};
