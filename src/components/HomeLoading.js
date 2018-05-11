import React from 'react';
import {ActiveChannelSpinner} from './spinners/ActiveChannelSpinner';
import {Spinner} from './spinners/Spinner';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';

class HomeLoading extends React.Component {

  componentWillReceiveProps(prevProps) {
    debugger;
    if (prevProps.lastSeenChannel) {
      this.props.history.push(`/home/${prevProps.lastSeenChannel.slug}`)
    }
  }

  render() {
    return (
      <div className="ui padded equal height grid">
        <div className="three wide column slackPurple"><Spinner /></div>
        <div className="thirteen wide column"><ActiveChannelSpinner /></div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  lastSeenChannel: state.auth.currentUser.last_seen_channel
})

export default withRouter(connect(mapStateToProps, null)(HomeLoading));
