import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ChannelsList from './ChannelsList';
import ChannelContainer from './ChannelContainer';
import {ActionCable} from 'react-actioncable-provider';


class SlackHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleSocketResponse = data => {
    switch (data.type) {
      case 'NEW_MESSAGE':
        this.props.addMessage(data.payload);
        break;
      case 'NEW_CHANNEL':
        this.props.addChannel(data.payload);
        break;
      case 'NEW_USER':
        this.props.addUser(data.payload);
      default:
        console.log(data);
    }
  };

  render() {
    return (
      <div className="ui padded equal height grid">
        <ActionCable
          channel={{ channel: 'ChannelChannel'}}
          onReceived={this.handleSocketResponse}
        />
        <div className="three wide column violet"><ChannelsList /></div>
        <div className="thirteen wide column"><ChannelContainer /></div>
      </div>

    )
  }

}

export default connect(null, actions)(SlackHome);
