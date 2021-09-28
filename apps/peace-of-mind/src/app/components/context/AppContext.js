import React from 'react'

export default React.createContext({
   id: '',
   setId: (id) => {},
   name: '',
   setName: (name) => {},
   nameSecond: '',
   setNameSecond: (name) => {},
   phone: '',
   setPhone: (phone) => {},
   email: '',
   setEmail: (email) => {},
   taskReminders: [],
   setTaskReminders: (formData) => {},
   profileCreated: false,
   setProfileCreated: (value) => {}

})