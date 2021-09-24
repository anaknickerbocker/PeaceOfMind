import cron from 'cron';
import AlertsService from './AlertsService';

export default class CronService {
  private alertsService: AlertsService;
  constructor() {
    this.alertsService = AlertsService.getInstance();
    new cron.CronJob(
      '* * * * *',
      () => this.alertsService.sendAlerts(),
      null,
      true,
      ''
    );
  }
}
