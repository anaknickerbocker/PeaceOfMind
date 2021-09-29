import { AlertData, FormData } from '../components/CreateTasks/CreateTasks';

export default class DataService {
  static getUser = (userId: number) => {
    return fetch(`/api/users/${userId}`);
  };
  static getAllTasks = (userId: number) => {
    return fetch(`/api/users/${userId}/tasks`);
  };

  static getTask = (userId: number, taskId: number) => {
    return fetch(`/api/users/${userId}/tasks/${taskId}`);
  };

  static createTask = (
    userId: number,
    formData: FormData,
    alerts: {
      alertDue: string;
      alertType: string;
      description: string;
      alertDestination: string;
      userId: number;
    }[]
  ) => {
    const body = {
      userId,
      description: formData.taskDescription,
      taskDateTime: formData.taskDateTime,
      complete: formData.complete,
      recurring: false,
      alerts,
    };
    console.log(JSON.stringify(body, null, 2));
    return fetch(`/api/users/${userId}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  static getAlerts = (userId: number, taskId: number) => {
    return fetch(`/api/users/${userId}/tasks/${taskId}`);
  };

  static createAlert = async (
    userId: number,
    taskId: number,
    alert: AlertData,
    alertDestination: string,
    description: string
  ) => {
    const body = {
      userId,
      taskId,
      alertDue: alert.alertDue,
      alertType: alert.alertType,
      alertDestination,
      description,
    };
    return fetch(`/api/users/${userId}/tasks/${taskId}/alerts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };
}
