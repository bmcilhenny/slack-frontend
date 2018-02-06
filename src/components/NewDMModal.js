import React from 'react'
import { Button, Header, Image, Modal, Icon , Form, Checkbox, Divider, Dropdown } from 'semantic-ui-react'

let friendOptions = [
  {
    text: 'Jenny Hess',
    value: 'Jenny Hess',
    image: { avatar: true, src: 'https://pr.network/media/cache/profile_thumb/ec/0c/6500ead9b62a4f9af680214c1bc0.jpeg' },
  }
]
class NewDMModal extends React.Component {
  constructor() {
    super()

    this.state = {
      modalOpen: false
    }
  }

   handleOpen = () => this.setState({ modalOpen: true })

  close = () => {
    console.log('Clicked')
    this.setState({ modalOpen: false })
  }

  render() {
    console.log(this.state)
    return (
      <Modal
        trigger={<Icon name='add circle' onClick={this.handleOpen}></Icon>}
        open={this.state.modalOpen}
        onClose={this.close}>
        <Header icon='users' content='Create a new DM.' />
        <Modal.Content>
          <Form onSubmit={this.createMessage}>
            <Form.Input placeholder='Enter here...' id="message" onChange={this.handleChange}/>
            <Divider horizontal>Add Teammates</Divider>
            <Dropdown placeholder='Select Friend' fluid multiple search selection options={friendOptions} />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.close} >
            <Icon name='remove' /> Cancel
          </Button>
          <Button color='green'>
            <Icon name='checkmark' /> Confirm
            </Button>
          </Modal.Actions>
        </Modal>
    )
  }
}

export default NewDMModal;
