import { Inject } from '@nestjs/common';
import { getQueueToken } from '@nestjs/bullmq';
import { QueueToken } from '@/modules/queue/queue.interface';

export function InjectBullQueue(queue: QueueToken): ParameterDecorator {
  return Inject(getQueueToken(queue));
}
