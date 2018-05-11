import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';
import HomeContainer from './containers/HomeContainer';
import LandingContainer from './containers/LandingContainer';
import NoMatch from './components/landing/NoMatch';
import Home from './components/Home';


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
            path="/home"
            render={HomeContainer}
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

// const mapStateToProps = state => ({
//   loggedIn: !!state.auth.currentUser.id
// });

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
