export interface User {
  id: string; // userId in other tables
  name: string;
  sms: string;
  voice: string;
  email: string;
}

export interface Tasks {
  id: string; // taskId in other tables
  userId: string;
  description: string;
  taskDateTime: string; // datetime
  recurring: boolean;
}

export interface Alerts {
  id: string; // alertId in other tables
  taskId: string;
  userId: string;
  alertDue: string; // datetime
}

export interface AlertsHistory {
  id: string;
  taskId: string;
  userId: string;
  alertId: string;
  alertSent: string; // datetime
}
