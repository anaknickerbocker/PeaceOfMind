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

  sendSms(smsNotificationNumber: string, description: string) {
    this.client.messages
      .create({
        from: this.twilioNumber,
        to: smsNotificationNumber,
        body: description,
      })
      .then((message) => console.log(message.sid));
  }
}
