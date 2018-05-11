import React from 'react';
import { Form, Button, Icon, Input } from 'semantic-ui-react';
import { adapter } from '../adapter';
import { connect } from 'react-redux';

class ActiveChannelHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h1>{this.props.name}</h1>
      </div>
    )
  }
}

export default ActiveChannelHeader;
