import React, { FormEvent, useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Image } from 'antd';
// import logo from '../logo.png'
import { Card, Button } from 'antd';
import 'antd/dist/antd.css';

// console.log(logo);

const loginUser = async (credentials: {
  username: string;
  password: string;
}) => {
  return fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};

const Login = (props: { setToken: (userToken: { token: string }) => void }) => {
  const [username, setUserName] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const handleSubmit = async (e: any) => {
    if (username?.length && password?.length) {
      e.preventDefault();
      const token = await loginUser({
        username,
        password,
      });
      props.setToken(token);
    }
  };

  return (
    <div className="login-wrapper">
      <div className='image' style={{marginBottom: '30px', marginTop: '30px'}}>
        <img src={require('./pomlogo.png')} width="300px" height="120px" />
      </div>
      <h1>Please Log In</h1>
      {/*<Image width={200} src={logo} alt="logo" />*/}
      <form>
        <label>
          <p>Username:</p>
          <input
            style={{
              borderRadius: '100px',
              paddingTop: '5px',
              paddingBottom: '5px',
            }}
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          <p style={{ marginTop: '20px' }}>Password:</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              borderRadius: '100px',
              paddingTop: '5px',
              paddingBottom: '5px',
            }}
          />
        </label>
        <div>
          <Button
            style={{
              borderRadius: '100px',
              paddingTop: '5px',
              paddingBottom: '5px',
              marginLeft: '50px',
              marginTop: '30px',
            }}
            type="default"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
