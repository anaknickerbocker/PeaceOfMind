import React, { useState } from 'react'
import AppContext from './AppContext';


const GlobalState = ({ children }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [taskReminders, setTaskReminders] = useState([])

  return (
    <AppContext.Provider
      value={{
        id,
        setId,
        name,
        setName,
        taskReminders, 
        setTaskReminders,
      }}
      
    > {children}
    </AppContext.Provider>
  )
};

export default GlobalState