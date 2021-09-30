import React, { FormEvent, useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import {Card, Button, Layout, Row, Col, Divider} from 'antd';
import "antd/dist/antd.css";
import { Image } from 'antd';

const { Footer } = Layout

// import { UserIcon } from '@twilio-paste/icons/esm/UserIcon';
// import { InformationIcon } from '@twilio-paste/icons/esm/InformationIcon';

import './Profile.css';

const Profile = () => {
  // const [profileCreated, setProfileCreated] = useState(false)
  const [firstName, setFirstName] = useState<string | undefined>();
  const [lastName, setLastName] = useState<string | undefined>();
  const [phoneDetails, setPhoneDetails] = useState<string | undefined>();
  const [emailDetails, setEmailDetails] = useState<string | undefined>();
  
  const {
    name,
    setName,
    nameSecond,
    setNameSecond,
    email,
    setEmail,
    phone,
    setPhone,
    profileCreated, 
    setProfileCreated
  } = useContext(AppContext)

  const handleSubmit = () => {
      setName(firstName)
      setNameSecond(lastName)
      setEmail(emailDetails)
      setPhone(phoneDetails)
      setProfileCreated(true)
  }

  const handleEdit = () => {
    setProfileCreated(false)
    setFirstName(name)
    setLastName(nameSecond)
    setPhoneDetails(phone)
    setEmailDetails(email)


}

  return (
    <div className="profile-wrapper">
    {profileCreated && (
      <Row>
        <Col className="gutter-row">
          <Divider orientation='left'>User Profile</Divider>
          <Card
            style={{backgroundColor: '#FFF6EE', width: '350px'}}
          >
            <p>First name: {name}</p>
            <p>Last name: {nameSecond}</p>
            <p>Email: {email}</p>
            <p>Phone number: {phone}</p>
          </Card>
          <Button 
              style={{borderRadius: '100px', paddingTop: '5px', paddingBottom: '5px', marginLeft: '120px', marginTop: '30px'}}
              type="default"
              onClick={handleEdit}
            >
              Edit Profile
          </Button >
        </Col>
      </Row>
    )}
    {!profileCreated && (
            <Row>
            <Col className="gutter-row">
              <Divider>Create Your User Profile</Divider>
    <div>
      <Card
          // title="Create Your User Profile!"
          style={{backgroundColor: '#FFF6EE', fontFamily: 'Verdana', width: '350px'}}
      >
      {/* <h2>Create Your User Profile!</h2> */}
        <label>
          <p style={{marginLeft: '40px'}}>First name:</p>
          <input
            value={firstName}
            style={{borderRadius: '100px', paddingTop: '5px', marginLeft: '40px', paddingBottom: '5px', paddingRight: '30px'}}
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          <p style={{marginTop: '20px', marginLeft: '40px'}}>Last name:</p>
          <input
            value={lastName}
            style={{borderRadius: '100px', paddingTop: '5px', marginLeft: '40px', paddingBottom: '5px', paddingRight: '30px'}}
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          <p style={{marginTop: '20px', marginLeft: '40px'}}>Email details:</p>
          <input
            value={emailDetails}
            style={{borderRadius: '100px', paddingTop: '5px', marginLeft: '40px', paddingBottom: '5px', paddingRight: '30px'}}
            type="text"
            onChange={(e) => setEmailDetails(e.target.value)}
          />
        </label>
        <label>
          <p style={{marginTop: '20px', marginLeft: '40px'}}>Phone details:</p>
          <input
            value={phoneDetails}
            style={{borderRadius: '100px', paddingTop: '5px', marginLeft: '40px', paddingBottom: '5px', paddingRight: '30px'}}
            type="text"
            onChange={(e) => setPhoneDetails(e.target.value)}
          />
        </label>
      </Card>
      <div >
          <Button 
             style={{borderRadius: '100px', paddingTop: '5px', paddingBottom: '5px', marginLeft: '120px', marginTop: '30px'}}
             type ="default"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          {/* <InformationIcon decorative={false} title="Description of icon" />
          <UserIcon decorative={false} title="Description of icon" /> */}
        </div>
      </div>
      </Col>
      </Row>
    )}

    <Footer style={{ textAlign: 'center', backgroundColor: '#FFF6EE', width: '400px'}}>
    “I really think a champion is defined not by their wins but by how they can recover when they fall.” – Serena Williams
    </Footer>
      
    </div>
    
     
  );
};

export default Profile;
