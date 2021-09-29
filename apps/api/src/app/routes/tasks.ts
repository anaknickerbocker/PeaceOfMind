import express, { Request, Response } from 'express';
import TasksService from '../services/TasksService';

const tasks = express.Router();

// Create a task
tasks.post('/', async (req: Request, res: Response) => {
  try {
    const result = await TasksService.createTask(
      parseInt(req.body.userId),
      req.body.description,
      req.body.taskDateTime,
      req.body.complete || false,
      req.body.recurring || false,
      req.body.alerts
    );
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(404);
  }
});

// Get all tasks for a user
tasks.get('/', async (req: Request, res: Response) => {
  try {
    const result = await TasksService.getAllTasksForUser(
      parseInt(req.body.userId)
    );
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(404);
  }
});

// Get one task
tasks.get('/:taskId', async (req: Request, res: Response) => {
  try {
    const result = await TasksService.getTask(parseInt(req.params.taskId));
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(404);
  }
});

// Update a task
tasks.patch('/:taskId', async (req: Request, res: Response) => {
  try {
    const changes = {
      userId: parseInt(req.body.userId),
      description: req.body.description,
      taskDateTime: req.body.taskDateTime,
      recurring: req.body.recurring,
    };
    const result = await TasksService.updateTask(
      parseInt(req.params.taskId),
      changes
    );
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(404);
  }
});

// Delete a task
tasks.delete('/:taskId', async (req: Request, res: Response) => {
  try {
    const result = await TasksService.deleteTask(parseInt(req.params.taskId));
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(404);
  }
});

export default tasks;
