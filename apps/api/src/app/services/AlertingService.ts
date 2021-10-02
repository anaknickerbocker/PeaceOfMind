import TwilioService from './TwilioService';
import DataService from './DataService';

export default class AlertingService {
  private static instance: AlertingService;
  private twilioService: TwilioService;
  private dataService: DataService;

  private constructor() {
    this.twilioService = TwilioService.getInstance();
    this.dataService = DataService.getInstance();
  }

  public static getInstance() {
    if (!AlertingService.instance) {
      AlertingService.instance = new AlertingService();
    }
    return AlertingService.instance;
  }

  async sendAlerts() {
    console.log('Cron job running every minute');

    // Get alerts due now
    const alerts = await this.dataService.getAlertsDueNow();

    // Split the alerts by sms/voice/email
    alerts.forEach((alert) => {
      if (alert.alertType === 'sms') {
        this.twilioService.sendSms(alert.alertDestination, alert.description);
      } else if (alert.alertType === 'voice') {
        this.twilioService.sendVoice(alert.alertDestination, alert.description);
      } else if (alert.alertType === 'email') {
        this.twilioService.sendEmail(alert.alertDestination, alert.description);
      }
      this.dataService.createAlertHistory(alert);
      this.dataService.deleteAlert(alert.alertId);
    });
  }
}
