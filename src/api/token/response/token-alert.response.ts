import { ApiResponseProperty } from '@nestjs/swagger';

export class TokenAlertResponse {
  @ApiResponseProperty()
  id: string;
  @ApiResponseProperty()
  createdAt: Date;
  @ApiResponseProperty()
  updatedAt: Date;
  @ApiResponseProperty()
  tokenId: string;
  @ApiResponseProperty()
  alertId: string;
  @ApiResponseProperty()
  threshold: string;
}
