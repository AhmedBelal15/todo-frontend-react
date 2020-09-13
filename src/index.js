import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './tailwind.output.css'
import {Provider} from 'react-redux';
import { Provider as AlertProvider } from 'react-alert'
import AlertMUITemplate from "react-alert-template-mui";
import store from './redux/store'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertMUITemplate}>
    <App />
    </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
