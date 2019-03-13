import React, { Fragment } from 'react';

class ActiveChannel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          activeChannel: null
        };  
      }

    render() {
        return (
            <Fragment>
                <div className="three wide column slackPurple">
                    
                </div>
            </Fragment>
        )
    }
}

export default ActiveChannel;