import { IsNotEmpty, IsOptional } from 'class-validator';

export class ListTokenQuery {
  /**
   * @example 1
   */
  @IsOptional()
  chainId?: number;
}
