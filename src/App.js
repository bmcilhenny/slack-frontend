import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';x
import LandingContainer from './containers/LandingContainer';
import NoMatch from './components/landing/NoMatch';
import Dashboard from './containers/Dashboard';


class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            path="/"
            component={LandingContainer}
            />
          <Route
            path="/dashboard"
            render={Dashboard}
            />
          <Route
            render={NoMatch}
            />
        </Switch>
      </div>
    );
  }
}


export default withRouter(App);