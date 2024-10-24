import { BadRequestError } from '@/common/exceptions';
import { ValidationError } from '@nestjs/common';

export const exceptionFactory = (errors: ValidationError[]) => {
  const groupErrorsByProperty = errors.reduce(
    (acc, error) => {
      if (!acc[error.property]) {
        acc[error.property] = [];
      }
      acc[error.property].push(...Object.values(error.constraints));
      return acc;
    },
    {} as { [key: string]: string[] },
  );

  const err = Object.entries(groupErrorsByProperty).map(([key, messages]) => ({
    key,
    messages,
  }));

  return new BadRequestError(err);
};
