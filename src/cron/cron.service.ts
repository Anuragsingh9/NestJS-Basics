
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmailService } from '../../src/common/email.service';
import { cronJobTesting } from '../../src/email/email-template';

@Injectable()
export class CronService {
    constructor(private readonly emailService: EmailService) { }
    private readonly logger = new Logger(CronService.name);

    @Cron('0 54 16 * * 1-5')
    handleCron() {
        this.logger.debug('This will run every weekday at 16:54 AM!');
        this.emailService.sendEmail('anurag@mailinator.com', 'Cron Job', 'Cron Job is running', cronJobTesting());
    }
}
