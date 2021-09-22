import { Alert, User } from '@peace-of-mind/api-interfaces';
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

  async createUser(name: string, sms: string, voice: string, email: string) {
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

  async getUser(userId: string): Promise<User> {
    return r.table('users').get(userId).run(this.connection) as Promise<User>;
  }

  async updateUser(userId: string, changes: Partial<User>) {
    return r
      .table('users')
      .get(userId)
      .update({ ...changes })
      .run(this.connection);
  }

  async deleteUser(userId: string) {
    return r.table('users').get(userId).delete().run(this.connection);
  }

  async getAlertsDueNow() {
    const cursor: Cursor = await r
      .table('alerts')
      .filter(
        (alert) => alert('alertDue').lt(r.now())
        // .gt(r.now())
        // .and(alert('alertDue').lt(r.now().add(60)))
      )
      .run(this.connection);
    return cursor.toArray();
  }
}
