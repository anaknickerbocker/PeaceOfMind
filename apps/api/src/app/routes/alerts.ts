import express, { Request, Response } from 'express';
import AlertsService from '../services/AlertsService';

const alerts = express.Router();

alerts.post('/', async (req: Request, res: Response) => {
  try {
    const result = await AlertsService.createAlert(
      Number(req?.query?.userId) || undefined,
      Number(req?.query?.taskId) || undefined,
      req?.body?.alertDue || '',
      req?.body?.alertType || '',
      req?.body?.alertDestination || '',
      req?.body?.description || ''
    );
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(404);
  }
});

alerts.get('/', async (req: Request, res: Response) => {
  try {
    const result = await AlertsService.getAllAlertsForTask(
      Number(req.query.taskId)
    );
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(404);
  }
});

alerts.get('/:alertId', async (req: Request, res: Response) => {
  try {
    const result = await AlertsService.getAlert(Number(req.params.alertId));
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(404);
  }
});

alerts.patch('/:alertId', async (req: Request, res: Response) => {
  try {
    const changes = {
      alertDestination: req.body.alertDestination || '',
      alertDue: req.body.alertDue || '',
      alertType: req.body.alertType || '',
      description: req.body.description || '',
    };
    const result = await AlertsService.updateAlert(
      Number(req.params.alertId),
      changes
    );
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(404);
  }
});

alerts.delete('/:alertId', async (req: Request, res: Response) => {
  try {
    const result = await AlertsService.deleteAlert(Number(req.params.alertId));
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(404);
  }
});

export default alerts;
