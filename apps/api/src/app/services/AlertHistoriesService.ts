import { AlertHistory } from '@peace-of-mind/api-interfaces';
import DataService from './DataService';

export default class AlertHistoriesService {
  private static dataService = DataService.getInstance();

  static createAlertHistory(
    userId: string,
    taskId: string,
    alertId: string,
    alertType: 'sms' | 'voice' | 'email',
    alertDestination: string,
    description: string
  ) {
    return this.dataService.createAlertHistory(
      {
        userId,
        taskId,
        alertId,
        alertType,
        alertDestination,
        description
      }
    );
  }

  static getAllAlertHistoriesForUser(userId: string) {
    return this.dataService.getAllAlertHistoriesForUser(userId);
  }

  static getAllAlertHistoriesForTask(taskId: string) {
    return this.dataService.getAllAlertHistoriesForTask(taskId);
  }

  static getAllAlertHistoriesForAlert(alertId: string) {
    return this.dataService.getAllAlertHistoriesForAlert(alertId);
  }

  static getAlertHistory(alertHistoryId: string) {
    return this.dataService.getAlertHistory(alertHistoryId);
  }

  static updateAlertHistory(
    alertHistoryId: string,
    changes: Partial<AlertHistory>
  ) {
    return this.dataService.updateAlertHistory(alertHistoryId, changes);
  }

  static deleteAlertHistory(alertHistoryId: string) {
    return this.dataService.deleteAlertHistory(alertHistoryId);
  }
}
