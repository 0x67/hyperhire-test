import { BadRequestException } from '@nestjs/common';

export class BadRequestError extends BadRequestException {
  constructor(
    messages:
      | {
          key?: string;
          messages: string[];
        }[]
      | string,
    detail?: string,
  ) {
    if (typeof messages === 'string') {
      messages = [{ messages: [messages] }];
    }

    // Call the parent class constructor with the desired response object
    super({
      error: 'Bad Request',
      detail: detail ?? 'Please check your input and try again.',
      messages,
    });
  }
}
