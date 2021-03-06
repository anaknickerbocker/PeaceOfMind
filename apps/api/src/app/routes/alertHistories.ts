import express, { Request, Response } from 'express';
import AlertHistoriesService from '../services/AlertHistoriesService';

const alertHistories = express.Router();

alertHistories.post('/', async (req: Request, res: Response) => {
  try {
    const result = await AlertHistoriesService.createAlertHistory(
      Number(req?.query?.userId) || undefined,
      Number(req?.query?.taskId) || undefined,
      Number(req?.query?.alertId) || undefined,
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
      Number(req.query.alertId)
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
      Number(req.params.alertHistoryId)
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
        Number(req.params.alertHistoryId),
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
        Number(req.params.alertHistoryId)
      );
      res.json(result);
    } catch (e) {
      console.error(e);
      res.status(404);
    }
  }
);

export default alertHistories;
