import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'
import NewMessageForm from './NewMessageForm';
import Message from './Message'
import { Icon, Form, Divider, Button, Image } from 'semantic-ui-react';
import { adapter } from '../adapter';

class ChannelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  componentDidMount() {
    // {this.props.channels.length ? this.props.grabActiveChannel(this.props.channels[0].id) : null}
  }

  componentWillUpdate() {
    this.props.channels.length && !this.props.activeChannelID ? this.props.grabActiveChannel(this.props.channels[0].id) : null
  }

  renderChannelMessages() {
    let activeChannel = this.props.channels.find(channel => channel.id === this.props.activeChannelID)
    debugger;
    let activeChannelReadMessages = null;
    let activeChannelUnreadMessages = null


    if (activeChannel && activeChannel.readMessages.length) {
      debugger
      activeChannelReadMessages = activeChannel.readMessages.map(message => <li key={message.message.id} id={message.message.id}> <span className="bold"><Image src={message.message.user.image_url} className="noBorderRadius" avatar/> {message.message.user.display_name}</span> <span className="italic">{adapter.helpers.formatDateTime(message.message.created_at)}</span>: {message.message.content} </li>)
    }

    if (activeChannel && activeChannel.unreadMessages.length) {
      debugger
      activeChannelUnreadMessages = activeChannel.unreadMessages.map(message => <li key={message.message.id} id={message.message.id}> <span className="bold"><Image src={message.message.user.image_url} className="noBorderRadius" avatar/> {message.message.user.display_name}</span> <span className="italic">{adapter.helpers.formatDateTime(message.message.created_at)}</span>: {message.message.content} </li>)
      activeChannelUnreadMessages.unshift(<Divider horizontal>New Messages</Divider>)
    }
    if (activeChannel) {
      debugger;
      return (
        <div>
          <div id="fixedChannelHeader">
            <h3  className="channelName">{activeChannel.channel_type === 'CHANNEL' ? activeChannel.name : adapter.helpers.nameTheDM(activeChannel.users, this.props.currentUser)}
            </h3>
            <Icon name="users" disabled style={{marginLeft: '10px'}}>{activeChannel.users.length}</Icon>
            <h3 className="channelDescription">{activeChannel.channel_type === 'CHANNEL' ?  `# ${activeChannel.details}` : null}</h3>
            <Form id="floatedChannelSearchBar">
              <Form.Group >
                <Form.Input placeholder='Jump to...' id="message"/>
              </Form.Group>
            </Form>
          </div>
          <ul className="messages">
            {activeChannelReadMessages}
            {activeChannelUnreadMessages}
          </ul>
        </div>
      );
    } else {
      debugger;
      return (
        <div>
          <div id="fixedChannelHeader">
            <h3  className="channelName">You're not a member of a channel right now.</h3>
            <p>Create a channel or have your teammates invite you to one.</p>
            <Form id="floatedChannelSearchBar">
              <Form.Group >
                <Form.Input placeholder='Jump to...' id="message"/>
              </Form.Group>
            </Form>
          </div>
          <ul className="messages">
            {activeChannelReadMessages}
            {activeChannelUnreadMessages}
          </ul>
        </div>
      )
    }
}

  render() {
    this.props.channels.length && !this.props.activeChannelID ? this.props.grabActiveChannel(this.props.channels[0].id) : null
    return (
      <div >
        <Button circular black style={{position: 'absolute', right: '2%', top: '2%', zIndex: '2'}} onClick={e => {this.props.logoutUser()}}><Icon name="sign out"></Icon></Button>
        <div className="channelContainerStyling">{this.props.loading ? null : this.renderChannelMessages()}</div>
        {this.props.activeChannelID ? <NewMessageForm className="fixedNewMessage"/> : null}
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
