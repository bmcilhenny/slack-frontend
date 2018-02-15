import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      fields: {
        username: '',
        password: ''
      }
    };
  }
  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { fields: { username, password } } = this.state;
    this.props.loginUser(username, password, this.props.history);
  };
  render() {
    const { fields } = this.state;
    return (
      <div className="backgroundSignInAndSignUpFom">
        <div className="ui middle aligned grid child">
          <div className="column">
            <div className="ui center aligned page grid">
              {this.state.error ? <h1>Try Again</h1> : null}
              <div className="eight wide  column">
                <img class="ui centered medium image" src="https://cdn.worldvectorlogo.com/logos/slack.svg"/>
                <div className="ui left aligned segment purple" >
                  <h4 className="ui dividing header large">Login</h4>

                  <div className="ui inverted form">
                    <form onSubmit={this.handleSubmit}>
                      <div className="field">
                        <label className="alignLabels" for="username">Email:</label>
                        <div className="ui icon input">
                          <input className="signupInput" type="text" placeholder="Username" name="username" value={fields.username} onChange={this.handleChange} /> <i className="mail icon"></i>
                        </div>
                      </div>
                      <div className="field">
                        <label className="alignLabels" for="password">Password:</label>
                        <div className="ui icon input">
                          <input className="signupInput" type="password" placeholder="Password" name="password" value={fields.password} onChange={this.handleChange}/> <i className="lock icon"></i>
                        </div>
                      </div>
                      <input type="submit" name="submit" className="ui purple button" />
                    </form>
                      <p>Don't have an account? <Link to="/signup" className="item" id="signUpLink">Sign up.</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
export default withRouter(connect(null, actions)(Login));

// <div>
//   {this.state.error ? <h1>Try Again</h1> : null}
//   <div className="ui form">
//     <form onSubmit={this.handleSubmit}>
//       <div className="ui field">
//         <label>Username</label>
//         <input
//           name="username"
//           placeholder="username"
//           value={fields.username}
//           onChange={this.handleChange}
//         />
//       </div>
//       <div className="ui field">
//         <label>Password</label>
//         <input
//           name="password"
//           type="password"
//           placeholder="password"
//           value={fields.password}
//           onChange={this.handleChange}
//         />
//       </div>
//       <button type="submit" className="ui basic green button">
//         Login
//       </button>
//     </form>
//     <Link to="/signup" className="item" id="signUpLink">
//       <p>Don't have an account? Sign up here.</p>
//     </Link>
//   </div>
// </div>
//
