import React from 'react';
import { Form, Button, Icon, Input } from 'semantic-ui-react';
import { adapter } from '../../adapter';
import { connect } from 'react-redux';
import Message from './Message';

class MessagesList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderMessages() {
    return this.props.messages.map((message) =>
      <li>
        <Message
          key={message.id}
          content={message.content}
          userName={message.user.display_name}
          userImage={message.user.image_url}
          createdAt={message.created_at}
        />
    </li>)
  }

  render() {
    return (
      <ul>
        { this.props.messages ? this.renderMessages() : "No messages"}
      </ul>
    )
  }
}

export default MessagesList;
