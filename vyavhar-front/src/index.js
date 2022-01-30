import React from 'react';
import ReactDOM from 'react-dom';
import {AuthContextProvider} from './context/AuthContext'
import App from './App';
import axios from 'axios'
axios.defaults.baseURL = 'https://cryptic-coast-01230.herokuapp.com/api';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

