import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import SlackHome from './components/SlackHome';
import NoMatch from './components/NoMatch';
import { ActionCableProvider } from 'react-actioncable-provider';
import { ActionCableAPIURL } from './constants';



class App extends Component {

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.fetchUser();
    }
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render = {() => !this.props.loggedIn ? <Redirect to="/login"/> :  <ActionCableProvider url={`${ActionCableAPIURL}/cable?token=${localStorage.getItem('token')}`}> <SlackHome /> </ActionCableProvider>}>
          </Route>
          <Route exact path="/login" render = {() => !this.props.loggedIn ? <Login /> :  <Redirect to="/slackhome"/> }>
          </Route>
          <Route exact path="/signup" render = {() => !this.props.loggedIn ? <Signup /> :  <ActionCableProvider url={`${ActionCableAPIURL}/cable?token=${localStorage.getItem('token')}`}> <SlackHome /> </ActionCableProvider> }>
          </Route>
          <Route exact path="/slackhome" render = {() => !this.props.loggedIn ? <Redirect to="/login"/> : <ActionCableProvider url={`${ActionCableAPIURL}/cable?token=${localStorage.getItem('token')}`}> <SlackHome /> </ActionCableProvider> }>
          </Route>
          <Route component={NoMatch}>
          </Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id
});

export default connect(mapStateToProps, actions)(App);
