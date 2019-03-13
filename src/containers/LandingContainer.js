import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from '../components/landing/Signup';
import Login from '../components/landing/Login';
import Dashboard from './Dashboard';

class LandingContainer extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('token') && (window.location.pathname === '/' || window.location.pathname === '/signup' || window.location.pathname === '/login')) {
      this.props.history.push("/dashboard")
    }
  }

  componentWillReceiveProps(prevProps) {
    if (localStorage.getItem('token') && (window.location.pathname === '/' || window.location.pathname === '/signup' || window.location.pathname === '/login')) {
      this.props.history.push("/dashboard")
    }
  }

  render() {
    console.log("IN THE LANDING CONTAINER");
    return (
        <Switch>
          <Route
            exact path="/"
            component={Login}
            />
          <Route
            exact path="/login"
            component={Login}
            />
          <Route
            exact path="/signup"
            component={SignUp} />
          <Route
            path="/dashboard"
            component={Dashboard}
            />
        </Switch>
    )
  }
}

export default LandingContainer;
