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

const App = () => {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#E5C2F9' }}>
        <Login setToken={setToken} />
      </div>
    );
  }

  return (
    // <Theme.Provider theme="default">
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#E5C2F9',
        fontFamily: 'Verdana',
      }}
    >
      {/* <DarkMode /> */}
      <GlobalState>
        <BrowserRouter>
          <HeaderLink />
          <h1 style={{ textAlign: 'center' }}> Peace of Mind </h1>
          <Switch>
            <Route exact path="/">
              <Profile />
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
