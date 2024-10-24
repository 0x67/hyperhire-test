import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnApplicationBootstrap
{
  constructor() {
    super();
  }

  async onApplicationBootstrap() {
    await this.$connect();
  }
}
