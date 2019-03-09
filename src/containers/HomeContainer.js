import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Switch, Route } from 'react-router-dom';
import HomeLoading from '../components/HomeLoading';
import Home from '../components/Home';
import withAuth from '../hocs/withAuth'


// This component should be moved into a container that contains the ChannelsListContainer and the ActiveChannelContainer component
class HomeContainer extends React.Component {
  
  componentDidMount() {
    debugger;
    let channelSlug = this.props.lastSeenChannel.name;
    if (channelSlug) {
      this.props.history.push(`/home/${channelSlug}`)
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
          component={Home}
        />
        {/* <Route
          path="/home"
          component={HomeLoading}
        /> */}
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  lastSeenChannel: state.auth.currentUser.last_seen_channel
})

export default withAuth(connect(mapStateToProps, actions)(HomeContainer));
