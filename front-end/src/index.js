import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import './reset.css'
import './index.css';
import App from './App';
import flexible from 'flexible.js'

import store from './store'

flexible();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

