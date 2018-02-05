import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter, Route } from 'react-router-dom';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import {ApplicationCableProvider} from 'react-actioncable-provider';
// import shoppingListItemReducer from 'src/reducers/slackListChannelAndMessageReducer.js';


const store = configureStore();

ReactDOM.render(
  <ApplicationCableProvider url={'ws://localhost:3000/cable'}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </ApplicationCableProvider>,
  document.getElementById('root')
);
