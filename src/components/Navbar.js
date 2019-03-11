import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../actions'

class Navbar = extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = e => {
    e.preventDefault();
    console.log(this.props)
    this.props.logoutUser(this.props.history);
  };

  render() {
    debugger;
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
                onClick={this.handleLogout}
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

const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id,
  currentUser: state.auth.currentUser
});

export default withRouter(connect(mapStateToProps, actions)(Navbar));
