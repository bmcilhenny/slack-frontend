import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { adapter } from '../adapter';
import ChannelsList from './ChannelsList';
import ChannelContainer from './ChannelContainer';
import {ActionCable} from 'react-actioncable-provider';
import withAuth from '../hocs/withAuth';
import Sound from 'react-sound';

class SlackHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playStatus: Sound.status.STOPPED
    };
  }

  arrayContainsObj = (obj, array) => {
    var i;
    for (i = 0; i < array.length; i++) {
      if (array[i].id === obj.id) {
        return true;
      }
    }
    return false;
  }

  handleSocketResponse = data => {
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
        let userMemberOfChannel = this.arrayContainsObj(this.props.currentUser, data.payload.channel.users)
        let userOwnerOfNewChannel = this.props.currentUser.id === data.payload.channel.owner.id
        if (userMemberOfChannel && userOwnerOfNewChannel) {
          this.props.addChannel(data.payload.channel);
          this.props.updateActiveChannel(data.payload.channel.id)
        } else if (userMemberOfChannel) {
          this.props.addChannel(data.payload.channel);
        }
        break;
      case 'NEW_DM':
        let userMemberOfDM = this.arrayContainsObj(this.props.currentUser, data.payload.channel.users)
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
    console.log("THE SLACK HOME STATE IS", this.state)
    return (
      <div className="ui padded equal height grid">
        <ActionCable
          channel={{ channel: 'ChannelChannel', current_user_id: this.props.currentUser.id, activeChannelID: this.props.ActiveChannelID}}
          onReceived={this.handleSocketResponse}
        />
        <div className="three wide column slackPurple " ><ChannelsList /></div>
        <div className="thirteen wide column"><ChannelContainer /></div>
        <Sound
          url="http://www.pacdv.com/sounds/people_sound_effects/clearing-throat-3.wav"
          playStatus={this.state.playStatus}
          onLoading={({ bytesLoaded, bytesTotal }) => console.log(`${bytesLoaded / bytesTotal * 100}% loaded`)}
          volume='100'
          onFinishedPlaying={() => this.setState({playStatus: Sound.status.STOPPED})}
        />
      </div>
    )
  }

}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  channels: state.channel.channels,
  activeChannelID: state.channel.activeChannelID,
  loggedIn: !!state.auth.currentUser.id
})

export default withAuth(connect(mapStateToProps, actions)(SlackHome));
