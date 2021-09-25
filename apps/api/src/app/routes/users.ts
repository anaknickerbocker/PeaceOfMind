import express from 'express';
import UsersService from '../services/UsersService';
import tasks from './tasks';

const users = express.Router();

// Create a new user
users.post('/', async (req, res) => {
  try {
    const result = await UsersService.createUser(
      req.body.name,
      req.body.sms || '',
      req.body.voice || '',
      req.body.email || ''
    );
    res.json(result);
  } catch {
    res.status(404);
  }
});

// Get all users
users.get('/', async (req, res) => {
  try {
    const result = await UsersService.getAllUsers();
    res.json(result);
  } catch {
    res.status(404);
  }
});

// Get one user
users.get('/:userId', async (req, res) => {
  try {
    const result = await UsersService.getUser(req.params.userId);
    res.json(result);
  } catch {
    res.status(404);
  }
});

// Update one user
users.patch('/:userId', async (req, res) => {
  const changes = {
    name: req.body.name,
    sms: req.body.sms || '',
    voice: req.body.voice || '',
    email: req.body.email || '',
  };
  try {
    const result = await UsersService.updateUser(req.params.userId, changes);
    res.json(result);
  } catch {
    res.status(404);
  }
});

// Delete one user
users.delete('/:userId', async (req, res) => {
  try {
    const result = await UsersService.deleteUser(req.params.userId);
    res.json(result);
  } catch {
    res.status(404);
  }
});

export default users;
