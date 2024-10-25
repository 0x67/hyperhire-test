import { Token } from '@/types';
import { ApiResponseProperty } from '@nestjs/swagger';
import { ColumnType } from 'kysely';

export class TokenResponse implements Token {
  @ApiResponseProperty({
    type: String,
  })
  id: ColumnType<string, string, string>;
  @ApiResponseProperty()
  address: string;
  @ApiResponseProperty()
  name: string;
  @ApiResponseProperty()
  chainId: number;
  @ApiResponseProperty()
  symbol: string;
  @ApiResponseProperty()
  decimals: number;
  @ApiResponseProperty({
    type: Date,
  })
  createdAt: ColumnType<Date, string | Date, string | Date>;
  @ApiResponseProperty({
    type: Date,
  })
  updatedAt: ColumnType<Date, string | Date, string | Date>;
}
