import React, { useEffect, useState } from 'react';
import { Message } from '@peace-of-mind/api-interfaces';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Preferences from './components/Preferences';
import Login from './components/Login/Login';

export const App = () => {
  const [token, setToken] = useState('');
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  if (!token) {
    console.log('m.message :>> ', m.message);
    return <Login setToken={setToken} />;
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to peace-of-mind!</h1>
        <img
          width="450"
          src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
          alt="Nx - Smart, Extensible Build Framework"
        />
      </div>
      <div className="wrapper">
        <h1>Application</h1>
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/preferences">
              <Preferences />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
