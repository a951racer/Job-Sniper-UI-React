import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './Redux/store'
//import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
