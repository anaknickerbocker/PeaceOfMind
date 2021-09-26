import React from 'react'

export default React.createContext({
   id: '',
   setId: (id) => {},
   name: '',
   setName: (name) => {},
   taskReminders: [],
   setTaskReminders: (formData) => {},

})