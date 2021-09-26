import React, { useState, useContext } from 'react';
import AppContext from './context/AppContext';

export default function Reminders() {
  const [thing, setThing] = useState<string | undefined>();
  const {
    id,
    setId,
    taskReminders
  } = useContext(AppContext)

  console.log(taskReminders)
  
  return (
    <div>
      {JSON.stringify(taskReminders)}
    </div>
  )
}
