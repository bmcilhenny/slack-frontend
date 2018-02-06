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

  render() {
    return (
      <div className="ui padded equal height grid">
        <ActionCable
          channel={{ channel: 'ChannelChannel'}}
          onReceived={(newMessage) => {
            console.log(newMessage)
            this.props.addMessage(newMessage)
          }}
        />
        <div className="three wide column violet"><ChannelsList /></div>
        <div className="thirteen wide column"><ChannelContainer /></div>
      </div>

    )
  }

}

export default connect(null, actions)(SlackHome);
