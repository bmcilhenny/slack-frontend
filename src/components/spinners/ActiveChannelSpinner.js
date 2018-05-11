import React from 'react';

export class ActiveChannelSpinner extends React.Component {
  render() {
    return (
      <div>
        <img alt="spinner" src="loading-channel.svg" />
        <h1 className="white">Loading...</h1>
      </div>
      )
  }
}
