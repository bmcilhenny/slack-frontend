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
      <div>
        <ChannelsList />
        <ChannelContainer />
      </div>

    )
  }

}

export default SlackHome;
