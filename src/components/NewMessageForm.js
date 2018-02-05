import React from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import { adapter } from '../adapter';


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
   if (this.state.message !== "") {
   adapter.messages.createMessage({content: this.state.message})
   this.setState({
     message: ''
   })
  }
}

  render() {

    return (

      <Form onSubmit={this.createUser}>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Image Link' placeholder='Type a message...' id="message" value={this.state.message} onChange={this.handleChange}/>
        </Form.Group>
        <Button primary size='huge' type="submit">
          Submit
          <Icon name='right arrow' />
        </Button>
      </Form>
    )
  }
}

export default NewMessageForm;

// <div>
//   <div class="ui fluid action input">
//     <input type="text" placeholder="Type a message..." />
//     <div class="ui button">Submit</div>
//   </div>
// </div>
