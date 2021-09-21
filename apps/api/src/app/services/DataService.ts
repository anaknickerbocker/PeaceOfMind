import r from 'rethinkdb';

export default class DataService {
  connection: r.Connection;

  constructor() {
    r.connect({ host: process.env.DB_URL, port: 28015 }, (err, conn) => {
      if (err) throw err;
      this.connection = conn;
    });
  }

  r() {
    return r;
  }
}
