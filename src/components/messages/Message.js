import React from 'react';
import { Form, Button, Icon, Input, Image } from 'semantic-ui-react';
import { adapter } from '../../adapter';
import { connect } from 'react-redux';

class Message extends React.Component {

  render() {
    console.log(this.state)
    return (
      <div className="message-container">
        <span className="bold"><Image src={this.props.userImage} className="noBorderRadius" avatar/> {this.props.userName}</span> <span className="italic">{adapter.helpers.formatDateTime(this.props.createdAt)}</span>: {this.props.content}
      </div>
    )
  }
}

export default Message;
