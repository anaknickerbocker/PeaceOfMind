import cron from 'cron';
import TwilioService from './TwilioService';

export default class CronService {
  private twilioService: TwilioService;

  constructor() {
    this.twilioService = TwilioService.getInstance();
    new cron.CronJob(
      '* * * * *',
      () => this.twilioService.sendAlerts(),
      null,
      true,
      ''
    );
  }
}
