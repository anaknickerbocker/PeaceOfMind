export interface User {
  userId: number;
  name: string;
  sms?: string;
  voice?: string;
  email?: string;
}

export interface Task {
  userId: number;
  taskId: number;
  description: string;
  taskDateTime: string; // datetime
  recurring: boolean;
  complete: boolean;
}

export interface Alert {
  alertId: number;
  userId: number;
  taskId: number;
  alertDue: string; // datetime
  alertType: 'sms' | 'voice' | 'email';
  alertDestination: string; // phone number or email
  description: string;
}

export interface AlertHistory {
  alertHistoryId: number;
  userId: number;
  taskId: number;
  alertId: number;
  alertType: 'sms' | 'voice' | 'email';
  alertDestination: string; // phone number or email
  alertSent: string; // datetime
}
