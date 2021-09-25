import { AlertHistory } from '@peace-of-mind/api-interfaces';
import DataService from './DataService';

export default class AlertsService {
  private static dataService = DataService.getInstance();

  static createAlert(
    userId: string,
    taskId: string,
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

  static getAllAlertsForUser(userId: string) {
    return this.dataService.getAllAlertsForUser(userId);
  }

  static getAllAlertsForTask(taskId: string) {
    return this.dataService.getAllAlertsForTask(taskId);
  }

  static getAlert(alertId: string) {
    return this.dataService.getAlert(alertId);
  }

  static updateAlert(alertId: string, changes: Partial<AlertHistory>) {
    return this.dataService.updateAlert(alertId, changes);
  }

  static deleteAlert(alertId: string) {
    return this.dataService.deleteAlert(alertId);
  }
}
