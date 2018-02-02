import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter, Route } from 'react-router-dom';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
// import shoppingListItemReducer from 'src/reducers/slackListChannelAndMessageReducer.js';


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
