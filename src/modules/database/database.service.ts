import { DB } from '@/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CamelCasePlugin,
  DeduplicateJoinsPlugin,
  Kysely,
  PostgresDialect,
} from 'kysely';
import { Pool } from 'pg';
import PgCursor from 'pg-cursor';

@Injectable()
export class DatabaseService extends Kysely<DB> {
  constructor(config: ConfigService) {
    super({
      dialect: new PostgresDialect({
        cursor: PgCursor,
        pool: new Pool({
          connectionString: config.get<string>('DATABASE_URL'),
        }),
        // onCreateConnection: async (conn) => {
        //   console.log('Connection created');
        // },
      }),
      plugins: [new CamelCasePlugin(), new DeduplicateJoinsPlugin()],
    });
  }
}
