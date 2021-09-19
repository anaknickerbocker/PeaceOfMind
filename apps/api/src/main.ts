import * as express from 'express';
import { Message } from '@peace-of-mind/api-interfaces';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

const greeting: Message = { message: 'Welcome to api!' };

app.get('/api', async (req, res) => {
  const allUsers = await prisma.users.findMany({});
  res.send(allUsers);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
