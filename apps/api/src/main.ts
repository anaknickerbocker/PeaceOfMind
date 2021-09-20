import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import r from 'rethinkdb';
// import router from './routes/router';
// import { Message } from '@peace-of-mind/api-interfaces';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

r.connect({ host: process.env.DATABASE_URL, port: 28015 }, (err, conn) => {
  if (err) throw err;
  r.table('tv_shows')
    .insert({ name: 'Breaking Bad' })
    .run(conn, function (err, res) {
      if (err) throw err;
      console.log(res);
    });
});

const app = express();
const CLIENT_BUILD_PATH = path.join(__dirname, '../peace-of-mind');
app.use(express.static(CLIENT_BUILD_PATH));

app.get('/api', async (req, res) => {
  res.status(200);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(CLIENT_BUILD_PATH, '/index.html'));
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port);
});
server.on('error', console.error);
