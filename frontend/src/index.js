import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserLoggedProvider from './Context/UserLogged';

ReactDOM.render(
  <React.StrictMode>
    <UserLoggedProvider>
      <App />
    </UserLoggedProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

