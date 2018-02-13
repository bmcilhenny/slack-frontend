import React from 'react'
import { Button, Header, Image, Modal, Icon , Form, Checkbox, Divider, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { adapter} from '../adapter';


let friendOptions = [
  {
    text: 'Brendan McIlhenny',
    value: '26',
    image: { avatar: true, src: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAt7AAAAJDQyNzQ2MTc3LTI0OWYtNDU2NC1hYTU3LWE1OWQ2MjU0NTM4NA.jpg' },
  },
  {
    text: 'Greg Driza',
    value: '27',
    image: { avatar: true, src: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAuZAAAAJDExZTU2MTViLThjNmEtNGYzNy04ODZiLTQ2ZjU1ZjMwMDY1NA.jpg' },
  },
  {
    text: 'Tim Campbell',
    value: '28',
    image: { avatar: true, src: 'https://flatiron-v3-production.imgix.net/tim-campbell-headshot.jpg?h=240&w=240&facepad=2&fit=facearea&ixlib=imgixjs-3.3.0' },
  }
]

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
    if (this.state.users.length >= 2) {
      adapter.channels.createChannel({owner_id: this.props.currentUser.id, users: this.state.users, channel_type: 'DM', private: true})
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
            <Dropdown placeholder='Select Friend(s)' fluid multiple search selection options={friendOptions} onChange={this.handleDropDownChange}/>
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
  currentUser: state.auth.currentUser
})

export default connect(mapStateToProps, actions)(NewDMModal);
