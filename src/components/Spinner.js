import React from 'react';

export class Spinner extends React.Component {
  render() {
    return (
      <div>
        <img alt="spinner" src="loading-bars.svg" />
        <h1 className="white">Loading...</h1>
      </div>
      );
  }
}
