import express from 'express';
import UsersService from '../services/UsersService';

const users = express.Router();

users.post('/', (req, res) => {
  const dataService = req.app.get('dataService');
  try {
    UsersService.createUser(
      dataService.connection,
      req.body.name,
      req.body.smsPhoneNumber || '',
      req.body.voicePhoneNumber || '',
      req.body.email || ''
    );
    res.status(200);
  } catch {
    res.status(401);
  }
});

users.get('/', async (req, res) => {
  const dataService = req.app.get('dataService');
  try {
    const result = await UsersService.getAllUsers(dataService.connection);
    res.json(result);
  } catch {
    res.status(401);
  }
});

users.get('/:userId', async (req, res) => {
  const dataService = req.app.get('dataService');
  try {
    const result = await UsersService.getUser(
      dataService.connection,
      req.params.userId
    );
    res.json(result);
  } catch {
    res.status(401);
  }
});

users.patch('/:userId', async (req, res) => {
  const dataService = req.app.get('dataService');
  const changes = {
    name: req.body.name,
    smsPhoneNumber: req.body.smsPhoneNumber || '',
    voicePhoneNumber: req.body.voicePhoneNumber || '',
    email: req.body.email || '',
  };
  try {
    const result = await UsersService.updateUser(
      dataService.connection,
      req.params.userId,
      changes
    );
    res.json(result);
  } catch {
    res.status(401);
  }
});

users.delete('/:userId', async (req, res) => {
  const dataService = req.app.get('dataService');
  try {
    const result = await UsersService.deleteUser(
      dataService.connection,
      req.params.userId
    );
    res.json(result);
  } catch {
    res.status(401);
  }
});

export default users;
