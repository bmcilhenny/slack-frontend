import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { adapter } from '../adapter';
import ChannelsListContainer from '../containers/ChannelsListContainer';
import ChannelContainer from '../containers/ChannelContainer';
import {ActionCable} from 'react-actioncable-provider';
import withAuth from '../hocs/withAuth';
import Sound from 'react-sound';

// This component should be moved into a container that contains the ChannelsListContainer and the ChannelContainer component
class HomeContainer extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.fetchUserData();
    }
  }

  render() {
    console.log("THE SLACK HOME STATE IS", this.state)
    return (
      <div className="ui padded equal height grid">
        <ActionCable
          channel={{ channel: `channel_${this.props.lastSeenChannel}`, current_user_id: this.props.currentUser.id, activeChannelID: this.props.ActiveChannelID}}
          onReceived={this.handleSocketResponse}
        />

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

export default withAuth(connect(mapStateToProps, actions)(HomeContainer));
