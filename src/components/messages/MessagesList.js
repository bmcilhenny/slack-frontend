import React from 'react';
import { Form, Button, Icon, Input } from 'semantic-ui-react';
import { adapter } from '../../adapter';
import { connect } from 'react-redux';
import Message from './Message';

class MessagesList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.state)
    return (
      <ul>
        {this.props.messages.map((message) => <li><Message message={message}/></li>)}
      </ul>
    )
  }
}

export default MessagesList;
