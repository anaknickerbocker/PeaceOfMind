import TwilioService from './TwilioService';
import DataService from './DataService';
import { Alert } from '@peace-of-mind/api-interfaces';

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

  async sendAlerts() {
    console.log('Cron job running every minute');

    // Get alerts due now
    const alerts = await this.dataService.getAlertsDueNow();
    console.log(alerts);

    // Send the alerts
    // TODO: Split the alerts by sms/voice/email
    // await this.sendSms(alerts);

    // TODO: Add alerts to the alertsHistory table

    // TODO: Delete the alerts from the alerts table
  }

  async sendSms(smsAlerts: Array<Alert>): Promise<void> {
    await Promise.allSettled(
      smsAlerts.map((alert) =>
        this.twilioService.sendSms(alert.alertDestination, alert.description)
      )
    );
  }

  async sendVoice(voiceAlerts: Array<Alert>): Promise<void> {
    await Promise.allSettled(
      voiceAlerts.map((alert) =>
        this.twilioService.sendVoice(alert.alertDestination, alert.description)
      )
    );
  }

  // TODO: create a Sendgrid Service for emails
  async sendEmail(emailAlerts: Array<Alert>): Promise<void> {}
}
