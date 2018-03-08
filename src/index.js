import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import {ActionCableProvider} from 'react-actioncable-provider';
// import shoppingListItemReducer from 'src/reducers/slackListChannelAndMessageReducer.js';


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ActionCableProvider url={'ws://localhost:3000/cable'}>
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
    </ActionCableProvider>
  </Provider>,
  document.getElementById('root')
);
