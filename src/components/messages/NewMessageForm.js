import React from 'react';
import { Form, Button, Icon, Input } from 'semantic-ui-react';
import { adapter } from '../../adapter';
import { connect } from 'react-redux';

class NewMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  handleChange = event => {
   let newVal = event.target.id
   this.setState({[newVal]: event.target.value})
 }

 createMessage = event => {
   event.preventDefault();
   console.log("This is the state", this.state)
   console.log("these are the props", this.props)
   if (this.state.message !== "") {

     adapter.messages.createMessage({content: this.state.message, user_id: this.props.currentUser.id, channel_id: this.props.lastSeenChannelID})

     this.setState({
       message: ''
     })
  }
}

  render() {
    console.log(this.state)
    return (
      <div className="fixedNewMessage">
        <Form onSubmit={this.createMessage}>
          <Form.Group widths='equal'>
            <Form.Input fluid placeholder='Type a message...' id="message" value={this.state.message} onChange={this.handleChange}/>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activeChannelID: state.channel.activeChannelID,
  currentUser: state.auth.currentUser,
  lastSeenChannelID: state.auth.currentUser.last_seen_channel.channel_id,
})

export default connect(mapStateToProps, null)(NewMessageForm);
