import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { Theme } from '@twilio-paste/core/theme';
// import DarkMode from './components/DarkMode/DarkMode';
import GlobalState from './components/context/GlobalState';
import HeaderLink from './components/Header/Header';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import React from 'react';
import Reminders from './components/Reminders';
import Tasks from './components/CreateTasks/CreateTasks';
import useToken from './components/useToken';

const App = () => {
  const { token, setToken } = useToken();

  if (!token) {
    return (
    <div style={{ minHeight: '100vh', backgroundColor: '#E5C2F9'}} >
    <Login setToken={setToken} />
    </div>
    );
  }

  return (
    // <Theme.Provider theme="default">
    <div style={{ minHeight: '100vh', backgroundColor: '#E5C2F9', fontFamily: 'Verdana'}} >
      {/* <DarkMode /> */}
      <GlobalState>
        <BrowserRouter>
          <HeaderLink />
          <h1 style={{ textAlign: 'center' }}> PEACE OF MIND </h1>
          <Switch>
            <Route exact path="/">
              <Profile />
            </Route>
            <Route path="/tasks">
              <Tasks />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/reminders">
              <Reminders />
            </Route>
          </Switch>
        </BrowserRouter>
      </GlobalState>
    </div>
  //  </Theme.Provider>
  );
};

export default App;
