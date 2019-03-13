import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../containers/Dashboard';
import HomeNoChannels from '../components/HomeNoChannels';
import withAuth from '../hocs/withAuth'

class HomeContainer extends React.Component {
  
  componentDidMount() {
    const lastSeenChannel = this.props.lastSeenChannel;
    if (lastSeenChannel) {
      if (lastSeenChannel.name) {
        this.props.history.push(`/dashboard/${lastSeenChannel.slug}`)
      }
    }
  }
  
  // handle load, then push a user to a route
  render() {
    console.log("THE SLACK HOME STATE IS", this.state)
    return (
      <Switch>
        <Route
          path="/dashboard/:channelSlug"
          component={Dashboard}
        />
        <Route
          path="/dashboard"
          component={HomeNoChannels}
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
