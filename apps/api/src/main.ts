import * as express from 'express';
// import { Message } from '@peace-of-mind/api-interfaces';
import { PrismaClient } from '@prisma/client';
import * as path from 'path';
// import dotenv from 'dotenv';
// import router from './routes/router';

const prisma = new PrismaClient();
const app = express();
const CLIENT_BUILD_PATH = path.join(__dirname, '../peace-of-mind');
app.use(express.static(CLIENT_BUILD_PATH));
// const greeting: Message = { message: 'Welcome to api!' };

app.get('*', (req, res) => {
  res.sendFile(path.join(CLIENT_BUILD_PATH, '/index.html'));
});

app.get('/api', async (req, res) => {
  const allUsers = await prisma.users.findMany({});
  res.send(allUsers);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port);
});
server.on('error', console.error);
