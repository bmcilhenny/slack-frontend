import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import Dashboard from '../containers/Dashboard';
import ActiveChannelContainer from '../containers/ActiveChannelContainer';
import Sound from 'react-sound';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playStatus: Sound.status.STOPPED
    };
  }

  componentDidMount() {
    let currentUser = this.props.currentUser;
    debugger;
    this.props.fetchChannels(currentUser.team.id, currentUser.id)
  }

  componentWillReceiveProps(nextProps) {
    // let currentUser = this.props.currentUser;
    // if (this.props.history !== nextProps.match.params.channelSlug) {
    //   this.props.fetchChannel(currentUser.team.id, currentUser.id,this.props.match.params.channelSlug)
    // }
  }

  render() {
    return (
      <div className="ui pad equal height grid">
        <div className="three wide column slackPurple"><Dashboard /></div>
        <div className="thirteen wide column"><ActiveChannelContainer channel={this.props.lastSeenChannel} /></div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  loggedIn: !!state.auth.currentUser.id,
  lastSeenChannel: state.auth.currentUser.last_seen_channel
})

export default withRouter(connect(mapStateToProps, actions)(Home));
