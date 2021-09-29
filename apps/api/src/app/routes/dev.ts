import express, { Request, Response } from 'express';
import DataService from '../services/DataService';

const dev = express.Router();

dev.get('/users', async (req: Request, res: Response) => {
  try {
    const dataService = DataService.getInstance();
    const result = await dataService.getAllUsers();
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(404);
  }
});

dev.get('/tasks', async (req: Request, res: Response) => {
  try {
    const dataService = DataService.getInstance();
    const result = await dataService.getAllTasks();
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(404);
  }
});

dev.get('/alerts', async (req: Request, res: Response) => {
  try {
    const dataService = DataService.getInstance();
    const result = await dataService.getAllAlerts();
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(404);
  }
});

dev.get('/alertHistories', async (req: Request, res: Response) => {
  try {
    const dataService = DataService.getInstance();
    const result = await dataService.getAllAlertHistories();
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(404);
  }
});

export default dev;
