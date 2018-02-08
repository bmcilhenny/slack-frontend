import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'
import { Form, Input } from 'semantic-ui-react';
import NewChannelModal from './NewChannelModal';
import NewDMModal from './NewDMModal';
import { adapter } from '../adapter';

class ChannelsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  renderSpinner() {
    return (
      <div>
        <img alt="spinner" src="loading-bars.svg" />
        <h1>Loading...</h1>
      </div>
    );
  }

  handleChannelClick = (event) => {
    this.props.updateActiveChannel(event.target.id)
  }

  componentDidMount() {
    console.log(this.props)
    // this.props.grabActiveChannel(this.props.activeChannel)
    this.props.grabUserChannels(this.props.currentUser.id)
  }

  renderChannels() {
    console.log("Inside the channel list component", this.props)

    let filteredUserChannels = this.props.channels.filter(channel => channel.channel_type === 'CHANNEL').map(channel => <a onClick={this.handleChannelClick} id={channel.id} key={channel.id}><li key={channel.id} className="customBullet" id={channel.id}>{channel.name} </li></a>)
    let filteredUserDMs = this.props.channels.filter(channel => channel.channel_type === 'DM').map(channel => <a onClick={this.handleChannelClick} id={channel.id} key={channel.id}><li key={channel.id} className="customBullet" id={channel.id}>{adapter.helpers.nameTheDM(channel.users, this.props.currentUser.id)}</li></a>)

    return (
      <div>
        <h2>{this.props.currentUser.display_name}</h2>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input fluid placeholder='Jump to...' id="message"/>
          </Form.Group>
        </Form>
        <h3>Channels < NewChannelModal/></h3>
        <ul>
        {filteredUserChannels}
        </ul>
        <h3>Direct Message < NewDMModal /></h3>
        <ul>
        {filteredUserDMs}
        </ul>
      </div>
    );
  }

  render() {
    console.log("These are the props", this.props)
    return (
      <div>
       {this.props.loading ? this.renderSpinner() : this.renderChannels()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activeChannel: state.channel.activeChannel,
  currentUser: state.auth.currentUser,
  channels: state.channel.channels,
  loading: state.channel.loading
})






export default connect(mapStateToProps, actions)(ChannelsList);
