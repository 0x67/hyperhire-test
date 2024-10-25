import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail({
    to,
    subject,
    content,
  }: {
    to: string;
    subject: string;
    content: string;
  }) {
    await this.mailerService.sendMail({
      to,
      subject,
      html: content,
    });
  }
}
