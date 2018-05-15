import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { adapter } from '../adapter';
import { Switch, Route, withRouter } from 'react-router-dom';
import HomeLoading from '../components/HomeLoading';
import Home from '../components/Home';
import {ActionCable} from 'react-actioncable-provider';
import Sound from 'react-sound';
import withAuth from '../hocs/withAuth'


// This component should be moved into a container that contains the ChannelsListContainer and the ActiveChannelContainer component
class HomeContainer extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.fetchUserData();
    }
  }

  // handle load, then push a user to a route
  render() {
    console.log("THE SLACK HOME STATE IS", this.state)
    return (
      <Switch>
        <Route
          path="/home/:channelSlug"
          component={Home}
        />
        <Route
          path="/home"
          component={HomeLoading}
        />
      </Switch>
    )
  }
}

export default withAuth(HomeContainer);
