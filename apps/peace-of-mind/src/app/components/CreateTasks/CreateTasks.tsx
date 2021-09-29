import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import { BsFillBellFill } from 'react-icons/bs';

import './CreateTasks.css';
import { TaskList } from '../TaskList/TaskList';
import DataService from '../../services/DataService';
import { add } from 'date-fns';
import { Task } from '@peace-of-mind/api-interfaces';
import {BellOutlined} from '@ant-design/icons';
import "antd/dist/antd.css";

export interface AlertData {
  reminderNumber: string;
  alertType: string;
  reminderInterval: string;
  alertDue: string;
}

export interface FormData {
  taskDescription: string;
  taskDateTime: string;
  complete: boolean;
  alerts: Array<AlertData>;
}

const CreateTasks = () => {
  const userId = 1;
  const [reloadTasks, setReloadTasks] = React.useState(true);
  const [tasks, setTasks] = React.useState<Array<Task>>([]);
  const initialFormData: FormData = {
    taskDescription: '',
    taskDateTime: '',
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
      const newAlerts: {
        alertDue: string;
        alertType: string;
        description: string;
        alertDestination: string;
        userId: number;
      }[] = formData.alerts.map((alert) => ({
        userId,
        alertDue: add(new Date(), { seconds: 60 }).toISOString(),
        alertType: alert.alertType,
        alertDestination: 'ana.knickerbocker@gmail.com', // Ana's email
        description: formData.taskDescription,
      }));
      const taskResponse = DataService.createTask(
        userId,
        formData,
        newAlerts
      ).then(() => {
        setFormData(undefined);
        setReloadTasks(true);
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

  const addAlert = () => {
    if (formData) {
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
    if (formData?.alerts) {
      const existingAlerts = formData?.alerts;
      existingAlerts[index][field] = e?.target?.value;
      setFormData({ ...formData, alerts: [...existingAlerts] });
    }
  };

  // eslint-disable-next-line no-shadow
  // const PrettyDiv = (props: { data: Record<string, unknown> }): JSX.Element => (
  //   <div>
  //     <pre>{JSON.stringify(props.data, null, 2)}</pre>
  //   </div>
  // );

  return (
    <div className="task-wrapper">
      {/*<PrettyDiv data={{ formData }} />*/}
      <TaskList tasks={tasks} setTasks={setTasks} />
      <div>
        <h2>Create a New Task</h2>
        <button
          style={{
            borderRadius: '100px',
            marginLeft: '120px',
            paddingTop: '5px',
            paddingBottom: '5px',
          }}
          type="submit"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      {formData && (
        <form onSubmit={handleSubmit}>
          <p>Task description: </p>
          <div className="input">
            <input
              value={formData.taskDescription}
              type="text"
              id={'taskDescription'}
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
          </div>
          <h2>Create Alerts for Your Task</h2>
          {formData?.alerts?.map((row, index) => (
            <div className="input">
              <div className="input-style">
                <input
                  value={row.reminderNumber}
                  placeholder="  #"
                  style={{
                    width: '30px',
                    borderRadius: '100px',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    marginTop: '30px',
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
                  marginTop: '30px',
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
              <BellOutlined
                style={{
                  backgroundColor: 'white',
                  borderRadius: '100px',
                  marginLeft: '50px',
                  marginRight: '10px',
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  paddingRight: '5px',
                  paddingLeft: '5px',
                  marginTop: '30px',
                }}
              />
              <select
                value={row.alertType}
                style={{
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  paddingRight: '30px',
                  marginTop: '30px',
                  borderRadius: '100px',
                }}
                name="reminderMethod"
                id={`reminderMethod-${index}`}
                key={`reminderMethod-${index}`}
                onChange={(e) => changeHandler(e, `alertType`, index)}
              >
                <option value="selectOne">---</option>
                <option value="sms">SMS</option>
                <option value="email">Email</option>{' '}
                <option value="voice">Voice</option>
              </select>
            </div>
          ))}
          <button
            style={{
              borderRadius: '100px',
              marginLeft: '120px',
              paddingTop: '5px',
              paddingBottom: '5px',
            }}
            type="submit"
            onClick={addAlert}
          >
            Add Alert
          </button>
          <div className="submit">
            <button
              type="submit"
              style={{
                borderRadius: '100px',
                marginTop: '20px',
                paddingTop: '5px',
                paddingBottom: '5px',
              }}
            >
              Save Task
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateTasks;
