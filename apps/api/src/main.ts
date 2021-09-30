import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import alertHistories from './app/routes/alertHistories';
import alerts from './app/routes/alerts';
import dev from './app/routes/dev';
import tasks from './app/routes/tasks';
import users from './app/routes/users';
import CronService from './app/services/CronService';
import helmet from 'helmet';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
new CronService();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const CLIENT_BUILD_PATH = path.join(__dirname, '../peace-of-mind');
app.use(express.static(CLIENT_BUILD_PATH));

app.use('/api/login', (req, res) => {
  res.send({
    token: 'test123',
  });
});

app.use('/api/users', users);
app.use('/api/tasks', tasks);
app.use('/api/alerts', alerts);
app.use('/api/alertHistories', alertHistories);
app.use('/api/dev', dev);

app.get('*', (req, res) => {
  res.sendFile(path.join(CLIENT_BUILD_PATH, '/index.html'));
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port);
});
server.on('error', console.error);
