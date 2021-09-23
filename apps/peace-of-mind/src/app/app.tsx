import React, { useEffect, useState } from 'react';
// import { Message } from '@peace-of-mind/api-interfaces';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile';
import Reminders from './components/Reminders';
import Home from './components/Home';
import Login from './components/Login/Login';
import useToken from './components/useToken';
import HeaderLink from './components/Header'
import DarkMode from './components/DarkMode';

const App = () => {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="wrapper">
      <DarkMode />
      <BrowserRouter>
        <HeaderLink />
        <h1 style={{textAlign: "center" }}> PEACE OF MIND </h1>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/profile">
            <Profile /> 
          </Route>
          {/* <Route path="/reminders">
            <Reminders />
          </Route> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
