import { DatabaseService } from '@/modules/database/database.service';
import { MoralisService } from '@/modules/moralis/moralis.service';
import { InjectBullQueue } from '@/modules/queue';
import { getPreviousInterval } from '@/utils';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bullmq';

@Injectable()
export class TokenScheduler {
  constructor(
    private readonly db: DatabaseService,
    private readonly moralis: MoralisService,
    @InjectBullQueue('TOKEN_PRICE') private queue: Queue,
  ) {}

  // @Cron(CronExpression.EVERY_10_SECONDS)
  async getBlockNumber() {
    const datetime = getPreviousInterval(new Date());
    const uniqueChains = await this.db
      .selectFrom('tokens')
      .select(['chainId'])
      .distinct()
      .execute();

    await Promise.all(
      uniqueChains.map(async ({ chainId }) => {
        await this.moralis.getBlockNumber(chainId.toString(), datetime);
      }),
    );

    const tokens = await this.db
      .selectFrom('tokens')
      .select(['id', 'address', 'chainId', 'symbol'])
      .execute();

    const jobData = tokens.map((token) => {
      return {
        data: {
          address: token.address.toLowerCase(),
          chainId: token.chainId.toString(),
          symbol: token.symbol,
          tokenId: token.id,
          datetime,
        },
        opts: {
          jobId: `${token.id}:${datetime.getTime()}`,
        },
        name: 'TokenPrice',
      };
    });

    await this.queue.addBulk(jobData);
  }
}
