import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'
import NewMessageForm from './NewMessageForm';
import Message from './Message'

class ChannelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  componentDidMount() {
    this.props.grabActiveChannel(2)
  }

  renderChannelMessages() {
  let channelMessages = this.props.channelMessages.map(message => <li key={message.id} id={message.id}>{message.user.display_name}: {message.content} </li>)
  return (
    <ul>
    {channelMessages}
    </ul>
  );
}

  render() {
    // const channelMessages = this.props.channelMessages.map(message => <Message message={message} key={message.id} id={message.id}/>)
    return (
      <div className="fluid">
        {this.props.loading ? null : this.renderChannelMessages()}
        <NewMessageForm />
      </div>

    )
  }
}

const mapStateToProps = state => ({
  activeChannel: state.channel.activeChannel,
  currentUser: state.auth.currentUser.id,
  channelMessages: state.channel.activeChannel.messages,
  loading: state.channel.loading
})

export default connect(mapStateToProps, actions)(ChannelContainer);

// <ul>{channelMessages}</ul>
