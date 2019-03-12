import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ChannelsListContainer from '../containers/ChannelsListContainer';
import ActiveChannelContainer from '../containers/ActiveChannelContainer';
import Sound from 'react-sound';

class HomeNoChannels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playStatus: Sound.status.STOPPED
    };
  }

  render() {
    console.log("THE SLACK HOME STATE IS", this.state)
    return (
      <div className="ui pad equal height grid">
        <div className="three wide column slackPurple"><ChannelsListContainer /></div>
        <div className="thirteen wide column"><ActiveChannelContainer channel={this.props.lastSeenChannel} /></div>
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

export default connect(mapStateToProps, actions)(HomeNoChannels);
