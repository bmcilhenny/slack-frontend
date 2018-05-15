import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { adapter } from '../adapter';
import ChannelsListContainer from '../containers/ChannelsListContainer';
import ActiveChannelContainer from '../containers/ActiveChannelContainer';
import {ActionCable} from 'react-actioncable-provider';
import { withRouter } from 'react-router'
import Sound from 'react-sound';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playStatus: Sound.status.STOPPED
    };
  }

  componentDidMount() {
    debugger;
    if (localStorage.getItem('token')) {
      this.props.fetchUserData();
    }
  }

  render() {
    console.log("THE SLACK HOME STATE IS", this.state)
    return (
      <div className="ui padded equal height grid">
        <h1>HEY</h1>
        <div className="three wide column slackPurple"><ChannelsListContainer /></div>
        <div className="thirteen wide column"><ActiveChannelContainer /></div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  channels: state.channel.channels,
  activeChannelID: state.channel.activeChannelID,
  loggedIn: !!state.auth.currentUser.id,
  lastSeenChannel: state.auth.currentUser.last_seen_channel
})

export default connect(mapStateToProps, actions)(Home);
