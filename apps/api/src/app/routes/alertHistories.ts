import express, { Request, Response } from 'express';
import AlertHistoriesService from '../services/AlertHistoriesService';

const alertHistories = express.Router();

alertHistories.post('/', async (req: Request, res: Response) => {
  try {
    const result = await AlertHistoriesService.createAlertHistory(
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

alertHistories.get('/', async (req: Request, res: Response) => {
  try {
    const result = await AlertHistoriesService.getAllAlertHistoriesForUser(
      req.body.userId
    );
    res.json(result);
  } catch {
    res.status(404);
  }
});

alertHistories.get('/', async (req: Request, res: Response) => {
  try {
    const result = await AlertHistoriesService.getAllAlertHistoriesForTask(
      req.body.taskId
    );
    res.json(result);
  } catch {
    res.status(404);
  }
});

alertHistories.get('/', async (req: Request, res: Response) => {
  try {
    const result = await AlertHistoriesService.getAllAlertHistoriesForAlert(
      req.body.alertId
    );
    res.json(result);
  } catch {
    res.status(404);
  }
});

alertHistories.get('/:alertHistoryId', async (req: Request, res: Response) => {
  try {
    const result = await AlertHistoriesService.getAlertHistory(
      req.params.alertHistoryId
    );
    res.json(result);
  } catch {
    res.status(404);
  }
});

alertHistories.patch(
  '/:alertHistoryId',
  async (req: Request, res: Response) => {
    try {
      const changes = {};
      const result = await AlertHistoriesService.updateAlertHistory(
        req.params.alertId,
        changes
      );
      res.json(result);
    } catch {
      res.status(404);
    }
  }
);

alertHistories.delete(
  '/:alertHistoryId',
  async (req: Request, res: Response) => {
    try {
      const result = await AlertHistoriesService.deleteAlertHistory(
        req.params.alertId
      );
      res.json(result);
    } catch {
      res.status(404);
    }
  }
);

export default alertHistories;
