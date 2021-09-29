import React, { FormEvent, useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Image } from 'antd';
// import logo from '../logo.png'

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      <h1>Please Log In</h1>
      {/*<Image width={200} src={logo} alt="logo" />*/}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
