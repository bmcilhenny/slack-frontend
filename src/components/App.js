import React, { Component } from 'react';
import '../App.css';
import Login from './Login';
import Navbar from './Navbar';
import Signup from './Signup';
import { Switch, Route, Link } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';
import SlackHome from './SlackHome'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div id="content" className = "ui container">
          <Switch>
            <Route exact path="/login" render = {() => <Login /> }>
              Login
            </Route>
            <Route exact path="/signup" render = {() => <Signup /> }>
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
