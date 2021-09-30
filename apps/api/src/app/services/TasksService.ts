import { Alert, Task } from '@peace-of-mind/api-interfaces';
import DataService from './DataService';

export default class TasksService {
  private static dataService = DataService.getInstance();

  static createTask(
    userId: number,
    description: string,
    taskDateTime: string,
    complete: boolean,
    recurring: boolean,
    alerts?: Array<Alert>
  ) {
    return this.dataService.createTask(
      userId,
      description,
      taskDateTime,
      complete,
      recurring,
      alerts
    );
  }

  static getAllTasksForUser(userId: number, withAlerts: boolean) {
    return this.dataService.getAllTasksForUser(userId, withAlerts);
  }

  static getTask(taskId: number) {
    return this.dataService.getTask(taskId);
  }

  static updateTask(taskId: number, changes: Partial<Task>) {
    return this.dataService.updateTask(taskId, changes);
  }

  static deleteTask(taskId: number) {
    return this.dataService.deleteTask(taskId);
  }
}
