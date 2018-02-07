import React from 'react';
import { Button, Header, Image, Modal, Icon , Form, Checkbox, Divider, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { adapter} from '../adapter';

let friendOptions = [
  {
    text: 'Jenny Hess',
    value: 'Jenny Hess',
    image: { avatar: true, src: 'https://pr.network/media/cache/profile_thumb/ec/0c/6500ead9b62a4f9af680214c1bc0.jpeg' },
  }
]
class NewChannelModal extends React.Component {
  constructor() {
    super()

    this.state = {
      modalOpen: false,
      name: '',
      details: '',
      users: []
    }
  }

  // componentDidMount() {
  //   this.setState({
  //     owner_id:
  //   })
  // }

  handleOpen = () => this.setState({ modalOpen: true })

  close = () => {
    console.log('Clicked')
    this.setState({ modalOpen: false })
  }

  handleChange = event => {
   let newVal = event.target.id
   this.setState({[newVal]: event.target.value})
  }

  createChannel = event => {
    event.preventDefault();
    if (this.state.message !== "") {
      adapter.channels.createChannels({owner_id: this.props.currentUser.id, name: this.state.name, details: this.state.details, users: this.state.users})
    }
  }

  handleDropDownChange = event => {
    debugger;
  }

  render() {
    console.log(this.state)
    return (
      <Modal
        trigger={<Icon name='add circle' onClick={this.handleOpen}></Icon>}
        open={this.state.modalOpen}
        onClose={this.close}>
        <Header icon='users' content='Create a new Channel.' />
        <Modal.Content>
          <Form onSubmit={this.createChannel}>
            <Form.Input placeholder='Enter channel name here...' id="name" onChange={this.handleChange}/>
            <Form.Input placeholder='Enter channel details here...' id="details" onChange={this.handleChange}/>
            <Divider horizontal>Add Teammates</Divider>
            <Dropdown placeholder='Select Friend' fluid multiple search selection options={friendOptions} onChange={this.handleDropDownChange}/>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.close} >
            <Icon name='remove' /> Cancel
          </Button>
          <Button color='green' onClick={this.createChannel, this.close}>
            <Icon name='checkmark' /> Confirm
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
})

export default connect(mapStateToProps, actions)(NewChannelModal);
