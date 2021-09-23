import React, { FormEvent, useState } from 'react';

import './Home.css';

const Home = () => {
  const [eminderOneNumber, setReminderOneNumber] = useState<string | undefined>();
  const [reminderOneMethod, setReminderOneMethod] = useState<string | undefined>();
  const [reminderTwo, setReminderNumberTwo] = useState<string | undefined>();
  const [reminderTwoMethod, setReminderTwoMethod] = useState<string | undefined>();
  const [reminderOneInterval, setReminderOneInterval] = useState<string | undefined>();
  const [reminderTwoInterval, setReminderTwoInterval] = useState<string | undefined>();
  const [taskDescription, setTaskDescription] = useState<string | undefined>();
  const [reminderNumberThree, setReminderNumberThree] = useState<string | undefined>();
  const [reminderThreeInterval, setReminderThreeInterval] = useState<string | undefined>();
  const [reminderThreeMethod, setReminderThreeMethod] = useState<string | undefined>();

  return (
    <div className="task-wrapper">
    <h2>Create Your Task Reminders</h2>
    <div className='input'>
        <p>Task Description: </p>
        <input
            style={{marginLeft: '10px'}}
            type="taskDescription"
            onChange={(e) => setTaskDescription(e.target.value)}
        />
    </div>
      <form>
        <div className='input'>
            <div className='input-style'>
                <input
                    placeholder="#"
                    style={{width: '30px' }}
                    type="reminderOne"
                    onChange={(e) => setReminderOneNumber(e.target.value)}
                />
            </div>
            <select
                style={{marginRight: "10px"}}
                name="selectContactInterval" 
                id="selectList"
                onChange={(e) => setReminderOneInterval(e.target.value)}>
                  <option value="option 1">Minutes</option>
                   <option value="option 2">Hours</option>
                   <option value="option 2">Days</option>
            </select>
            <p style={{marginRight: "10px"}}>After Task Time</p> 
            <select
                name="selectContactMethod" 
                id="selectList"
                onChange={(e) => setReminderOneMethod(e.target.value)}>
                  <option value="option 1">SMS</option>
                   <option value="option 2">Email</option>
                   <option value="option 2">Voice</option>
            </select>
        </div>
        <div className='input'>
            <div className='input-style'>
                <input
                    placeholder="#"
                    style={{width: '30px'}}
                    type="reminderTwo"
                    onChange={(e) => setReminderNumberTwo(e.target.value)}
                />
            </div>
            <select 
                style={{marginRight: "10px"}}
                name="selectContactInterval" 
                id="selectList"
                onChange={(e) => setReminderTwoInterval(e.target.value)}>
                  <option value="option 1">Minutes</option>
                   <option value="option 2">Hours</option>
                   <option value="option 2">Days</option>
            </select>
            <p style={{marginRight: "10px"}}>After Task Time</p> 
            <select
                name="selectContactMethod" 
                id="selectList"
                onChange={(e) => setReminderTwoMethod(e.target.value)}>
              <option value="option 1">SMS</option>
               <option value="option 2">Email</option>
               <option value="option 2">Voice</option>
            </select>
        </div>
        <div className='input'>
            <div className='input-style'>
                <input
                    placeholder="#"
                    style={{width: '30px'}}
                    type="reminderTwo"
                    onChange={(e) => setReminderNumberThree(e.target.value)}
                />
            </div>
            <select 
                style={{marginRight: "10px"}}
                name="selectContactInterval" 
                id="selectList"
                onChange={(e) => setReminderThreeInterval(e.target.value)}>
                  <option value="option 1">Minutes</option>
                   <option value="option 2">Hours</option>
                   <option value="option 2">Days</option>
            </select>
            <p style={{marginRight: "10px"}}>After Task Time</p> 
            <select
                name="selectContactMethod" 
                id="selectList"
                onChange={(e) => setReminderThreeMethod(e.target.value)}>
              <option value="option 1">SMS</option>
               <option value="option 2">Email</option>
               <option value="option 2">Voice</option>
            </select>
        </div>
        <div className='submit'>
          <button type="submit">Save Task</button>
        </div>
      </form>
    </div>
  );
};

export default Home;