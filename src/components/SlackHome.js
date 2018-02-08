import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { adapter } from '../adapter';
import ChannelsList from './ChannelsList';
import ChannelContainer from './ChannelContainer';
import {ActionCable} from 'react-actioncable-provider';
import withAuth from '../hocs/withAuth';

class SlackHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  arrayContainsObj = (obj, array) => {
    var i;
    for (i = 0; i < array.length; i++) {
      if (array[i].id === obj.id) {
        return true;
      }
    }
    return false;
  }

  handleSocketResponse = data => {
    debugger;
    console.log("Inside the handleSocketResponse", data)
    switch (data.type) {
      case 'NEW_MESSAGE':
        this.props.addMessage(data.payload);
        break;
      case 'NEW_CHANNEL':
        let userMemberOfChannel = this.arrayContainsObj(this.props.currentUser, data.payload.channel.users)
        if (userMemberOfChannel) {
          this.props.addChannel(data.payload.channel);
        }
        break;
      case 'NEW_DM':
        let userMemberOfDM = this.arrayContainsObj(this.props.currentUser, data.payload.channel.users)
        if (userMemberOfDM) {
          this.props.addChannel(data.payload.channel);
        }
        break;
      case 'NEW_USER':
        this.props.addUser(data.payload);
        break;
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

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
})

export default withAuth(connect(mapStateToProps, actions)(SlackHome));


// handleSocketResponse = data => {
//   debugger;
//   console.log("Inside the handleSocketResponse", data)
//   switch (data.type) {
//     case 'NEW_MESSAGE':
//       this.props.addMessage(data.payload);
//       break;
//     case 'NEW_CHANNEL':
//       let currentUser = this.props.currentUser;
//       let userMemberOfChannel = adapter.helpers.arrayContainsObj(currentUser, data.payload.channel.users)
//       if (userMemberOfChannel) {
//         this.props.addChannel(data.payload.channel);
//       }
//       break;
//     case 'NEW_DM':
//       let
//        = this.props.currentUser;
//       let userMemberOfDM = adapter.helpers.arrayContainsObj(currentUser2, data.payload.channel.users)
//       if (userMemberOfDM) {
//         this.props.addDM(data.payload.channel);
//       }
//       break;
//     case 'NEW_USER':
//       this.props.addUser(data.payload);
//       break;
//     default:
//       console.log(data);
//   }
// };
