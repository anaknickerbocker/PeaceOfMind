import { AlertHistory } from '@peace-of-mind/api-interfaces';
import DataService from './DataService';

export default class AlertHistoriesService {
  private static dataService = DataService.getInstance();

  static createAlertHistory(
    userId: number,
    taskId: number,
    alertId: number,
    alertType: 'sms' | 'voice' | 'email',
    alertDestination: string,
    description: string
  ) {
    return this.dataService.createAlertHistory({
      userId,
      taskId,
      alertId,
      alertType,
      alertDestination,
      description,
    });
  }

  static getAllAlertHistoriesForUser(userId: number) {
    return this.dataService.getAllAlertHistoriesForUser(userId);
  }

  static getAllAlertHistoriesForTask(taskId: number) {
    return this.dataService.getAllAlertHistoriesForTask(taskId);
  }

  static getAllAlertHistoriesForAlert(alertId: number) {
    return this.dataService.getAllAlertHistoriesForAlert(alertId);
  }

  static getAlertHistory(alertHistoryId: number) {
    return this.dataService.getAlertHistory(alertHistoryId);
  }

  static updateAlertHistory(
    alertHistoryId: number,
    changes: Partial<AlertHistory>
  ) {
    return this.dataService.updateAlertHistory(alertHistoryId, changes);
  }

  static deleteAlertHistory(alertHistoryId: number) {
    return this.dataService.deleteAlertHistory(alertHistoryId);
  }
}
