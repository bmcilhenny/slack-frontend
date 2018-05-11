import React from 'react';
import { Form, Button, Icon, Input } from 'semantic-ui-react';
import { adapter } from '../../adapter';
import { connect } from 'react-redux';

class Message extends React.Component {

  render() {
    console.log(this.state)
    return (
      <div className="message-container">
        {this.props.message}
      </div>
    )
  }
}

export default Message;
