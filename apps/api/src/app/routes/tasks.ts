import express, { Request, Response } from 'express';
import TasksService from '../services/TasksService';

const tasks = express.Router();

// Create a task
tasks.post('/', async (req: Request, res: Response) => {
  try {
    const result = await TasksService.createTask(
      req.body.userId,
      req.body.description,
      req.body.taskDateTime,
      req.body.recurring || false
    );
    res.json(result);
  } catch {
    res.status(404);
  }
});

// Get all tasks for a user
tasks.get('/', async (req: Request, res: Response) => {
  try {
    const result = await TasksService.getAllTasksForUser(req.body.userId);
    res.json(result);
  } catch {
    res.status(404);
  }
});

// Get one task
tasks.get('/:taskId', async (req: Request, res: Response) => {
  try {
    const result = await TasksService.getTask(req.params.taskId);
    res.json(result);
  } catch {
    res.status(404);
  }
});

// Update a task
tasks.patch('/:taskId', async (req: Request, res: Response) => {
  try {
    const changes = {
      userId: req.body.userId,
      description: req.body.description,
      taskDateTime: req.body.taskDateTime,
      recurring: req.body.recurring,
    };
    const result = await TasksService.updateTask(req.params.taskId, changes);
    res.json(result);
  } catch {
    res.status(404);
  }
});

// Delete a task
tasks.delete('/:taskId', async (req: Request, res: Response) => {
  try {
    const result = await TasksService.deleteTask(req.params.taskId);
    res.json(result);
  } catch {
    res.status(404);
  }
});

export default tasks;
