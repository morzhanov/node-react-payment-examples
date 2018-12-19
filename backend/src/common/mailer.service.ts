import Mailgun from 'mailgun-js';
import { join } from 'path';
import { readFile } from 'fs';
import logger from './logger.service';
import { MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_FROM } from './constants';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  private mailgun;

  constructor() {
    this.mailgun = new Mailgun({
      apiKey: MAILGUN_API_KEY,
      domain: MAILGUN_DOMAIN
    });
  }

  async sendMessage(to: string, subject: string, content: string) {
    const data = {
      from: MAILGUN_FROM,
      to,
      subject,
      html: content
    };

    this.mailgun.messages().send(data, (err, body) => {
      if (err) {
        logger.log('got an error when sending message: ', err);
      } else {
        logger.log('message successfully sent to: ', to, '\n', 'res: ', body);
      }
    });
  }

  async processTemplate(templatePath: string): Promise<any> {
    return new Promise(resolve => {
      readFile(join(__dirname, templatePath), 'utf8', (_, html) => {
        resolve(html.toString());
      });
    });
  }
}
