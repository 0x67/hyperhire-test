import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/app.service';
import { BadRequestError } from '@/common/exceptions';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    throw new BadRequestError('Hello World!');
  }
}
