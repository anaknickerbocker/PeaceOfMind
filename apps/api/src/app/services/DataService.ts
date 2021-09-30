import { Alert, AlertHistory, Task, User } from '@peace-of-mind/api-interfaces';
import { PrismaClient } from '@prisma/client';
import { add } from 'date-fns';

export default class DataService {
  private static instance: DataService;
  private prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance() {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  // Users
  createUser(name: string, sms: string, voice: string, email: string) {
    return this.prisma.users.create({
      data: {
        userId: undefined,
        name,
        sms,
        voice,
        email,
      },
    });
  }

  async getAllUsers(): Promise<Array<User>> {
    return this.prisma.users.findMany();
  }

  getUser(userId: number): Promise<User> {
    return this.prisma.users.findFirst({ where: { userId } });
  }

  updateUser(userId: number, changes: Partial<User>) {
    return this.prisma.users.update({
      where: { userId },
      data: { ...changes },
    });
  }

  deleteUser(userId: number) {
    return this.prisma.users.delete({ where: { userId } });
  }

  // Tasks
  createTask(
    userId: number,
    description: string,
    taskDateTime: string,
    complete: boolean,
    recurring: boolean,
    alerts?: Array<Alert>
  ) {
    let createData;
    if (alerts?.length) {
      const newAlerts = alerts.map((alert) => ({
        userId,
        taskId: alert.taskId,
        alertDue: alert.alertDue,
        alertType: alert.alertType,
        alertDestination: alert.alertDestination,
        description,
      }));
      createData = {
        data: {
          taskId: undefined,
          userId,
          description,
          taskDateTime: new Date().toISOString(),
          complete,
          recurring,
          alerts: { createMany: { data: newAlerts } },
        },
        include: {
          alerts: true,
        },
      };
    } else {
      createData = {
        data: {
          taskId: undefined,
          userId,
          description,
          taskDateTime: new Date().toISOString(),
          complete,
          recurring,
        },
      };
    }
    return this.prisma.tasks.create(createData);
  }

  getAllTasksForUser(userId: number, withAlerts: boolean) {
    return withAlerts
      ? this.prisma.tasks.findMany({
          where: { userId },
          include: { alerts: true },
        })
      : this.prisma.tasks.findMany({ where: { userId } });
  }

  getTask(taskId: number) {
    return this.prisma.tasks.findFirst({ where: { taskId } });
  }

  updateTask(taskId: number, changes: Partial<Task>) {
    return this.prisma.tasks.update({
      where: { taskId },
      data: { ...changes },
    });
  }

  deleteTask(taskId: number) {
    return this.prisma.tasks.delete({ where: { taskId } });
  }

  deleteRemainingAlerts(taskId: number) {
    return this.prisma.alerts.deleteMany({ where: { taskId } });
  }

  // Alerts
  async createAlert(
    userId: number,
    taskId: number,
    alertDue: string,
    alertType: 'sms' | 'voice' | 'email',
    alertDestination: string,
    description: string
  ) {
    return this.prisma.alerts.create({
      data: {
        alertId: undefined,
        userId,
        taskId,
        alertDue,
        alertType,
        alertDestination,
        description,
      },
    });
  }

  async getAllAlertsForUser(userId: number) {
    return this.prisma.alerts.findMany({ where: { userId } });
  }

  async getAllAlertsForTask(taskId: number) {
    return this.prisma.alerts.findMany({ where: { taskId } });
  }

  getAlert(alertId: number) {
    return this.prisma.alerts.findFirst({ where: { alertId } });
  }

  updateAlert(alertId: number, changes: Partial<Alert>) {
    return this.prisma.alerts.update({
      where: { alertId },
      data: { ...changes },
    });
  }

  deleteAlert(alertId: number) {
    return this.prisma.alerts.delete({ where: { alertId } });
  }

  // Alert Histories
  createAlertHistory(alert: Alert | Partial<Alert>) {
    return this.prisma.alertHistories.create({
      data: {
        taskId: alert.taskId,
        userId: alert.userId,
        alertId: alert.alertId,
        alertSent: new Date().toISOString(),
        alertType: alert.alertType,
        alertDestination: alert.alertDestination,
      },
    });
  }

  getAllAlertHistoriesForUser(userId: number) {
    return this.prisma.alertHistories.findMany({ where: { userId } });
  }

  async getAllAlertHistoriesForTask(taskId: number) {
    return this.prisma.alertHistories.findMany({ where: { taskId } });
  }

  async getAllAlertHistoriesForAlert(alertId: number) {
    return this.prisma.alertHistories.findMany({ where: { alertId } });
  }

  getAlertHistory(alertId: number) {
    return this.prisma.alertHistories.findFirst({ where: { alertId } });
  }

  updateAlertHistory(alertHistoryId: number, changes: Partial<AlertHistory>) {
    return this.prisma.alertHistories.update({
      where: { alertHistoryId },
      data: { ...changes },
    });
  }

  deleteAlertHistory(alertHistoryId: number) {
    return this.prisma.alertHistories.delete({ where: { alertHistoryId } });
  }

  async getAlertsDueNow() {
    return this.prisma.alerts.findMany({
      where: {
        alertDue: {
          gte: new Date(),
          lt: add(new Date(), { seconds: 60 }),
        },
      },
      orderBy: [{ alertDue: 'desc' }],
    });
  }

  async getAllTasks() {
    return this.prisma.tasks.findMany();
  }

  async getAllAlerts() {
    return this.prisma.alerts.findMany();
  }

  async getAllAlertHistories() {
    return this.prisma.alertHistories.findMany();
  }
}
