import TwilioService from './TwilioService';
import DataService from './DataService';
import { Alert } from '@peace-of-mind/api-interfaces';

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
    // const alerts = await this.dataService.getAlertsAnytime();

    // Split the alerts by sms/voice/email
    const sms = [];
    const voice = [];
    const email = [];
    alerts.forEach((alert) => {
      if (alert.alertType === 'sms') {
        sms.push(alert);
      } else if (alert.alertType === 'voice') {
        voice.push(alert);
      } else if (alert.alertType === 'email') {
        email.push(alert);
      }
    });
    // Send the alerts
    await Promise.allSettled([
      this.sendSms(sms),
      this.sendVoice(voice),
      this.sendEmail(email),
    ]);
  }

  async sendSms(smsAlerts: Array<Alert>): Promise<void> {
    console.log('smsAlerts: ', smsAlerts);
    await Promise.allSettled(
      smsAlerts.map(async (alert) => {
        await this.dataService.createAlertHistory(alert);
        await this.dataService.deleteAlert(alert.alertId);
        return this.twilioService.sendSms(
          alert.alertDestination,
          alert.description
        );
      })
    );
  }

  async sendVoice(voiceAlerts: Array<Alert>): Promise<void> {
    console.log('voiceAlerts: ', voiceAlerts);
    await Promise.allSettled(
      voiceAlerts.map(async (alert) => {
        await this.dataService.createAlertHistory(alert);
        await this.dataService.deleteAlert(alert.alertId);
        return this.twilioService.sendVoice(
          alert.alertDestination,
          alert.description
        );
      })
    );
  }

  async sendEmail(emailAlerts: Array<Alert>): Promise<void> {
    console.log('emailAlerts: ', emailAlerts);
    await Promise.allSettled(
      emailAlerts.map(async (alert) => {
        await this.dataService.createAlertHistory(alert);
        await this.dataService.deleteAlert(alert.alertId);
        return this.twilioService.sendEmail(
          alert.alertDestination,
          alert.description
        );
      })
    );
  }
}
