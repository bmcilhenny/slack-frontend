import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }


  render() {
    // const loggedIn = !!this.props.currentUser.id;
    return (
      <div className={`ui top fixed inverted menu`}>
        <Link to="/" className="item">
          <h2 className="ui header">
            <div className="content">{this.props.title}</div>
            <div className="sub header">{this.props.description}</div>
          </h2>
        </Link>
        <div className="right menu">
          {this.props.loggedIn ? (
              <a
                onClick={e => {
                  e.preventDefault();
                  this.props.logoutUser();
                }}
              className="item">
                Sign Out
              </a>
            ) : (
              <Link to="/login" className="item">Go to Login</Link>
            )}
        </div>
      </div>
    );
  }
}

// export default withRouter(Navbar);
const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id
});

export default connect(mapStateToProps, actions);
