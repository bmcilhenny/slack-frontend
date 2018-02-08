import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'
import NewMessageForm from './NewMessageForm';
import Message from './Message'
import { Icon, Form } from 'semantic-ui-react';
import { adapter } from '../adapter';

class ChannelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  componentDidMount() {
    this.props.grabActiveChannel(38)
  }

  renderChannelMessages() {
    let activeChannel = this.props.channels.find(channel => channel.id === this.props.activeChannelID)
    let activeChannelMessages = null
    if (activeChannel && activeChannel.messages.length) {
      activeChannelMessages = activeChannel.messages.map(message => <li key={message.id} id={message.id}> <span className="bold">{message.user.display_name}</span>: {message.content} </li>)
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
          {activeChannelMessages}
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
