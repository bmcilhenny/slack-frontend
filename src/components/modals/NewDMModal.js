import React from 'react';
import { Button, Header, Image, Modal, Icon , Form, Checkbox, Divider, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { adapter} from '../../adapter';

class NewDMModal extends React.Component {
  constructor() {
    super()

    this.state = {
      modalOpen: false,
      users: []
    }
  }

   handleOpen = () => this.setState({ modalOpen: true })

  close = () => {
    console.log('Clicked')
    this.setState({ modalOpen: false })
  }

  handleChange = event => {
    let newVal = event.target.id
    this.setState({[newVal]: event.target.value})
  }

  createDM = event => {
    event.preventDefault();
    console.log('clicked')
    if (this.state.users.length === 2) {
      adapter.channels.createChannel({team_id: this.props.currentUser.team.id, owner_id: this.props.currentUser.id, users: this.state.users, channel_type: 'DM', private: true})
      .then(anything => this.close())
    }
  }

  handleDropDownChange = (event, data) => {
    this.setState({
      users: data.value
    })
  }

  render() {
    console.log(this.state)
    return (
      <Modal
        trigger={<Icon inverted name='add circle' onClick={this.handleOpen} style={{position: 'relative', float: 'right'}}></Icon>}
        open={this.state.modalOpen}
        onClose={this.close}>
        <Header icon='users' content='Create a new DM.' />
        <Modal.Content>
          <Form>
            <Divider horizontal>Add Teammates</Divider>
            <Dropdown placeholder='Select Friend(s)' fluid multiple search selection options={adapter.helpers.populateModalsWithTeammateOptions(this.props.team)} onChange={this.handleDropDownChange}/>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.close} >
            <Icon name='remove' /> Cancel
          </Button>
          <Button color='green'onClick={this.createDM}>
            <Icon name='checkmark' /> Confirm
            </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  team: state.channel.team
})

export default connect(mapStateToProps, actions)(NewDMModal);
