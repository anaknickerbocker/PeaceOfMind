import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import { BsFillBellFill } from 'react-icons/bs';

import './CreateTasks.css';
import { TaskList } from '../TaskList/TaskList';
import { initialTasks } from '../TaskList/initialTasks';

const Tasks = () => {
  const [newTask, setNewTask] = useState(false)
  const [formData, setFormData] = useState({
    taskDescription: "",
    reminderOneNumber: "",
    reminderOneMethod: "",
    reminderOneInterval: "",
    reminderNumberTwo: "",
    reminderTwoMethod: "",
    reminderTwoInterval: "",
    reminderNumberThree: "",
    reminderThreeInterval: "",
    reminderThreeMethod: "",
    currentDate: Date().toLocaleString(),
    });

    const {
        id,
        setId,
        name,
        setName,
        taskReminders,
        setTaskReminders,
      } = useContext(AppContext)


  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(formData)
    setTaskReminders([...taskReminders, formData])
    setNewTask(false)
}

const addTask = () => {
    console.log(newTask)
    setNewTask(true)
    console.log(newTask)
}

  return (
    <div className="task-wrapper">
    <TaskList tasks={initialTasks}/>

    {!newTask &&
        <div>
            <h2>Create Your Task Reminders</h2>
            <button
                style={{borderRadius: '100px', marginLeft: '120px', paddingTop: '5px', paddingBottom: '5px'}}
                type="submit"
                onClick={addTask}
            >
                Add Task
            </button>
        </div>
    }
    {newTask === true &&
      <form onSubmit={handleSubmit}>
      <p>Task description: </p>
        <div className='input'>
            <input
                value={formData.taskDescription}
                type="text"
                id='taskDescription'
                name="taskDescription"
                style={{ borderRadius: '100px', paddingTop: '5px', paddingBottom: '5px', paddingRight: '100px'}}
                onChange={(e)=>setFormData({...formData, taskDescription: e.target.value})}
            />
        </div>
        <div className='input'>
            <div className='input-style'>
                <input
                    value={formData.reminderOneNumber}
                    placeholder="  #"
                    style={{width: '30px', borderRadius: '100px', paddingTop: '5px', paddingBottom: '5px', marginTop: '30px' }}
                    type="text"
                    id='reminderOneNumber'
                    name='reminderOneNumber'
                    onChange={(e)=>setFormData({...formData, reminderOneNumber: e.target.value})}
                />
            </div>
            <select
                style={{
                    marginRight: "10px",
                    marginTop: '30px',
                    paddingRight: '20px',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    borderRadius: '100px',
                }}
                name="reminderOneInterval"
                id="reminderOneInterval"
                value={formData.reminderOneInterval}
                onChange={(e)=>setFormData({...formData, reminderOneInterval: e.target.value})}
            >
                    <option value="selectOne">---</option> 
                    <option value="Minutes">Minutes</option>
                   <option value="Hours">Hours</option>
                   <option value="Days">Days</option>
            </select>
            <BsFillBellFill style={{
                backgroundColor: 'white',
                borderRadius: '100px',
                marginLeft: '50px',
                marginRight: '10px',
                paddingTop: '5px',
                paddingBottom: '5px',
                paddingRight: '5px',
                paddingLeft: '5px',
                marginTop: '30px'
            }}
            />
            <select
                value={formData.reminderOneMethod}
                style={{
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    paddingRight: '30px',
                    marginTop: '30px',
                    borderRadius: '100px'
                }}
                name="reminderOneMethod"
                id="reminderOneMethod"
                onChange={(e)=>setFormData({...formData, reminderOneMethod: e.target.value})}
            >
                <option value="selectOne">---</option>
                <option value="SMS">SMS</option>
               <option value="Email">Email</option>
               <option value="Voice">Voice</option>
            </select>
        </div>
        <div className='input'>
            <div className='input-style'>
                <input
                    value={formData.reminderNumberTwo}
                    placeholder="  #"
                    style={{width: '30px', borderRadius: '100px', paddingTop: '5px', paddingBottom: '5px', marginTop: '30px'}}
                    type="text"
                    id='reminderNumberTwo'
                    name='reminderNumberTwo'
                    onChange={ (e)=>setFormData({...formData, reminderNumberTwo: e.target.value})}
                />
            </div>
            <select
                value={formData.reminderTwoInterval}
                style={{
                    marginRight: "10px",
                    marginTop: '30px',
                    paddingRight: '20px',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    borderRadius: '100px',
                }}
                name="reminderTwoInterval"
                id="reminderTwoInterval"
                onChange={(e)=>setFormData({...formData, reminderTwoInterval: e.target.value})}
            >
                <option value="selectOne">---</option> 
                <option value="Minutes">Minutes</option>
                   <option value="Hours">Hours</option>
                   <option value="Days">Days</option>
            </select>
            <BsFillBellFill style={{
                backgroundColor: 'white',
                borderRadius: '100px',
                marginLeft: '50px',
                marginRight: '10px',
                paddingTop: '5px',
                paddingBottom: '5px',
                paddingRight: '5px',
                paddingLeft: '5px',
                marginTop: '30px'
            }}
            />
            <select
                value={formData.reminderTwoMethod}
                style={{
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    paddingRight: '30px',
                    marginTop: '30px',
                    borderRadius: '100px'
                }}
                name="selectContactMethod"
                id="selectList"
                onChange={(e)=>setFormData({...formData, reminderTwoMethod: e.target.value})}
            >
                <option value="selectOne">---</option>   
                <option value="SMS">SMS</option>
               <option value="Email">Email</option>
               <option value="Voice">Voice</option>
            </select>
        </div>
        <div className='input'>
            <div className='input-style'>
                <input
                    value={formData.reminderNumberThree}
                    placeholder='  #'
                    style={{width: '30px', borderRadius: '100px', paddingTop: '5px', paddingBottom: '5px', marginTop: '30px'}}
                    type='text'
                    name='reminderNumberThree'
                    id='reminderNumberThree'
                    onChange={(e)=>setFormData({...formData, reminderNumberThree: e.target.value})}
                />
            </div>
            <select
                value={formData.reminderThreeInterval}
                style={{
                    marginRight: "10px",
                    marginTop: '30px',
                    paddingRight: '20px',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    borderRadius: '100px',
                }}
                name="reminderThreeInterval"
                id="reminderThreeInterval"
                onChange={(e)=>setFormData({...formData, reminderThreeInterval: e.target.value})}
            >
                    <option value="selectOne">---</option>   
                    <option value="Minutes">Minutes</option>
                   <option value="Hours">Hours</option>
                   <option value="Days">Days</option>
            </select>
            <BsFillBellFill style={{
                backgroundColor: 'white',
                borderRadius: '100px',
                marginLeft: '50px',
                marginRight: '10px',
                paddingTop: '5px',
                paddingBottom: '5px',
                paddingRight: '5px',
                paddingLeft: '5px',
                marginTop: '30px'
            }}
            />
            <select
                value={formData.reminderThreeMethod}
                style={{
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    paddingRight: '30px',
                    marginTop: '30px',
                    borderRadius: '100px'
                }}
                name="reminderThreeMethod"
                id="reminderThreeMethod"
                onChange={(e)=>setFormData({...formData, reminderThreeMethod: e.target.value})}
            >
                <option value="selectOne">---</option> 
                <option value="SMS">SMS</option>
               <option value="Email">Email</option>
               <option value="Voice">Voice</option>
            </select>
        </div>
        <div className='submit'>
            <button
                type="submit"
                style={{borderRadius: '100px', marginTop: '20px', paddingTop: '5px', paddingBottom: '5px'}}
            >
                Save Task
            </button>
        </div>
      </form>
    }
    </div>
  );
};

export default Tasks;
