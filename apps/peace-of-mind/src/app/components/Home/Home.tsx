import React, { FormEvent, useState } from 'react';

import './Home.css';

const Home = () => {
  const [formData, setFormData] = useState({
    taskDescription: "",
    currentDate: Date().toLocaleString(),
    reminderOneNumber: "",
    reminderOneMethod: "",
    reminderOneInterval: "",
    reminderNumberTwo: "",
    reminderTwoMethod: "",
    reminderTwoInterval: "",
    reminderNumberThree: "",
    reminderThreeInterval: "",
    reminderThreeMethod: ""
    });

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(formData)
}

  return (
    <div className="task-wrapper">
    <h2>Create Your Task Reminders</h2>
      <form onSubmit={handleSubmit}>
        <div className='input'>
            <p>Task Description: </p>
            <input
                value={formData.taskDescription}
                type="text"
                id='taskDescription'
                name="taskDescription"
                style={{marginLeft: '10px'}}
                onChange={(e)=>setFormData({...formData, taskDescription: e.target.value})}
            />
        </div>
        <div className='input'>
            <div className='input-style'>
                <input
                    value={formData.reminderOneNumber}
                    placeholder="#"
                    style={{width: '30px' }}
                    type="text"
                    id='reminderOneNumber'
                    name='reminderOneNumber'
                    onChange={(e)=>setFormData({...formData, reminderOneNumber: e.target.value})}
                />
            </div>
            <select
                style={{marginRight: "10px"}}
                name="reminderOneInterval" 
                id="reminderOneInterval"
                value={formData.reminderOneInterval}
                onChange={(e)=>setFormData({...formData, reminderOneInterval: e.target.value})}
            >
                  <option value="Minutes">Minutes</option>
                   <option value="Hours">Hours</option>
                   <option value="Days">Days</option>
            </select>
            <p style={{marginRight: "10px"}}>After Task Time</p> 
            <select
                name="reminderOneMethod" 
                id="reminderOneMethod"
                value={formData.reminderOneMethod}
                onChange={(e)=>setFormData({...formData, reminderOneMethod: e.target.value})}
            >
              <option value="SMS">SMS</option>
               <option value="Email">Email</option>
               <option value="Voice">Voice</option>
            </select>
        </div>
        <div className='input'>
            <div className='input-style'>
                <input
                    value={formData.reminderNumberTwo}
                    placeholder="#"
                    style={{width: '30px'}}
                    type="text"
                    id='reminderNumberTwo'
                    name='reminderNumberTwo'
                    onChange={(e)=>setFormData({...formData, reminderNumberTwo: e.target.value})}
                />
            </div>
            <select 
                value={formData.reminderTwoInterval}
                style={{marginRight: "10px"}}
                name="reminderTwoInterval" 
                id="reminderTwoInterval"
                onChange={(e)=>setFormData({...formData, reminderTwoInterval: e.target.value})}
            >
                  <option value="Minutes">Minutes</option>
                   <option value="Hours">Hours</option>
                   <option value="Days">Days</option>
            </select>
            <p style={{marginRight: "10px"}}>After Task Time</p> 
            <select
                value={formData.reminderTwoMethod}
                name="selectContactMethod" 
                id="selectList"
                onChange={(e)=>setFormData({...formData, reminderTwoMethod: e.target.value})}
            >
              <option value="SMS">SMS</option>
               <option value="Email">Email</option>
               <option value="Voice">Voice</option>
            </select>
        </div>
        <div className='input'>
            <div className='input-style'>
                <input
                    value={formData.reminderNumberThree}
                    placeholder='#'
                    style={{width: '30px'}}
                    type='text'
                    name='reminderNumberThree'
                    id='reminderNumberThree'
                    onChange={(e)=>setFormData({...formData, reminderNumberThree: e.target.value})}
                />
            </div>
            <select 
                value={formData.reminderThreeInterval}
                style={{marginRight: "10px"}}
                name="reminderThreeInterval" 
                id="reminderThreeInterval"
                onChange={(e)=>setFormData({...formData, reminderThreeInterval: e.target.value})}
            >
                  <option value="Minutes">Minutes</option>
                   <option value="Hours">Hours</option>
                   <option value="Days">Days</option>
            </select>
            <p style={{marginRight: "10px"}}>After Task Time</p> 
            <select
                value={formData.reminderThreeMethod}
                name="reminderThreeMethod" 
                id="reminderThreeMethod"
                onChange={(e)=>setFormData({...formData, reminderThreeMethod: e.target.value})}
            >
              <option value="SMS">SMS</option>
               <option value="Email">Email</option>
               <option value="Voice">Voice</option>
            </select>
        </div>
        <div className='submit'>
            <button 
                type="submit"
            >
                Save Task
            </button>
        </div>
      </form>
    </div>
  );
};

export default Home;