import cron from 'cron';
import AlertingService from './AlertingService';

export default class CronService {
  private alertingService: AlertingService;
  constructor() {
    this.alertingService = AlertingService.getInstance();
    new cron.CronJob(
      '* * * * *',
      () => this.alertingService.sendAlerts(),
      null,
      true,
      ''
    );
  }
}
