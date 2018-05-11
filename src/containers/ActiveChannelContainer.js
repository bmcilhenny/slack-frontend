import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon, Button} from 'semantic-ui-react';
import { adapter } from '../adapter';
import {ActionCable} from 'react-actioncable-provider';

import * as actions from '../actions'
import NewMessageForm from '../components/messages/NewMessageForm';
import MessagesList from '../components/messages/MessagesList';
import ActiveChannelHeader from '../components/ActiveChannelHeader';

class ActiveChannelContainer extends React.Component {

  componentWillReceiveProps() {

  }

  render() {

    return (
      <div >
        <ActionCable
          channel={{ channel: `channel_${this.props.lastSeenChannel.channel_id}`, current_user_id: this.props.currentUser.id}}
          onReceived={this.handleSocketResponse}
        />
      <ActiveChannelHeader
        name={this.props.lastSeenChannel.slug}
      />
        <Button circular black style={{position: 'absolute', right: '2%', top: '2%', zIndex: '2'}} onClick={e => {this.props.logoutUser(this.props.history)}}><Icon name="sign out"></Icon></Button>
        <MessagesList messages={this.props.messages}/>
        <NewMessageForm />
      </div>
    )
  }
}

const mapStateToProps = state => ({
    lastSeenChannel: state.auth.currentUser.last_seen_channel,
    currentUser: state.auth.currentUser.id,
    messages: state.auth.currentUser.last_seen_channel.messages
    // channels: state.channel.channels.length ? state.channel.channels : []
})

export default connect(mapStateToProps, actions)(ActiveChannelContainer);
