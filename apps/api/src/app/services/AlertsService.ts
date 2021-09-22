import TwilioService from './TwilioService';
import DataService from './DataService';

export default class AlertsService {
  private static instance: AlertsService;
  private twilioService: TwilioService;
  private dataService: DataService;
  private constructor() {
    this.twilioService = TwilioService.getInstance();
    this.dataService = DataService.getInstance();
  }

  public static getInstance() {
    if (!AlertsService.instance) {
      AlertsService.instance = new AlertsService();
    }
    return AlertsService.instance;
  }

  async sendSms() {
    console.log('Cron job running every minute');
    const alerts = await this.dataService.getAlertsDueNow();
    console.log(alerts);
    alerts.forEach((alert) => {
      this.twilioService.sendSms(alert.alertDestination, alert.description);
    });
  }

  async sendVoice() {}

  async sendEmail() {}
}
