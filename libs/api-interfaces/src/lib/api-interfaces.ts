export interface User {
  id: string;
  name: string;
  sms: string;
  voice: string;
  email: string;
}

export interface Tasks {
  id: string;
  user_id: string;
  description: string;
  nextNotification: Date;
}

export interface AlertsHistory {
  id: string;
  task_id: string;
  user_id: string;
  alertSent: Date;
}
