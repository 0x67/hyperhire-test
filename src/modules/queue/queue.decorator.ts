import { QueueToken } from '@/modules/queue/queue.interface';
import { InjectQueue } from '@nestjs/bullmq';

export const InjectBullQueue = (queue: QueueToken) => InjectQueue(queue);
