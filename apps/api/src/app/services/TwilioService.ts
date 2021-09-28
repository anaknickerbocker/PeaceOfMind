import { Twilio } from 'twilio';
import DataService from './DataService';
import sgMail from '@sendgrid/mail';

export default class TwilioService {
  private static instance: TwilioService;
  private dataService: DataService;
  private client: Twilio;
  private twilioAccountSid = process.env.twilioAccountSid;
  private twilioAuthToken = process.env.twilioAuthToken;
  private twilioNumber = process.env.twilioPhoneNumber;

  private constructor() {
    this.client = new Twilio(this.twilioAccountSid, this.twilioAuthToken);
    this.dataService = DataService.getInstance();
    sgMail.setApiKey(process.env.sendgridApiKey);
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
      .then((message) => console.log(message.sid))
      .catch((error) => console.error(error));
  }

  sendVoice(voiceNotificationNumber: string, description: string): void {
    this.client.calls
      .create({
        twiml: `<Response><Say>${description}</Say></Response>`,
        to: voiceNotificationNumber,
        from: this.twilioNumber,
      })
      .then((message) => console.log(message.sid))
      .catch((error) => console.error(error));

    // TODO: Add option to complete alert
  }

  sendEmail(email: string, description: string): void {
    const msg = {
      to: email,
      from: process.env.fromEmail,
      subject: description,
      text: description,
      html: `<strong>${description}</strong>`,
    };

    sgMail
      .send(msg)
      .then(() => console.log('Email Sent'))
      .catch((error) => console.error(error));
  }
}
