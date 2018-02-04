import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ChannelsList from './ChannelsList';
import ChannelContainer from './ChannelContainer';



class SlackHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {
    return (
      <div className="ui padded equal height grid">
        <div className="five wide column violet"><ChannelsList /></div>
        <div className="eleven wide column"><ChannelContainer /></div>
      </div>

    )
  }

}

export default SlackHome;
