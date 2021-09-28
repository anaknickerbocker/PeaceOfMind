export default class DataService {
  getTasks = (userId: string) => {
    return fetch(`/api/users/${userId}/tasks`)
  }

  getAlerts = (userId: string, taskId: string) => {
    return fetch(`/api/users/${userId}/tasks/${taskId}`)
  }
}
