import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from '../components/landing/Signup';
import Login from '../components/landing/Login';
import HomeContainer from './HomeContainer';


class LandingContainer extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('token') && (window.location.pathname === '/' || window.location.pathname === '/signup' || window.location.pathname === '/login')) {
      this.props.history.push("/home")
    }
  }

  componentWillReceiveProps(prevProps) {
    if (localStorage.getItem('token') && (window.location.pathname === '/' || window.location.pathname === '/signup' || window.location.pathname === '/login')) {
      this.props.history.push("/home")
    }
  }

  render() {
    return (
        <Switch>
          <Route
            exact path="/login"
            component={Login}
            />
          <Route
            exact path="/signup"
            component={SignUp} />
          <Route
            path="/home"
            component={HomeContainer}
            />
        </Switch>
    )
  }
}

export default LandingContainer;
