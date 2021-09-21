import express from 'express';
// import TasksService from '../services/TasksService';

const tasks = express.Router();

tasks.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

export default tasks;
