import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = props =>
  <div className='wrong-route'>
    <h1>404 Resource Not Found</h1>
    <Link to="/slackhome">
      Back to Slack
    </Link>
  </div>

export default NoMatch