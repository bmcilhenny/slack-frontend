import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'
import { Form, Input, Icon, Label } from 'semantic-ui-react';

import NewChannelModal from '../components/NewChannelModal';
import NewDMModal from '../components/NewDMModal';
import { Spinner } from '../components/Spinner.js';

import { adapter } from '../adapter';

class ChannelsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      play: false
    };
  }

  handleChannelClick = (event) => {
    this.props.updateActiveChannel(event.target.id);
    adapter.channels.updateLastSeen({user_id: this.props.currentUser.id, channel_id: event.target.id})
  }

  componentDidMount() {
    debugger;
    this.props.grabUserChannels(this.props.currentUser.id)
    // this.props.grabActiveChannel(this.props.activeChannel)
  }

  componentWillUpdate(nextProps) {
      if (this.props.activeChannelID && nextProps.activeChannelID !== this.props.activeChannelID) {
        debugger;
        this.props.updateLastChannelReadMessages(this.props.activeChannelID)
      }

      // if (this.props.channels && nextProps) {
      //   debugger
      //   if (this.props.channels.length) {
      //     debugger
      //     if (this.props.channels.filter((channel, id) => channel.unreadMessages.length !== nextProps.channels[id].length).length) {
      //       this.setState({
      //         play: true
      //       })
      //     }
      //   }
      // }
    }

  renderChannels() {
    console.log("Inside the channel list component", this.props)
    // debugger;

    let filteredUserChannels = null;
    let filteredUserDMs = null;
    // debugger;
    if (this.props.channels.length) {
      filteredUserChannels = this.props.channels.filter(channel => channel.channel_type === 'CHANNEL').map(channel => channel.unreadMessages.length ? <a className="unRead" onClick={this.handleChannelClick} id={channel.id} key={channel.id}><li key={channel.id} className={channel.id === this.props.activeChannelID ? "customBullet active" : "customBullet"} id={channel.id}>{channel.name} <Label color='red' circular size='mini' style={{marginLeft: '1.5em'}}>{channel.unreadMessages.length}</Label></li></a> : <a className="read" onClick={this.handleChannelClick} id={channel.id} key={channel.id}><li key={channel.id} className={channel.id === this.props.activeChannelID ? "customBullet active" : "customBullet"} id={channel.id}>{channel.name} </li></a>)
      filteredUserDMs = this.props.channels.filter(channel => channel.channel_type === 'DM').map(channel => channel.unreadMessages.length ? <a className="unRead" onClick={this.handleChannelClick} id={channel.id} key={channel.id}><li key={channel.id} className={channel.id === this.props.activeChannelID ? "customBullet active" : "customBullet"} id={channel.id}>{adapter.helpers.labelTheDM(channel.users, this.props.team, this.props.currentUser.id) ? <Icon name='bullseye green'></Icon> : <Icon name='circle thin'></Icon>} {adapter.helpers.nameTheDM(channel.users, this.props.currentUser.id)} <Label color='red' circular size='mini' style={{marginLeft: '1.5em'}}>{channel.unreadMessages.length}</Label></li></a> : <a className="read" onClick={this.handleChannelClick} id={channel.id} key={channel.id}><li key={channel.id} className={channel.id === this.props.activeChannelID ? "customBullet active" : "customBullet"} id={channel.id}>{adapter.helpers.labelTheDM(channel.users, this.props.team, this.props.currentUser.id) ? <Icon name='bullseye green'></Icon> : <Icon name='circle thin'></Icon>} {adapter.helpers.nameTheDM(channel.users, this.props.currentUser.id)}</li></a>)
    }

    return (
      <div>
        <h2 className="white">{this.props.currentUser.team.name} <Icon name="bell outline white" style={{position: 'relative', float: 'right'}}></Icon></h2>
        <h3 className="white read nameLabel"><Icon name='bullseye green'></Icon> {this.props.currentUser.display_name}</h3>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input fluid placeholder='Jump to...' id="message"/>
          </Form.Group>
        </Form>
        <h3 className="white">Channels < NewChannelModal/></h3>
        <ul className="white">
        {filteredUserChannels}
        </ul>
        <h3 className="white">Direct Message < NewDMModal /></h3>
        <ul className="white">
        {filteredUserDMs}
        </ul>
      </div>
    );
  }

  render() {
    console.log("These are the props", this.props)
    return (
      <div>
       {this.props.loading ? <Spinner /> : this.renderChannels()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activeChannel: state.channel.activeChannel,
  activeChannelID: state.channel.activeChannelID,
  currentUser: state.auth.currentUser,
  channels: state.channel.channels,
  loading: state.async.loading,
  team: state.channel.team
})


export default connect(mapStateToProps, actions)(ChannelsList);
