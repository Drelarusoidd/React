import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthContainer from './containers/AuthContainer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContainer />
  </React.StrictMode>
);
