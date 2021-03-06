import { AlertHistory } from '@peace-of-mind/api-interfaces';
import DataService from './DataService';

export default class AlertsService {
  private static dataService = DataService.getInstance();

  static createAlert(
    userId: number,
    taskId: number,
    alertDue: string,
    alertType: 'sms' | 'voice' | 'email',
    alertDestination: string,
    description: string
  ) {
    return this.dataService.createAlert(
      userId,
      taskId,
      alertDue,
      alertType,
      alertDestination,
      description
    );
  }

  static getAllAlertsForUser(userId: number) {
    return this.dataService.getAllAlertsForUser(userId);
  }

  static getAllAlertsForTask(taskId: number) {
    return this.dataService.getAllAlertsForTask(taskId);
  }

  static getAlert(alertId: number) {
    return this.dataService.getAlert(alertId);
  }

  static updateAlert(alertId: number, changes: Partial<AlertHistory>) {
    return this.dataService.updateAlert(alertId, changes);
  }

  static deleteAlert(alertId: number) {
    return this.dataService.deleteAlert(alertId);
  }
}
