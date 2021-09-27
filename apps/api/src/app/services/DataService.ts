import { Alert, AlertHistory, Task, User } from '@peace-of-mind/api-interfaces';
import r, { Cursor } from 'rethinkdb';

export default class DataService {
  private static instance: DataService;
  private connection: r.Connection;

  private constructor() {
    r.connect({ host: process.env.DB_URL, port: 28015 }, (err, conn) => {
      if (err) throw err;
      this.connection = conn;
    });
  }

  public static getInstance() {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  // Users
  createUser(name: string, sms: string, voice: string, email: string) {
    return r
      .table('users')
      .insert({
        name,
        sms,
        voice,
        email,
      })
      .run(this.connection);
  }

  async getAllUsers(): Promise<Array<User>> {
    const cursor = await r.table('users').run(this.connection);
    return cursor.toArray();
  }

  getUser(userId: string): Promise<User> {
    return r.table('users').get(userId).run(this.connection) as Promise<User>;
  }

  updateUser(userId: string, changes: Partial<User>) {
    return r
      .table('users')
      .get(userId)
      .update({ ...changes })
      .run(this.connection);
  }

  deleteUser(userId: string) {
    return r.table('users').get(userId).delete().run(this.connection);
  }

  // Tasks
  createTask(
    userId: string,
    description: string,
    taskDateTime: string,
    recurring: boolean
  ) {
    return r
      .table('tasks')
      .insert({ userId, description, taskDateTime, recurring })
      .run(this.connection);
  }

  async getAllTasksForUser(userId: string) {
    const cursor = await r
      .table('tasks')
      .filter({ userId })
      .run(this.connection);
    return cursor.toArray();
  }

  getTask(taskId: string) {
    return r.table('tasks').get(taskId).run(this.connection);
  }

  updateTask(taskId: string, changes: Partial<Task>) {
    return r
      .table('tasks')
      .get(taskId)
      .update({ ...changes })
      .run(this.connection);
  }

  deleteTask(taskId: string) {
    return r.table('tasks').get(taskId).delete().run(this.connection);
  }

  // Alerts
  createAlert(
    userId: string,
    taskId: string,
    alertDue: string,
    alertType: 'sms' | 'voice' | 'email',
    alertDestination: string,
    description: string
  ) {
    return r
      .table('alerts')
      .insert({
        userId,
        taskId,
        alertDue,
        alertType,
        alertDestination,
        description,
      })
      .run(this.connection);
  }

  async getAllAlertsForUser(userId: string) {
    const cursor = await r
      .table('alerts')
      .filter({ userId })
      .run(this.connection);
    return cursor.toArray();
  }

  async getAllAlertsForTask(taskId: string) {
    const cursor = await r
      .table('alerts')
      .filter({ taskId })
      .run(this.connection);
    return cursor.toArray();
  }

  getAlert(alertId: string) {
    return r.table('alerts').get(alertId).run(this.connection);
  }

  updateAlert(alertId: string, changes: Partial<Alert>) {
    return r
      .table('alerts')
      .get(alertId)
      .update({ ...changes })
      .run(this.connection);
  }

  deleteAlert(alertId: string) {
    return r.table('alerts').get(alertId).delete().run(this.connection);
  }

  // Alert Histories
  createAlertHistory(
    userId: string,
    taskId: string,
    alertId: string,
    alertType: 'sms' | 'voice' | 'email',
    alertDestination: string,
    description: string
  ) {
    return r.table('alertHistories').insert({
      userId,
      taskId,
      alertId,
      alertType,
      alertDestination,
      description,
    }).run(this.connection);
  }

  async getAllAlertHistoriesForUser(userId: string) {
    const cursor = await r
      .table('alertHistories')
      .filter({ userId })
      .run(this.connection);
    return cursor.toArray();
  }

  async getAllAlertHistoriesForTask(taskId: string) {
    const cursor = await r
      .table('alertHistories')
      .filter({ taskId })
      .run(this.connection);
    return cursor.toArray();
  }

  async getAllAlertHistoriesForAlert(alertId: string) {
    const cursor = await r
      .table('alertHistories')
      .filter({ alertId })
      .run(this.connection);
    return cursor.toArray();
  }

  getAlertHistory(alertId: string) {
    return r.table('alertHistories').get(alertId).run(this.connection);
  }

  updateAlertHistory(alertHistoryId: string, changes: Partial<AlertHistory>) {
    return r
      .table('alertHistories')
      .get(alertHistoryId)
      .update({ ...changes })
      .run(this.connection);
  }

  deleteAlertHistory(alertHistoryId: string) {
    return r
      .table('alertHistories')
      .get(alertHistoryId)
      .delete()
      .run(this.connection);
  }

  async getAlertsDueNow() {
    const cursor: Cursor = await r
      .table('alerts')
      .filter((alert) => alert('alertDue').lt(r.now()))
      .orderBy('alertDue')
      // .gt(r.now())
      // .and(alert('alertDue').lt(r.now().add(60)))
      // .orderBy('alertDue')
      .run(this.connection);
    return cursor.toArray();
  }
}
