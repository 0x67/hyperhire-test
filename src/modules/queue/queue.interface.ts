import { QUEUE_TOKEN } from '@/modules/queue';

export type QueueToken = keyof typeof QUEUE_TOKEN;
export interface QueueModuleOptions {
  queues: QueueToken[];
  flows?: string[];
}
