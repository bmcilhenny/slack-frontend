import React, { Fragment } from 'react';
import SidebarHeader from './SidebarHeader';
import ChannelList from './ChannelList';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          settingsOpen: false,
          status: 'online'
        };  
    }

    handleSettingsToggle = (e) => {
        e.preventDefault();
        this.setState({
            settingsOpen: true
        })
    }

    handleStatusChange = (e) => {
        e.preventDefault();
        this.setState({
            settingsOpen: true
        })
    }


    render() {
        const { display_name, team } = this.props.currentUser;
        const { settingsOpen, status } = this.state;
        const teamName = team.team_name;
        return (
            <Fragment>
                <div className="three wide column slackPurple">
                    <SidebarHeader 
                        displayName={display_name} 
                        teamName={teamName}
                        status={status} 
                        handleSettingsToggle={this.handleSettingsToggle} 
                        handleStatusChange={this.handleStatusChange} 
                    />
                    <ChannelList  />
                    <DirectMessageList />
                </div>
            </Fragment>
        )
    }

}

export default Sidebar;