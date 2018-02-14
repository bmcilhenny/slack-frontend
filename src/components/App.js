import React, { Component } from 'react';
import '../App.css';
import Login from './Login';
// import Navbar from './Navbar';
import Signup from './Signup';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';
import SlackHome from './SlackHome'

class App extends Component {

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.fetchUser();
    }
  }


  render() {
    return (
      <div className="App">
        <div id="content">
          <Switch>
            <Route exact path="/login" render = {() => !this.props.loggedIn ? <Login /> :  <Redirect to="/slackhome"/>}>
              Login
            </Route>
            <Route exact path="/signup" render = {() => !this.props.loggedIn ? <Signup /> :  <Redirect to="/slackhome"/> }>
              Sign up
            </Route>
            <Route exact path="/slackhome" render = {() => <SlackHome /> }>
              Slack Home
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id
});

export default connect(mapStateToProps, actions)(App);
