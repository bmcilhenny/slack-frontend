import React, { Fragment } from 'react';
// import { ActionCable } from 'react-actioncable-provider';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Sidebar from '../components/sidebar/Sidebar';
import ActiveChannel from '../components/active_channel/ActiveChannel';
// import Cable from '../components/cables/Cable';
// import ActiveChannelContainer from './ActiveChannelContainer';
// import ChannelList from './ChannelList';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeChannel: null
    };  
  }
  
  componentDidMount() {
    let currentUser = this.props.currentUser;
    this.props.fetchChannels(currentUser.team.id, currentUser.id)
    debugger;
  };

  handleClick = id => {
    this.setState({ activeChannel: id });
  };

  handleReceivedChannel = resp => {
    const { channels } = resp;
    this.setState({
      channels: [...this.state.channels, channels]
    });
  };

  handleReceivedMessage = response => {
    const { message } = response;
    const channels = [...this.state.channels];
    const channel = channels.find(
      channel => channel.id === message.channel_id
    );
    channel.messages = [...channel.messages, message];
    this.setState({ channels });
  };

  render() {
    const { activeChannel } = this.state;
    const { channels } = this.props;
    debugger;
    return (
      <Fragment>
       <Sidebar />
       <ActiveChannel />
      </Fragment>
      
    );
  };
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  channels: state.channels,
  loading: state.async.loading
})

export default connect(mapStateToProps, actions)(Dashboard);

// helpers
const findActiveChannel = (channels, activeChannel) => {
  return channels.find(
    channel => channel.id === activeChannel
  );
};

const mapChannels = (channels, handleClick) => {
  return channels.map(channel => {
    return (
      <li key={channel.id} onClick={() => handleClick(channel.id)}>
        {channel.title}
      </li>
    );
  });
};

// 
// {/* <Fragment>
//         <ActionCable
//           channel={{ channel: 'channelsChannel' }}
//           onReceived={this.handleReceivedChannel}
//         />
//         {channels.length ? (
//           <Cable
//             channels={channels}
//             handleReceivedMessage={this.handleReceivedMessage}
//           />
//         ) : null}
//         <div className="ui pad equal height grid">
//           <div className="three wide column slackPurple">
//             <ChannelList channels={this.props.channels} handleClick={this.handleClick} />
//           </div>
//           {activeChannel ? (
//             <div className="thirteen wide column">
//               <ActiveChannelContainer 
//                 channel={findActiveChannel(
//                   channels,
//                   activeChannel
//                 )} 
//               />
//             </div>
//           ) : null }
//         </div>
//           {/* CREATE A NO CHANNEL COMPONENT */}
//       </Fragment> */}