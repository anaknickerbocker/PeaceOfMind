import add from 'date-fns/add';
import { AlertData, FormData } from '../components/CreateTasks/CreateTasks';

export default class DataService {
  static getUser = (userId: string) => {
    return fetch(`/api/users/${userId}`);
  };
  static getAllTasks = (userId: string) => {
    return fetch(`/api/users/${userId}/tasks`);
  };

  static getTask = (userId: string, taskId: string) => {
    return fetch(`/api/users/${userId}/tasks/${taskId}`);
  };

  static createTask = (userId: string, formData: FormData) => {
    const body = {
      userId,
      description: formData.taskDescription,
      taskDateTime: formData.taskDateTime,
      complete: formData.complete,
      recurring: false,
    };
    return fetch(`/api/users/${userId}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  static getAlerts = (userId: string, taskId: string) => {
    return fetch(`/api/users/${userId}/tasks/${taskId}`);
  };

  static createAlert = async (
    userId: string,
    taskId: string,
    alert: AlertData,
    alertDestination: string,
    description: string
  ) => {
    const body = {
      userId,
      taskId,
      alertDue: add(new Date(), { seconds: 30 }),
      alertType: alert.reminderMethod,
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
