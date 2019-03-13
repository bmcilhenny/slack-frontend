import React, { Fragment } from 'react';
import { Icon } from 'semantic-ui-react';

const SidebarHeader = (props) => {

    return (
        <Fragment>
            <h2 className="white">{props.teamName} <Icon name="bell outline white" style={{position: 'relative', float: 'right'}}></Icon></h2>
            <h3 className="white read nameLabel"><Icon name="bullseye green"></Icon> {props.displayName}</h3>
        </Fragment>
    )
        

}

export default SidebarHeader