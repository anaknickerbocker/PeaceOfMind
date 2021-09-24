import { Alert, Task, User } from '@peace-of-mind/api-interfaces';
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

  createAlertHistory(alert: Alert) {
    return r.table('alertHistories').insert({
      taskId: alert.taskId,
      userId: alert.userId,
      alertId: alert.alertId,
      alertType: alert.alertType,
      alertSent: alert.alertDue, // TODO: this date should be the date it actually sent
    });
  }

  deleteAlert(alertId: string) {
    return r.table('alerts').get(alertId).delete();
  }
}
