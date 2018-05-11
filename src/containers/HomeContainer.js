import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { adapter } from '../adapter';
import { Switch, Route, withRouter } from 'react-router-dom';
import HomeLoading from '../components/HomeLoading';
import Home from '../components/Home'
import {ActionCable} from 'react-actioncable-provider';
import Sound from 'react-sound';

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
          exact path="/home"
          component={HomeLoading}
          />
        <Route
          exact path="/home/:channelSlug"
          component={Home} />
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  lastSeenChannel: state.auth.currentUser.last_seen_channel
})

export default withRouter(connect(mapStateToProps, actions)(HomeContainer));
