export default class DataService {
  static getTasks = (userId: string) => {
    return fetch(`/api/users/${userId}/tasks`);
  };

  static getAlerts = (userId: string, taskId: string) => {
    return fetch(`/api/users/${userId}/tasks/${taskId}`);
  };

  static createAlert = (userId: string, taskId: string, body: any) => {
    return fetch(`/api/users/${userId}/tasks/${taskId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };
}
