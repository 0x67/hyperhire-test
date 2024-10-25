import { ApiResponseProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumberString } from 'class-validator';

export class TokenPriceChartResponse {
  /**
   * @example '2414.5'
   */
  @ApiResponseProperty()
  @IsNotEmpty()
  @IsNumberString()
  avg_price: string;

  /**
   * @example '2021-10-11T00:00:00.000Z'
   */
  @ApiResponseProperty()
  @IsNotEmpty()
  @IsDate()
  datetime: Date;
}
