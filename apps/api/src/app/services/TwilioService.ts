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

  sendSms(smsNotificationNumber: string, description: string): void {
    this.client.messages
      .create({
        from: this.twilioNumber,
        to: smsNotificationNumber,
        body: description,
      })
      .then((message) => console.log(message.sid));
  }

  sendVoice(voiceNotificationNumber: string, description: string): void {
    this.client.calls
      .create({
        twiml: `<Response><Say>${description}</Say></Response>`,
        to: voiceNotificationNumber,
        from: this.twilioNumber,
      })
      .then((message) => console.log(message.sid));

    // TODO: Add option to complete alert
  }
}
