import React, { useState } from 'react'
import AppContext from './AppContext';


const GlobalState = ({ children }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [nameSecond, setNameSecond] = useState('');
  const [email, setEmail] = useState([])
  const [phone, setPhone] = useState([])
  const [taskReminders, setTaskReminders] = useState([])
  const [profileCreated, setProfileCreated] = useState(false)

  return (
    <AppContext.Provider
      value={{
        id,
        setId,
        name,
        setName,
        nameSecond,
        setNameSecond,
        email,
        setEmail,
        phone,
        setPhone,
        taskReminders, 
        setTaskReminders,
        profileCreated,
        setProfileCreated
      }}
      
    > {children}
    </AppContext.Provider>
  )
};

export default GlobalState