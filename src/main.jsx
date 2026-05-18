import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.jsx';

window.React = React;
window.ReactDOM = ReactDOM;
document.body.style.margin = '0';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
