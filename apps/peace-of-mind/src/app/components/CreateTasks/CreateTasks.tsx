import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import './CreateTasks.css';
import { TaskList } from '../TaskList/TaskList';
import DataService from '../../services/DataService';
import { add } from 'date-fns';
import { Task, User } from '@peace-of-mind/api-interfaces';
import { BellOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Input, Layout, Row } from 'antd';
import 'antd/dist/antd.css';
import { DatePicker, formatReturnDate } from '@twilio-paste/core/date-picker';
import { formatReturnTime, TimePicker } from '@twilio-paste/core/time-picker';
import { Box, Label } from '@twilio-paste/core';

export interface AlertData {
  reminderNumber: string;
  alertType: string;
  reminderInterval: string;
  alertDue: string;
}

export interface FormData {
  taskDescription: string;
  taskDueDate: string;
  taskDueTime: string;
  complete: boolean;
  alerts: Array<AlertData>;
}

const { Footer } = Layout;

const CreateTasks = () => {
  const [user, setUser] = React.useState<User>();
  const userId = 1;
  const [reloadTasks, setReloadTasks] = React.useState(true);
  const [initialPage, setInitialPage] = React.useState(true);
  const [tasks, setTasks] = React.useState<Array<Task>>([]);
  const initialFormData: FormData = {
    taskDescription: '',
    taskDueDate: '',
    taskDueTime: '',
    complete: false,
    alerts: [
      {
        reminderNumber: '',
        alertType: '',
        reminderInterval: '',
        alertDue: '',
      },
    ],
  };

  const [formData, setFormData] = useState<FormData>();

  const { id, setId, name, setName, taskReminders, setTaskReminders } =
    useContext(AppContext);

  React.useEffect(() => {
    DataService.getUser(1) // hardcoded as Ana
      .then((res) => res.json())
      .then((res) => {
        setUser({
          userId: res.userId,
          name: res.name,
          sms: res.sms,
          voice: res.voice,
          email: res.email,
        });
      });
  }, []);

  React.useEffect(() => {
    if (reloadTasks) {
      DataService.getAllTasks(1)
        .then((res) => res.json())
        .then((res) => setTasks(res));
      setReloadTasks(false);
    }
  }, [reloadTasks]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setInitialPage(true);
    if (formData && user) {
      const dueDate = Date.parse(
        `${formData.taskDueDate} ${formData.taskDueTime}`
      );
      const newAlerts: {
        alertDue: string;
        alertType: string;
        description: string;
        alertDestination: string;
        userId: number;
      }[] = formData.alerts.map((alert) => {
        let secondsToAdd: number;
        const alertNumber = alert.reminderNumber
          ? parseInt(alert.reminderNumber)
          : 1;
        switch (alert.reminderInterval) {
          case 'Hours':
            secondsToAdd = alertNumber * 60 * 60;
            break;
          case 'Days':
            secondsToAdd = alertNumber * 60 * 60 * 24;
            break;
          case 'Minutes':
          default:
            secondsToAdd = alertNumber * 60;
            break;
        }
        return {
          userId: user.userId,
          alertDue: add(new Date(dueDate), {
            seconds: secondsToAdd,
          }).toISOString(),
          alertType: alert.alertType,
          alertDestination: user[alert.alertType as keyof User] as string,
          description: formData.taskDescription,
        };
      });
      DataService.createTask(userId, formData, newAlerts).then(() => {
        setReloadTasks(true);
        setFormData(initialFormData);
      });
    }
    setTaskReminders([...taskReminders, formData]);
  };

  const addTask = () => {
    setFormData(initialFormData);
    setInitialPage(false);
  };

  const removeTask = (index: number) => {
    setFormData(undefined);
  };

  const addAlert = (e: any) => {
    e.preventDefault();
    if (formData?.alerts) {
      const existingAlerts = formData?.alerts;
      setFormData({
        ...formData,
        alerts: [
          ...existingAlerts,
          {
            reminderNumber: '',
            alertType: '',
            reminderInterval: '',
            alertDue: '',
          },
        ],
      });
    }
  };

  const removeAlert = (index: number) => {
    if (formData) {
      const existingAlerts = formData?.alerts;
      setFormData({
        ...formData,
        alerts: [...existingAlerts.filter((alert, i) => i !== index)],
      });
    }
  };

  const changeHandler = (e: any, field: keyof AlertData, index: number) => {
    e.preventDefault();
    if (formData?.alerts) {
      const existingAlerts = formData?.alerts;
      existingAlerts[index][field] = e?.target?.value;
      setFormData({ ...formData, alerts: [...existingAlerts] });
    }
  };

  return (
    <div className="task-wrapper">
      {initialPage && (
        <Row>
          <Col className="gutter-row">
            <Divider>Create A New Task</Divider>
            <div style={{ backgroundColor: '#FFF6EE', width: '350px' }}>
              <Button
                style={{
                  borderRadius: '100px',
                  marginLeft: '130px',
                  paddingTop: '5px',
                  paddingBottom: '5px',
                }}
                type="default"
                onClick={addTask}
              >
                Add Task
              </Button>
            </div>
          </Col>
        </Row>
      )}
      {initialPage && (
        <Row>
          <Col className="gutter-row">
            <Divider>Current Tasks</Divider>
            <Card style={{ backgroundColor: '#FFF6EE', width: '350px' }}>
              <TaskList tasks={tasks} setTasks={setTasks} />
            </Card>
          </Col>
        </Row>
      )}
      {formData && !initialPage && (
        <form>
          <Row>
            <Col className="gutter-row">
              <Divider>Create A New Task</Divider>
              <Card style={{ backgroundColor: '#FFF6EE', width: '350px' }}>
                <div className="input">
                  <Label htmlFor="taskDescription" required>
                    Enter Task Description:
                    <Input
                      value={formData.taskDescription}
                      type="text"
                      id="taskDescription"
                      name="taskDescription"
                      style={{
                        borderRadius: '100px',
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        paddingRight: '100px',
                      }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          taskDescription: e.target.value,
                        })
                      }
                    />
                  </Label>
                </div>
                <div style={{ marginTop: '30px' }}>
                  <Label htmlFor="taskDueDate" required>
                    Select Task Due Date:
                  </Label>
                  <Box
                    display="inline-block"
                    padding="space40"
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '100px',
                      paddingTop: '5px',
                      paddingBottom: '5px',
                    }}
                  >
                    <DatePicker
                      aria-describedby="taskDueDate"
                      id="taskDueDate"
                      name="taskDueDate"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          taskDueDate: formatReturnDate(e.target.value, 'P'),
                        })
                      }
                      required
                    />
                  </Box>
                </div>
                <div style={{ marginTop: '30px' }}>
                  <Label htmlFor="taskDueTime" required>
                    Select Start time:
                  </Label>
                  <Box
                    display="inline-block"
                    padding="space40"
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '100px',
                      paddingLeft: '30px',
                      paddingTop: '5px',
                      paddingBottom: '5px',
                    }}
                  >
                    <TimePicker
                      aria-describedby="taskDueTime"
                      id="taskDueTime"
                      name="taskDueTime"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          taskDueTime: formatReturnTime(e.target.value, 'p'),
                        })
                      }
                      required
                    />
                  </Box>
                </div>
              </Card>
              <Divider>Create Task Alerts</Divider>
            </Col>
          </Row>
          <Card style={{ backgroundColor: '#FFF6EE', width: '350px' }}>
            <p>Enter Notification Interval and Method:</p>
            {formData?.alerts?.map((row, index) => (
              <div className="input">
                <div className="input-style">
                  <Input
                    value={row.reminderNumber}
                    placeholder="#"
                    style={{
                      width: '30px',
                      borderRadius: '100px',
                      paddingTop: '2px',
                      paddingBottom: '2px',
                      paddingRight: '2px',
                      marginLeft: '10px',
                    }}
                    type="text"
                    id={`reminderNumber-${index}`}
                    key={`reminderNumber-${index}`}
                    name="reminderNumber"
                    onChange={(e) => changeHandler(e, `reminderNumber`, index)}
                  />
                </div>
                <select
                  style={{
                    marginRight: '10px',
                    paddingRight: '20px',
                    paddingTop: '2px',
                    paddingBottom: '2px',
                    borderRadius: '100px',
                  }}
                  name="reminderInterval"
                  id={`reminderInterval-${index}`}
                  key={`reminderInterval-${index}`}
                  value={row.reminderInterval}
                  onChange={(e) => changeHandler(e, `reminderInterval`, index)}
                >
                  <option value="selectOne">---</option>
                  <option value="Minutes">Minutes</option>{' '}
                  <option value="Hours">Hours</option>{' '}
                  <option value="Days">Days</option>
                </select>
                <br />
                <BellOutlined
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '100px',
                    marginLeft: '20px',
                    marginRight: '10px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    paddingRight: '8px',
                    paddingLeft: '8px',
                  }}
                />
                <select
                  value={row.alertType}
                  style={{
                    paddingTop: '2px',
                    paddingBottom: '2px',
                    paddingRight: '30px',
                    borderRadius: '100px',
                  }}
                  name="alertType"
                  id={`alertType-${index}`}
                  key={`alertType-${index}`}
                  onChange={(e) => changeHandler(e, `alertType`, index)}
                >
                  <option value="selectOne">---</option>
                  <option value="sms">SMS</option>
                  <option value="email">Email</option>{' '}
                  <option value="voice">Voice</option>
                </select>
              </div>
            ))}
            <Button
              type="default"
              style={{
                borderRadius: '100px',
                marginTop: '20px',
                marginLeft: '140px',
                paddingTop: '5px',
                paddingBottom: '5px',
              }}
              icon={<PlusOutlined />}
              onClick={(e) => addAlert(e)}
            />
          </Card>
          <div className="submit">
            <Button
              type="default"
              style={{
                borderRadius: '100px',
                marginTop: '20px',
                paddingTop: '5px',
                paddingBottom: '5px',
              }}
              onClick={(e) => handleSubmit(e)}
            >
              Save Task
            </Button>
          </div>
        </form>
      )}
      <Footer
        style={{
          textAlign: 'center',
          backgroundColor: '#FFF6EE',
          width: '400px',
        }}
      >
        “Nothing is worth more than laughter. It is strength to laugh and to
        abandon oneself, to be light.” – Frida Kahlo
      </Footer>
    </div>
  );
};

export default CreateTasks;
