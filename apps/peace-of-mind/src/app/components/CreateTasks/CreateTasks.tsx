import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import './CreateTasks.css';
import { TaskList } from '../TaskList/TaskList';
import DataService from '../../services/DataService';
import { add, formatISO } from 'date-fns';
import { Task } from '@peace-of-mind/api-interfaces';
import { BellOutlined } from '@ant-design/icons';
import { Card, Layout, Row, Col, Divider } from 'antd';
import 'antd/dist/antd.css';
import { DatePicker, formatReturnDate } from '@twilio-paste/core/date-picker';
import { TimePicker, formatReturnTime } from '@twilio-paste/core/time-picker';
import { HelpText, Label} from '@twilio-paste/core';
import { Box } from '@twilio-paste/core';

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
  const userId = 1;
  const [reloadTasks, setReloadTasks] = React.useState(true);
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
    if (reloadTasks) {
      DataService.getAllTasks(1)
        .then((res) => res.json())
        .then((res) => setTasks(res));
      setReloadTasks(false);
    }
  }, [reloadTasks]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formData) {
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
          userId,
          alertDue: add(new Date(dueDate), {
            seconds: secondsToAdd,
          }).toISOString(),
          alertType: alert.alertType,
          alertDestination: 'ana.knickerbocker@gmail.com', // Ana's email
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
      {!formData && (
      <Row>
        <Col className="gutter-row">
        <Divider orientation='left'>Create A New Task</Divider>
        <div style={{ backgroundColor: '#FFF6EE', width: '350px'}}>
          <button
            style={{
              borderRadius: '100px',
              marginLeft: '130px',
              paddingTop: '5px',
              paddingBottom: '5px',
            }}
            type="submit"
            onClick={addTask}
          >
            Add Task
          </button>
          </div>
        </Col>
      </Row>
      )}
      {!formData && (
        <Row>
          <Col className="gutter-row">
            <Divider orientation='left' >Current Tasks</Divider>
            <Card style={{ backgroundColor: '#FFF6EE', width: '350px' }}>
              <TaskList tasks={tasks} setTasks={setTasks} />
            </Card>
          </Col>
        </Row>
      )}
      {formData && (
        <form>
        <Row>
          <Col className="gutter-row">
          <Divider orientation='left' >Create A New Task</Divider>
          <Card style={{ backgroundColor: '#FFF6EE', width: '350px'  }}>
            <div className="input">
              <Label htmlFor="taskDescription" required>
                Enter Task Description:

              <input
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
                  setFormData({ ...formData, taskDescription: e.target.value })
                }
              />
              </Label>
              </div>
              <div style={{ marginTop: '30px'}}>
              <Box
                backgroundColor="colorBackgroundSuccessWeakest"
                display="inline-block"
                padding="space40"
              >
                <Label htmlFor="taskDueDate" required>
                  Select Task Due Date:
                </Label>
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
                {/* <HelpText id="taskDueDate">Please select a date.</HelpText> */}
              </Box>
              </div>
              <div style={{ marginTop: '30px'}}>
              <Box
                backgroundColor="colorBackgroundSuccessWeakest"
                display="inline-block"
                padding="space40"
              >
                <Label htmlFor="taskDueTime" required>
                  Select Start time:
                </Label>
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
                {/* <HelpText id="taskDueTime">Please select a time.</HelpText> */}
              </Box>
            </div>
          </Card>
          <Divider orientation='left' >Create Task Alerts</Divider>
          </Col>
        </Row>
          <Card style={{ backgroundColor: '#FFF6EE', width: '350px' }}>
            {formData?.alerts?.map((row, index) => (
              <div>
              <div className="input">
                <div className="input-style">
                  <input
                    value={row.reminderNumber}
                    placeholder=" #"
                    style={{
                      width: '30px',
                      borderRadius: '100px',
                      paddingTop: '5px',
                      paddingBottom: '5px',
                      marginLeft: '10px'
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
                    paddingTop: '5px',
                    paddingBottom: '5px',
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
                <p style={{paddingTop: '10px'}}>After Task Due</p>
                <br />
            </div>
            <div className="input">
                <BellOutlined
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '100px',
                    marginLeft: '50px',
                    marginRight: '30px',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    paddingRight: '5px',
                    paddingLeft: '5px',
                  }}
                />
                <p style={{marginRight: '30px', paddingTop: '8px'}}>Via</p>
                <select
                  value={row.alertType}
                  style={{
                    paddingTop: '5px',
                    paddingBottom: '5px',
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
                <Divider />
              </div>
              
            ))}
            <button
              style={{
                borderRadius: '100px',
                marginTop: '20px',
                marginLeft: '110px',
                paddingTop: '5px',
                paddingBottom: '5px',
              }}
              onClick={(e) => addAlert(e)}
            >
              Add Alert
            </button>
          </Card>
          <div className="submit">
            <button
              type="submit"
              style={{
                borderRadius: '100px',
                marginTop: '20px',
                paddingTop: '5px',
                paddingBottom: '5px',
              }}
              onClick={(e) => handleSubmit(e)}
            >
              Save Task
            </button>
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