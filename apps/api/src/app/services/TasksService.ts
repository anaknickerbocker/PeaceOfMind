import { Task } from '@peace-of-mind/api-interfaces';
import DataService from './DataService';

export default class TasksService {
  private static dataService = DataService.getInstance();

  static createTask(
    userId: string,
    description: string,
    taskDateTime: string,
    recurring: boolean
  ) {
    return this.dataService.createTask(
      userId,
      description,
      taskDateTime,
      recurring
    );
  }

  static getAllTasksForUser(userId: string) {
    console.log('getAllTasksForUser');
    console.log(`userId`, userId);
    return this.dataService.getAllTasksForUser(userId);
  }

  static getTask(taskId: string) {
    return this.dataService.getTask(taskId);
  }

  static updateTask(taskId: string, changes: Partial<Task>) {
    return this.dataService.updateTask(taskId, changes);
  }

  static deleteTask(taskId: string) {
    return this.dataService.deleteTask(taskId);
  }
}
