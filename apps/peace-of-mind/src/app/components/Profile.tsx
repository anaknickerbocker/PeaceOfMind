import React, { FormEvent, useState } from 'react';

const Profile = () => {
  const [firstName, setFirstName] = useState<string | undefined>();
  const [lastName, setLastName] = useState<string | undefined>();
  const [contactMethod, setContactMethod] = useState<string | undefined>();
  const [contactDetails, setContactDetails] = useState<string | undefined>();

  return (
    <div className="profile-wrapper">
    <h2>User Profile Page</h2>
    <p>Please create your user profile</p>
      <form>
        <label>
          <p>First Name</p>
          <input
            type="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          <p>Last Name</p>
          <input
            type="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          <p>Prefered Contact Method</p>
          <select 
            name="selectContactMethod" 
            id="selectList"
            onChange={(e) => setContactMethod(e.target.value)}>
            <option value="option 1">SMS</option>
            <option value="option 2">Email</option>
            <option value="option 2">Voice</option>
          </select>
        </label>
        <label>
          <p>Contact Details</p>
          <input
            type="contactDetails"
            placeholder="Enter Phone or Email"
            onChange={(e) => setContactDetails(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;