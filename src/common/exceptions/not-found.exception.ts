import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundError extends HttpException {
  constructor(resource: string, identifier: string, code?: string) {
    super(
      {
        error: 'Not Found',
        code,
        status: HttpStatus.NOT_FOUND,
        detail: 'The resource you requested could not be found.',
        messages: [
          {
            message: `${resource} with identifier '${identifier}' was not found`,
          },
        ],
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
