import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import './App.css';
import HomeContainer from './containers/HomeContainer';
import LandingContainer from './containers/LandingContainer';
import NoMatch from './components/NoMatch';
import { ActionCableProvider } from 'react-actioncable-provider';
import { ActionCableAPIURL } from './constants';



class App extends Component {

  // componentDidMount() {
  //   if (localStorage.getItem('token')) {
  //     this.props.fetchUserData();
  //   }
  // }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            path="/"
            component={LandingContainer}
            />
          <Route
            path="/home"
            render= {HomeContainer}
            />
        </Switch>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   loggedIn: !!state.auth.currentUser.id
// });

export default withRouter(App);


// previous routes
// <Route path="/" render = {() => !this.props.loggedIn ? <Redirect to="/login"/> :  <ActionCableProvider url={`${ActionCableAPIURL}/cable?token=${localStorage.getItem('token')}`}> <Home /> </ActionCableProvider>}>
// </Route>
// <Route path="/login" render = {() => !this.props.loggedIn ? <Login /> :  <Redirect to="/home"/> }>
// </Route>
// <Route path="/signup" render = {() => !this.props.loggedIn ? <Signup /> :  <ActionCableProvider url={`${ActionCableAPIURL}/cable?token=${localStorage.getItem('token')}`}> <Home /> </ActionCableProvider> }>
// </Route>
// <Route path="/home" render = {() => !this.props.loggedIn ? <Redirect to="/login"/> : <ActionCableProvider url={`${ActionCableAPIURL}/cable?token=${localStorage.getItem('token')}`}> <Home /> </ActionCableProvider> }>
// </Route>
// <Route component={NoMatch}>
// </Route>
