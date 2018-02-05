import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'


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



  componentDidMount() {
    // this.props.grabActiveChannel(this.props.activeChannel)
    this.props.grabUserChannels(this.props.currentUser)
  }
  renderChannels() {
    let activeChannel = this.props.activeChannel
    let userChannels = this.props.channels.map(channel => <li key={channel.id} id={channel.id} className="customBullet" >{channel.name} </li>)
    return (
      <div>
        <h1>Channels</h1><i class="plus icon"></i>
        <ul>
        {userChannels}
        </ul>
        <h1>Direct Message</h1>
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
  currentUser: state.auth.currentUser.id,
  channels: state.channel.channels,
  loading: state.channel.loading
})


export default connect(mapStateToProps, actions)(ChannelsList);
