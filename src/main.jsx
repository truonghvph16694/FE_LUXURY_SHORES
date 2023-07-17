import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "antd/dist/reset.css";
import { store } from '../src/app/store.js'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter />
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer />
  </React.StrictMode>
)
