import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface HttpErrorResponse extends HttpException {
  error: string;
  code: string;
  detail: string;
  messages: { message: string }[];
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpErrorResponse, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = exception.getStatus();

    const error = exception.getResponse() as HttpErrorResponse;

    response.status(statusCode).send({
      timestamp: new Date().toISOString(),
      path: request.url,
      statusCode,
      error: !error?.error && error?.message ? error.message : error?.error,
      detail: error?.detail,
      messages:
        !error?.error && error?.message
          ? [{ message: error.message }]
          : !error?.error && !error?.messages
            ? null
            : error.messages,
    });
  }
}
