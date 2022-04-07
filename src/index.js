import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import './assets/css/main.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from './reducers/index';

const store = createStore(allReducers);

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);
