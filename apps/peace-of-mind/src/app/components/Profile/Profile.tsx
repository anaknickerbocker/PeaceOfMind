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
      {/* <form> */}
        <label>
          <p>First Name</p>
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          <p>Last Name</p>
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          <p>Contact Details</p>
          <input
            type="text"
            placeholder="Enter Email"
            onChange={(e) => setEmailDetails(e.target.value)}
          />
        </label>
        <label>
          <p>Phone Details</p>
          <input
            type="text"
            placeholder="Enter Phone"
            onChange={(e) => setPhoneDetails(e.target.value)}
          />
        </label>
        <div className='submit'>
          <button 
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      {/* </form> */}
    </div>
  );
};

export default Profile;