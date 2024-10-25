import { InjectQueue, Processor } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { WorkerHostProcessor } from '../../../modules/processor/worker-host.processor';
import { Injectable } from '@nestjs/common';
import { InjectBullQueue, QUEUE_TOKEN } from '@/modules/queue';
import { MoralisService } from '@/modules/moralis/moralis.service';
import { DatabaseService } from '@/modules/database/database.service';
import { TokenAlertDto, TokenPriceDto } from '@/api/token/dto';
import { TokenService } from '@/api/token/token.service';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { subHours } from 'date-fns';
import { MailService } from '@/modules/mail/mail.service';
import { dateToTimestamp } from '@/utils';

const HYPERHIRE_EMAIL = 'hyperhire_assignment@hyperhire.in';

@Processor(QUEUE_TOKEN.TOKEN_PRICE, { concurrency: 10 })
@Injectable()
export class TokenPriceProcessor extends WorkerHostProcessor {
  constructor(
    private readonly moralis: MoralisService,
    private readonly prisma: PrismaService,
    private readonly db: DatabaseService,
    private readonly tokenService: TokenService,
    @InjectBullQueue(QUEUE_TOKEN.TOKEN_PRICE)
    private readonly tokenPriceQueue: Queue,
    @InjectBullQueue(QUEUE_TOKEN.SEND_EMAIL)
    private readonly sendEmailQueue: Queue,
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

    await this.createAlertQueue({
      tokenId: data.tokenId,
      price: price.result.usdPrice,
      timestamp: data.datetime,
    });
  }

  private async hyperHireAlert({ tokenId, price, timestamp }: TokenAlertDto) {
    // check average price of the token within the last 1 hour before the timestamp
    timestamp = new Date(timestamp);

    const averagePriceResult = await this.prisma.tokenPrice.aggregate({
      where: {
        tokenId,
        timestamp: {
          gte: subHours(timestamp, 1),
          lte: timestamp,
        },
      },
      _avg: {
        price: true,
      },
    });

    const token = await this.tokenService.getTokenById(tokenId);

    if (averagePriceResult && averagePriceResult._avg.price !== null) {
      const averagePrice = averagePriceResult._avg.price.toNumber();

      const priceIncrease = ((price - averagePrice) / averagePrice) * 100;

      if (priceIncrease > 3) {
        this.logger.log(
          `Token ${tokenId} has increased by more than 3% in the last 1 hour`,
        );

        await this.sendEmailQueue.add(
          'SendEmail',
          {
            to: HYPERHIRE_EMAIL,
            subject: 'Token Alert',
            content: `Token ${token.symbol} on chain ${token.chainId} has increased by more than 3% in the last 1 hour`,
          },
          {
            jobId: `${HYPERHIRE_EMAIL}:${tokenId}:${dateToTimestamp(timestamp)}`,
          },
        );
      }
    }
  }

  private async userAlert({ tokenId, price, timestamp }: TokenAlertDto) {
    const token = await this.tokenService.getTokenById(tokenId);
    const users = await this.db
      .selectFrom('alertSettings')
      .innerJoin('alerts', 'alertSettings.alertId', 'alerts.id')
      .select(['tokenId', 'threshold', 'alerts.email'])
      .where('tokenId', '=', tokenId)
      .where('threshold', '<=', price.toString())
      .execute();

    // Send email to users
    const alerts = users.map((user) => ({
      to: user.email,
      subject: 'Token Alert',
      content: `Token ${token.symbol} on chain ${token.chainId} has reached the threshold price of $${user.threshold}`,
    }));

    await this.sendEmailQueue.addBulk(
      alerts.map((alert) => ({
        name: 'SendEmail',
        data: alert,
        opts: {
          jobId: `${alert.to}:${tokenId}:${dateToTimestamp(timestamp)}`,
        },
      })),
    );
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
