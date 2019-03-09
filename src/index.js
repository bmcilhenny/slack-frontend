import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import { ActionCableProvider } from 'react-actioncable-provider';
import { ActionCableAPIURL } from './constants';

const store = configureStore();

ReactDOM.render(
  <ActionCableProvider url={ActionCableAPIURL}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ActionCableProvider>,
  document.getElementById('root')
);
