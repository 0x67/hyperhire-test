import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import Moralis from 'moralis';
import { AptosApi } from '@moralisweb3/aptos-api';
import { Auth } from '@moralisweb3/auth';
import { Core } from '@moralisweb3/common-core';
import { CommonEvmUtils } from '@moralisweb3/common-evm-utils';
import { CommonSolUtils } from '@moralisweb3/common-sol-utils';
import { EvmApi } from '@moralisweb3/evm-api';
import { SolApi } from '@moralisweb3/sol-api';
import { Streams } from '@moralisweb3/streams';
import { MoralisModuleOptions } from '@/modules/moralis/moralis-module-options.interface';
import { MODULE_OPTIONS_TOKEN } from '@/modules/moralis/moralis.module-definition';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { dateToTimestamp } from '@/utils';

@Injectable()
export class MoralisService implements OnModuleInit {
  Core: Core;
  Auth: Auth;
  Streams: Streams;
  EvmApi: EvmApi;
  SolApi: SolApi;
  AptosApi: AptosApi;
  EvmUtils: CommonEvmUtils;
  SolUtils: CommonSolUtils;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private options: MoralisModuleOptions,
    @InjectPinoLogger(MoralisService.name)
    private logger: PinoLogger,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.Core = Moralis.Core;
    this.Auth = Moralis.Auth;
    this.Streams = Moralis.Streams;
    this.EvmApi = Moralis.EvmApi;
    this.SolApi = Moralis.SolApi;
    this.AptosApi = Moralis.AptosApi;
    this.EvmUtils = Moralis.EvmUtils;
    this.SolUtils = Moralis.SolUtils;
  }

  async onModuleInit() {
    const moralisConfigOptions = Object.assign({}, this.options);

    delete moralisConfigOptions.isGlobal;

    await Moralis.start({
      ...moralisConfigOptions,
    });

    this.logger.info('Moralis service initialized');
  }

  async getBlockNumber(chain: string, date: Date) {
    return await this.cacheManager.wrap(
      `cache:block:${chain}:${dateToTimestamp(date)}`,
      async () => {
        const {
          result: { block },
        } = await this.EvmApi.block.getDateToBlock({
          chain,
          date,
        });

        return block;
      },
      1000 * 60 * 10, // 10 minutes in milliseconds
    );
  }
}
