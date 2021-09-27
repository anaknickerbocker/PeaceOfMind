export interface User {
  userId: string;
  name: string;
  sms?: string;
  voice?: string;
  email?: string;
}

export interface Task {
  userId: string;
  taskId: string;
  description: string;
  taskDateTime: string; // datetime
  recurring: boolean;
  complete: boolean;
}

export interface Alert {
  alertId: string;
  userId: string;
  taskId: string;
  alertDue: string; // datetime
  alertType: 'sms' | 'voice' | 'email';
  alertDestination: string; // phone number or email
  description: string;
}

export interface AlertHistory {
  alertHistoryId: string;
  userId: string;
  taskId: string;
  alertId: string;
  alertType: 'sms' | 'voice' | 'email';
  alertDestination: string; // phone number or email
  alertSent: string; // datetime
}
