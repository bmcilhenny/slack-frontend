import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import Channel from './Channel';
import Cable from '../cables/Cable';
import { connect } from 'react-redux';
import NewChannelModal from '../modals/NewChannelModal';

class ChannelList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          activeChannel: this.props.activeChannel
        };  
    }

    handleClick = id => {
        this.setState({ activeChannel: id });
    };

    // TURN THESE INTO REDUX DISPATCHES
    // handleReceivedConversation = response => {
    //     const { conversation } = response;
    //     this.setState({
    //       conversations: [...this.state.conversations, conversation]
    //     });
    // };
    
    // handleReceivedMessage = response => {
    //     const { message } = response;
    //     const conversations = [...this.state.conversations];
    //     const conversation = conversations.find(
    //         conversation => conversation.id === message.conversation_id
    //     );
    //     conversation.messages = [...conversation.messages, message];
    //     this.setState({ conversations });
    // };

    render() {
        const { activeChannel } = this.state;
        const { channels } = this.props;
        const channelList = channels.map(channel => {
            const active = activeChannel === channel.id;
            return (
                <Channel 
                    key={channel.id} 
                    channel={channel} 
                    active={active}
                    handleClick={this.handleClick}
                />
            )
        });

        return (
            <Fragment>
                <ActionCable
                    channel={{ channel: 'ChannelsChannel' }}
                    onReceived={this.props.handleReceivedChannel}
                />
                <Cable
                    channels={channels}
                    handleReceivedMessage={this.props.handleReceivedMessage}
                />
                <h3 className="white">Channels</h3>
                <NewChannelModal />
                {channelList}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    channels: state.channels,
    activeChannel: state.activeChannel,
    loading: state.async.loading
})

export default connect(mapStateToProps, null)(ChannelList);