import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon, Button} from 'semantic-ui-react';
import { adapter } from '../adapter';
import {ActionCable} from 'react-actioncable-provider';
import Sound from 'react-sound';

import * as actions from '../actions'
import NewMessageForm from '../components/messages/NewMessageForm';
import MessagesList from '../components/messages/MessagesList';
import ActiveChannelHeader from '../components/ActiveChannelHeader';

class ActiveChannelContainer extends React.Component {

  componentWillReceiveProps() {

  }

  handleSocketResponse = data => {
    debugger;
    console.log("Inside the handleSocketResponse", data)
    switch (data.type) {
      case 'NEW_MESSAGE':
        let filteredChannels = this.props.channels.filter(channel => channel.id === data.payload.message.channel_id)
        debugger;
        if (filteredChannels.length && data.payload.message.user.id !== this.props.currentUser.id) {
          this.setState({
            playStatus: Sound.status.PLAYING
          })
        }
        debugger;
        this.props.addMessage(data.payload);
        break;
      case 'NEW_CHANNEL':
        let userMemberOfChannel = adapter.helpers.arrayContainsObj(this.props.currentUser, data.payload.channel.users)
        let userOwnerOfNewChannel = this.props.currentUser.id === data.payload.channel.owner.id
        if (userMemberOfChannel && userOwnerOfNewChannel) {
          this.props.addChannel(data.payload.channel);
          this.props.updateActiveChannel(data.payload.channel.id)
        } else if (userMemberOfChannel) {
          this.props.addChannel(data.payload.channel);
        }
        break;
      case 'NEW_DM':
        let userMemberOfDM = adapter.helpers.arrayContainsObj(this.props.currentUser, data.payload.channel.users)
        let userOwnerOfNewDM = this.props.currentUser.id === data.payload.channel.owner.id
        if (userMemberOfDM && userOwnerOfNewDM) {
          this.props.addChannel(data.payload.channel);
          this.props.updateActiveChannel(data.payload.channel.id)
        } else if (userMemberOfDM) {
          this.props.addChannel(data.payload.channel);
        }
        break;
      case 'NEW_USER':
        this.props.addUser(data.payload);
        break;
      case 'USER_ONLINE':
        this.props.userOnline(data.payload)
        break;
      case 'USER_OFFLINE':
        this.props.userOffline(data.payload)
      default:
        console.log(data);
    }
  };

  render() {
    return (
      <div >
        <ActionCable
          channel={{ channel: `ChannelsChannel`, id: this.props.lastSeenChannel.channel_id, current_user_id: this.props.currentUser.id}}
          onReceived={this.handleSocketResponse}
        />
        <ActiveChannelHeader
          name={this.props.lastSeenChannel.name}
        />
        <Button circular black style={{position: 'absolute', right: '2%', top: '2%', zIndex: '2'}} onClick={e => {this.props.logoutUser(this.props.history)}}><Icon name="sign out"></Icon></Button>
        <MessagesList messages={this.props.messages}/>
        <NewMessageForm />
      </div>
    )
  }
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser.id,
    messages: state.auth.currentUser.last_seen_channel.messages,
    lastSeenChannel: state.auth.currentUser.last_seen_channel
})

export default connect(mapStateToProps, actions)(ActiveChannelContainer);
