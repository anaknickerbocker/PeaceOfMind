import React, { FormEvent, useState, useContext } from 'react';
import AppContext from '../context/AppContext';

import './Profile.css';

const Profile = () => {
  const [firstName, setFirstName] = useState<string | undefined>();
  const [lastName, setLastName] = useState<string | undefined>();
  const [phoneDetails, setPhoneDetails] = useState<string | undefined>();
  const [emailDetails, setEmailDetails] = useState<string | undefined>();
  
  const {
    id,
    setId,
    name, 
    setName
  } = useContext(AppContext)

  console.log(id)

  const handleSubmit = () => {
    if (firstName) {
      setName(firstName)
    }
  }
  
  return (
    <div className="profile-wrapper">
    {id}
    <h2>Create Your User Profile</h2>
        <label>
          <p>First Name</p>
          <input
            style={{borderRadius: '100px', paddingTop: '5px', paddingBottom: '5px'}}
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          <p>Last Name</p>
          <input
            style={{borderRadius: '100px', paddingTop: '5px', paddingBottom: '5px'}}
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          <p>Email Details</p>
          <input
            style={{borderRadius: '100px', paddingTop: '5px', paddingBottom: '5px'}}
            type="text"
            onChange={(e) => setEmailDetails(e.target.value)}
          />
        </label>
        <label>
          <p>Phone Details</p>
          <input
            style={{borderRadius: '100px', paddingTop: '5px', paddingBottom: '5px'}}
            type="text"
            onChange={(e) => setPhoneDetails(e.target.value)}
          />
        </label>
        <div className='submit'>
          <button 
            style={{borderRadius: '100px', paddingTop: '5px', paddingBottom: '5px'}}
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
    </div>
  );
};

export default Profile;