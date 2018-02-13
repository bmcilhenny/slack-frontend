import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'
import NewMessageForm from './NewMessageForm';
import Message from './Message'
import { Icon, Form, Divider } from 'semantic-ui-react';
import { adapter } from '../adapter';

class ChannelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  componentDidMount() {
    this.props.grabActiveChannel(84)
  }

  renderChannelMessages() {
    let activeChannel = this.props.channels.find(channel => channel.id === this.props.activeChannelID)
    let activeChannelReadMessages = null;
    let activeChannelUnReadMessages = null


    if (activeChannel && activeChannel.readMessages.length) {
      debugger
      activeChannelReadMessages = activeChannel.readMessages.map(message => <li key={message.message.id} id={message.message.id}> <span className="bold">{message.message.user.display_name}</span>: {message.message.content} </li>)
    }

    if (activeChannel && activeChannel.unreadMessages.length) {
      debugger
      activeChannelReadMessages = activeChannel.unreadMessages.map(message => <li key={message.message.id} id={message.message.id}> <span className="bold">{message.message.user.display_name}</span>: {message.message.content} </li>)
      activeChannelReadMessages.unshift(<Divider horizontal>New Messages</Divider>)
    }

    return (
      <div>
        <div id="fixedChannelHeader">
          <h3  className="channelName">{activeChannel.channel_type === 'CHANNEL' ? activeChannel.name : adapter.helpers.nameTheDM(activeChannel.users, this.props.currentUser)}
            <Icon name="users" disabled style={{marginLeft: '10px'}}>{activeChannel.users.length}</Icon>
            <h3 className="channelDescription">{activeChannel.channel_type === 'CHANNEL' ?  `# ${activeChannel.details}` : null}</h3>
            <Form id="floatedChannelSearchBar">
              <Form.Group >
                <Form.Input placeholder='Jump to...' id="message"/>
              </Form.Group>
            </Form>
          </h3>
        </div>
        <ul className="messages">
          {activeChannelReadMessages}
          {activeChannelUnReadMessages}
        </ul>
      </div>
    );
}

  render() {
    console.log("Inside the Channel Container render", this.props)
    return (
      <div >
        <div className="channelContainerStyling">{this.props.loading ? null : this.renderChannelMessages()}</div>
        <NewMessageForm className="fixedNewMessage"/>
      </div>

    )
  }
}

const mapStateToProps = state => ({
  activeChannelID: state.channel.activeChannelID,
  currentUser: state.auth.currentUser.id,
  loading: state.channel.loading,
  channels: state.channel.channels.length ? state.channel.channels : []
})

export default connect(mapStateToProps, actions)(ChannelContainer);
