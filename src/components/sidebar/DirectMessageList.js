import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import DirectMessage from './DirectMessage';
import Cable from '../cables/Cable'; 
import { connect } from 'react-redux';

class DirectMessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          activeChannel: this.props.activeChannel
        };  
    }

    handleClick = id => {
        this.setState({ activeChannel: id });
    };

    render() {
        const { activeChannel } = this.state;
        const { directMessages } = this.props;
        const dmList = directMessages.map(dm => {
            const active = activeChannel === dm.id;
            return (
                <DirectMessage 
                    key={dm.id} 
                    dm={dm} 
                    active={active}
                    handleClick={this.handleClick}
                />
            )
        }

        return (
            <Fragment>
                <ActionCable
                    channel={{ channel: 'ChannelsChannel' }}
                    onReceived={this.props.handleReceivedChannel}
                />
                <Cable
                    channels={directMessages}
                    handleReceivedMessage={this.props.handleReceivedMessage}
                />
                <h3 className="white">Direct Message</h3>
                < NewDMModal />
                {dmList}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    directMessages: state.directMessages,
    activeChannel: state.activeChannel,
    loading: state.async.loading
})

export default connect(mapStateToProps, null)(DirectMessageList);