import { SaveTokenAlertDto } from '@/api/token/dto';
import { DatabaseService } from '@/modules/database/database.service';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class TokenService {
  constructor(
    @InjectPinoLogger(TokenService.name) private readonly logger: PinoLogger,
    private readonly prisma: PrismaService,
    private readonly db: DatabaseService,
  ) {}

  async getTokenPrice(tokenId: string, timestamp: Date) {
    return await this.db
      .selectFrom('tokenPrices')
      .select(['price'])
      .where('tokenId', '=', tokenId)
      .where('timestamp', '=', timestamp)
      .executeTakeFirst();
  }

  async saveTokenPrice(data: {
    tokenId: string;
    price: string;
    blockNumber: string;
    timestamp: Date;
  }) {
    return await this.db.insertInto('tokenPrices').values(data).execute();
  }

  async listTokens(chainId?: number) {
    let query = this.db.selectFrom('tokens').selectAll();

    if (chainId) {
      query = query.where('chainId', '=', chainId);
    }

    return await query.execute();
  }

  async getToken(symbol: string, chainId: number) {
    return await this.db
      .selectFrom('tokens')
      .select(['id'])
      .where('symbol', '=', symbol)
      .where('chainId', '=', chainId)
      .executeTakeFirst();
  }

  async getTokenOrThrow(symbol: string, chainId: number) {
    const token = await this.getToken(symbol, chainId);

    if (!token) {
      throw new NotFoundException(
        `Token with symbol '${symbol}' not found on chain with ID ${chainId}`,
      );
    }

    return token;
  }

  async getTokenById(tokenId: string) {
    return await this.db
      .selectFrom('tokens')
      .select(['id', 'symbol', 'chainId'])
      .where('id', '=', tokenId)
      .executeTakeFirst();
  }

  async getTokenPriceHistory(symbol: string, chainId: number) {
    try {
      const token = await this.getTokenOrThrow(symbol, chainId);

      const results = await this.prisma.$queryRaw`
        WITH time_weighted_data AS (
          SELECT
            timestamp,
            price,
            LEAD(timestamp) OVER (ORDER BY timestamp) AS next_timestamp
          FROM token_prices
          WHERE token_id = ${token.id}::uuid
            AND timestamp >= NOW() - INTERVAL '24 hours'
        ),
        intervals AS (
          SELECT
            date_trunc('hour', timestamp) AS datetime,
            SUM(price * EXTRACT(EPOCH FROM (next_timestamp - timestamp))) AS weighted_sum,
            SUM(EXTRACT(EPOCH FROM (next_timestamp - timestamp))) AS total_weight
          FROM time_weighted_data
          WHERE next_timestamp IS NOT NULL
          GROUP BY datetime
        )
        SELECT
        datetime,
          CASE WHEN total_weight > 0 THEN weighted_sum / total_weight ELSE NULL END AS avg_price
        FROM intervals
        WHERE total_weight > 0
        ORDER BY datetime;
      `;

      return results;
    } catch (error) {
      console.log(error);
      // this.logger.error(error);
      throw error;
    }
  }

  async getTokenAlert(email: string) {
    return await this.db
      .selectFrom('alerts')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();
  }

  async saveTokenAlert(data: SaveTokenAlertDto) {
    const token = await this.getTokenOrThrow(data.symbol, data.chainId);
    let alert = await this.getTokenAlert(data.email);

    if (!alert) {
      alert = await this.db
        .insertInto('alerts')
        .values({
          email: data.email,
        })
        .returningAll()
        .executeTakeFirst();
    }

    let alertSetting = await this.getTokenAlertSettings(alert.id, token.id);

    if (!alertSetting) {
      return await this.db
        .insertInto('alertSettings')
        .values({
          alertId: alert.id,
          tokenId: token.id,
          threshold: data.threshold.toString(),
        })
        .returningAll()
        .executeTakeFirst();
    }

    const updated = await this.db
      .updateTable('alertSettings')
      .set({
        threshold: data.threshold.toString(),
      })
      .where('id', '=', alertSetting.id)
      .returningAll()
      .executeTakeFirst();

    return updated;
  }

  async getTokenAlertSettings(alertId: string, tokenId: string) {
    return await this.db
      .selectFrom('alertSettings')
      .selectAll()
      .where('alertId', '=', alertId)
      .where('tokenId', '=', tokenId)
      .executeTakeFirst();
  }
}
