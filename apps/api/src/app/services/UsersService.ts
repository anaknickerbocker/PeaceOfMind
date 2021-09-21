import r from 'rethinkdb';

export default class UsersService {
  static createUser(
    connection: r.Connection,
    name: string,
    smsPhoneNumber: string,
    voicePhoneNumber: string,
    email: string
  ) {
    return r
      .table('users')
      .insert({
        name,
        smsPhoneNumber,
        voicePhoneNumber,
        email,
      })
      .run(connection);
  }

  static async getAllUsers(connection: r.Connection) {
    const cursor = await r.table('users').run(connection);
    const result = cursor.toArray();
    return result;
  }

  static getUser(connection: r.Connection, userId: string) {
    return r.table('users').get(userId).run(connection);
  }

  static updateUser(
    connection: r.Connection,
    userId: string,
    changes: {
      name: string;
      smsPhoneNumber: string;
      voicePhoneNumber: string;
      email: string;
    }
  ) {
    return r
      .table('users')
      .get(userId)
      .update({ ...changes })
      .run(connection);
  }

  static deleteUser(connection: r.Connection, userId: string) {
    return r.table('users').get(userId).delete().run(connection);
  }
}
