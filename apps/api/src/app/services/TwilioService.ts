import { Twilio } from 'twilio';
import DataService from './DataService';

export default class TwilioService {
  private static instance: TwilioService;
  private dataService: DataService;
  private client: Twilio;
  private twilioAccountSid = process.env.twilioAccountSid;
  private twilioAuthTokeen = process.env.twilioAuthToken;
  private twilioNumber = process.env.twilioPhoneNumber;

  private constructor() {
    this.client = new Twilio(this.twilioAccountSid, this.twilioAuthTokeen);
    this.dataService = DataService.getInstance();
  }

  public static getInstance() {
    if (!TwilioService.instance) {
      TwilioService.instance = new TwilioService();
    }
    return TwilioService.instance;
  }

  sendMessage(smsNotificationNumber: string) {
    this.client.messages
      .create({
        from: this.twilioNumber,
        to: smsNotificationNumber,
        body: 'You just sent an SMS from TypeScript using Twilio!',
      })
      .then((message) => console.log(message.sid));
  }

  async sendAlerts() {
    console.log('Cron job running every minute');
    const alerts = await this.dataService.getAlertsDueNow();
    console.log(alerts);
  }
}
