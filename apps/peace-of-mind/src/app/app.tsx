import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { Theme } from '@twilio-paste/core/theme';
// import DarkMode from './components/DarkMode/DarkMode';
import React from 'react';
import GlobalState from './components/context/GlobalState';
import HeaderLink from './components/Header/Header';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Tracking from './components/Tracking/Tracking';
import Reminders from './components/Reminders/Reminders';
import CreateTasks from './components/CreateTasks/CreateTasks';
import useToken from './components/useToken';
import {Menu, Layout, Card} from 'antd';
import 'antd/dist/antd.css'

const { Footer, Header } = Layout

import './app.css';

const App = () => {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FFF6EE' }}>
        <Login setToken={setToken} />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FFF6EE',
        fontFamily: 'Verdana',
      }}
    >
      <GlobalState>
        <BrowserRouter>
            <HeaderLink />
          <Switch>
            <Route exact path="/">
              <CreateTasks />
            </Route>
            <Route path="/tasks">
              <CreateTasks />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/reminders">
              <Reminders />
            </Route>
            <Route path="/tracking">
              <Tracking />
            </Route>
          </Switch>
        </BrowserRouter>
      </GlobalState>
    </div>
    //  </Theme.Provider>
  );
};

export default App;
