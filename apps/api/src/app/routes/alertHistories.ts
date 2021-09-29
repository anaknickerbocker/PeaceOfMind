import express, { Request, Response } from 'express';
import AlertHistoriesService from '../services/AlertHistoriesService';

const alertHistories = express.Router();

alertHistories.post('/', async (req: Request, res: Response) => {
  try {
    const result = await AlertHistoriesService.createAlertHistory(
      req?.body?.userId || '',
      req?.body?.taskId || '',
      req?.body?.alertId || '',
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

alertHistories.get('/', async (req: Request, res: Response) => {
  try {
    const result = await AlertHistoriesService.getAllAlertHistoriesForAlert(
      req.body.alertId
    );
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(404);
  }
});

alertHistories.get('/:alertHistoryId', async (req: Request, res: Response) => {
  try {
    const result = await AlertHistoriesService.getAlertHistory(
      parseInt(req.params.alertHistoryId)
    );
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(404);
  }
});

alertHistories.patch(
  '/:alertHistoryId',
  async (req: Request, res: Response) => {
    try {
      const changes = {
        alertType: req?.body?.alertType || '',
        alertDestination: req?.body?.alertDestination || '',
        description: req?.body?.description || '',
      };
      const result = await AlertHistoriesService.updateAlertHistory(
        parseInt(req.params.alertHistoryId),
        changes
      );
      res.json(result);
    } catch (e) {
      console.error(e);
      res.status(404);
    }
  }
);

alertHistories.delete(
  '/:alertHistoryId',
  async (req: Request, res: Response) => {
    try {
      const result = await AlertHistoriesService.deleteAlertHistory(
        parseInt(req.params.alertHistoryId)
      );
      res.json(result);
    } catch (e) {
      console.error(e);
      res.status(404);
    }
  }
);

export default alertHistories;
