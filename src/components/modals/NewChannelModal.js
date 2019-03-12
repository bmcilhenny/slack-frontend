import React from 'react';
import { Button, Header, Image, Modal, Icon, Form, Divider, Dropdown, Checkbox, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { adapter} from '../../adapter';

class NewChannelModal extends React.Component {
  constructor() {
    super()

    this.state = {
      modalOpen: false,
      name: '',
      details: '',
      users: [],
      checked: false
    }
  }
  handleOpen = () => this.setState({ modalOpen: true })

  close = () => {
    this.setState({
      modalOpen: false,
      name: '',
      details: '',
      users: [],
      checked: false
     })
  }

  toggle = () => this.setState({ checked: !this.state.checked })

  handleChange = event => {
    let newVal = event.target.id
    this.setState({[newVal]: event.target.value})
  }

  createChannel = event => {
    event.preventDefault();
    debugger;
    if (this.state.name !== "" && this.state.details !== "" && this.state.users.length) {
      adapter.channels.createChannel({team_id: this.props.currentUser.team.id, owner_id: this.props.currentUser.id, name: this.state.name, details: this.state.details, users: this.state.users, channel_type: 'CHANNEL'})
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
        trigger={<Icon name='add circle' inverted="true" onClick={this.handleOpen} style={{position: 'relative', float: 'right'}}></Icon>}
        open={this.state.modalOpen}
        onClose={this.close}
        >
        <Header icon='users' content='Create a new Channel.' />
        <Modal.Content>
          <Form>
            <Form.Input placeholder='Enter channel name here...' id="name" onChange={this.handleChange} value={this.state.name}/>
            <Form.Input placeholder='Enter channel details here...' id="details" onChange={this.handleChange} value={this.state.details}/>
            <Divider horizontal>Add Teammates</Divider>
            {/* <Dropdown placeholder='Select Teammate(s)' fluid multiple search selection options={adapter.helpers.getTeammates(this.props.team_id)} onChange={this.handleDropDownChange} /> */}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Grid>
            <Grid.Column width={10}>
              <Form.Checkbox style={{textAlign: 'left'}} toggle id="privateChannel" label={<label>Make this channel private (only an owner can invite teammates to the channel)</label>} onChange={this.toggle} checked={this.state.checked}/>
            </Grid.Column >
            <Grid.Column width={3}>
              <Button color='red' onClick={this.close} >
                <Icon name='remove' /> Cancel
              </Button>
            </Grid.Column>
            <Grid.Column width={3}>
              <Button color='green' onClick={this.createChannel}>
                <Icon name='checkmark' /> Confirm
              </Button>
            </Grid.Column>
          </Grid>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  team: state.channel.team
})

export default connect(mapStateToProps, actions)(NewChannelModal);
