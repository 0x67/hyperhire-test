import { InjectQueue, Processor } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { WorkerHostProcessor } from '../../../modules/processor/worker-host.processor';
import { Injectable } from '@nestjs/common';
import { InjectBullQueue, QUEUE_TOKEN } from '@/modules/queue';
import { MoralisService } from '@/modules/moralis/moralis.service';
import { DatabaseService } from '@/modules/database/database.service';
import { TokenAlertDto, TokenPriceDto } from '@/api/token/dto';
import { TokenService } from '@/api/token/token.service';

@Processor(QUEUE_TOKEN.TOKEN_PRICE, { concurrency: 10 })
@Injectable()
export class TokenPriceProcessor extends WorkerHostProcessor {
  constructor(
    private readonly moralis: MoralisService,
    private readonly db: DatabaseService,
    private readonly tokenService: TokenService,
    @InjectBullQueue(QUEUE_TOKEN.TOKEN_PRICE)
    private readonly tokenPriceQueue: Queue,
  ) {
    super();
  }

  async process(
    job: Job<any, unknown, 'TokenPrice' | 'HyperHireAlert' | 'UserAlert'>,
  ) {
    const { name, data } = job;

    switch (name) {
      case 'TokenPrice':
        return await this.saveTokenPrice(data);
      case 'HyperHireAlert':
        return await this.hyperHireAlert(data);
      case 'UserAlert':
        return await this.userAlert(data);
      default:
        throw new Error(
          `Uknown job name: ${name} for Queue: ${QUEUE_TOKEN.TOKEN_PRICE}`,
        );
    }
  }

  private async saveTokenPrice(data: TokenPriceDto) {
    const exist = await this.tokenService.getTokenPrice(
      data.tokenId,
      data.datetime,
    );

    // If the token price already exists, skip the processing
    if (exist) {
      return;
    }

    const blockNumber = await this.moralis.getBlockNumber(
      data.chainId,
      data.datetime,
    );

    const price = await this.moralis.EvmApi.token.getTokenPrice({
      address: data.address,
      chain: data.chainId,
      toBlock: blockNumber,
    });

    await this.tokenService.saveTokenPrice({
      tokenId: data.tokenId,
      price: price.result.usdPrice.toString(),
      blockNumber: blockNumber.toString(),
      timestamp: data.datetime,
    });

    // await this.createAlertQueue({
    //   tokenId: data.tokenId,
    //   price: price.result.usdPrice,
    //   timestamp: data.datetime,
    // });
  }

  private async hyperHireAlert({ tokenId, price, timestamp }: TokenAlertDto) {}

  private async userAlert({ tokenId, price, timestamp }: TokenAlertDto) {
    const users = await this.db
      .selectFrom('alertSettings')
      .innerJoin('alerts', 'alertSettings.alertId', 'alerts.id')
      .select(['tokenId', 'threshold', 'alerts.email'])
      .where('tokenId', '=', tokenId);
    // .where('threshold', '<=', price);
  }

  private async createAlertQueue({ tokenId, price, timestamp }: TokenAlertDto) {
    await this.tokenPriceQueue.add('HyperHireAlert', {
      tokenId,
      price,
      timestamp,
    });

    await this.tokenPriceQueue.add('UserAlert', {
      tokenId,
      price,
      timestamp,
    });
  }
}
