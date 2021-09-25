import express, { Request, Response } from 'express';
import AlertsService from '../services/AlertsService';

const alerts = express.Router();

alerts.post('/', async (req: Request, res: Response) => {
  try {
    const result = await AlertsService.createAlert(
      req?.body?.userId || '',
      req?.body?.taskId || '',
      req?.body?.alertDue || '',
      req?.body?.alertType || '',
      req?.body?.alertDestination || '',
      req?.body?.description || ''
    );
    res.json(result);
  } catch {
    res.status(404);
  }
});

alerts.get('/', async (req: Request, res: Response) => {
  try {
    const result = await AlertsService.getAllAlertsForTask(req.body.taskId);
    res.json(result);
  } catch {
    res.status(404);
  }
});

alerts.get('/:alertId', async (req: Request, res: Response) => {
  try {
    const result = await AlertsService.getAlert(req.params.alertId);
    res.json(result);
  } catch {
    res.status(404);
  }
});

alerts.patch('/:alertId', async (req: Request, res: Response) => {
  try {
    const changes = {};
    const result = await AlertsService.updateAlert(req.params.alertId, changes);
    res.json(result);
  } catch {
    res.status(404);
  }
});

alerts.delete('/:alertId', async (req: Request, res: Response) => {
  try {
    const result = await AlertsService.deleteAlert(req.params.alertId);
    res.json(result);
  } catch {
    res.status(404);
  }
});

export default alerts;
