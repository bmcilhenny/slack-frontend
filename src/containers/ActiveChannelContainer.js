import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon, Form, Divider, Button, Image } from 'semantic-ui-react';

import * as actions from '../actions'
import NewMessageForm from '../components/messages/NewMessageForm';
import MessagesList from '../components/messages/MessagesList';
import { adapter } from '../adapter';

class ActiveChannelContainer extends React.Component {

  renderMessages() {

  }

  render() {

    this.props.channels.length && !this.props.activeChannelID ? this.props.grabActiveChannel(this.props.channels[0].id) : null
    return (
      <div >
        <Button circular black style={{position: 'absolute', right: '2%', top: '2%', zIndex: '2'}} onClick={e => {this.props.logoutUser(this.props.history)}}><Icon name="sign out"></Icon></Button>
        <MessagesList messages={this.props.messages}/>
        <NewMessageForm />
      </div>
    )
  }
}

const mapStateToProps = state => ({
    activeChannelID: state.channel.activeChannelID,
    currentUser: state.auth.currentUser.id,
    loading: state.channel.loading,
    lastSeenChannel: state.auth.currentUser.last_seen_channel
    // channels: state.channel.channels.length ? state.channel.channels : []
})

export default connect(mapStateToProps, actions)(ActiveChannelContainer);
