import { OnWorkerEvent, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

export abstract class WorkerHostProcessor extends WorkerHost {
  protected readonly logger = new Logger(WorkerHostProcessor.name);

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    const { id, name, queueName, finishedOn } = job;
    this.logger.log(
      `Job id = ${id}; name = ${name}; queue = ${queueName}; completed on ${finishedOn ? new Date(finishedOn).toString() : 'unknown'}`,
    );
  }

  @OnWorkerEvent('progress')
  onProgress(job: Job) {
    const { id, name, progress } = job;
    this.logger.log(`Job id = ${id}; name = ${name}; completes ${progress}%`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    const { id, name, failedReason } = job;
    this.logger.error(
      `Job id = ${id}; name = ${name}; failed with error: ${error.message}; failed reason: ${failedReason}`,
    );
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    const { id, name, queueName, timestamp } = job;
    const startTime = timestamp ? new Date(timestamp).toISOString() : 'unknown';
    this.logger.log(
      `Job id = ${id}; name = ${name}; queue = ${queueName}; started at ${startTime}`,
    );
  }
}
