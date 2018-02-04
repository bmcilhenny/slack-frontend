import React from 'react';
import {adapter} from '../adapter';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      fields: {
        username: '',
        password: '',
        confirmPassword: ''
      }
    };
  }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    e.preventDefault();
    adapter.auth.signup(this.state.fields).then(data => {
      console.log('response is', data);
      if (data.error) {
        this.setState({ error: true });
      } else {
        this.props.handleSignup(data);
        this.props.history.push('/');
      }
    });
  };

  render() {
    const { fields } = this.state;
    return (
      <div>
        {this.state.error ? <h1>Try Again</h1> : null}
        <div className="ui form">
          <form onSubmit={this.handleSubmit}>
            <div className="ui field">
              <label>Username</label>
              <input
                name="username"
                placeholder="username"
                value={fields.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="ui field">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="password"
                value={fields.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="ui field">
              <label>Confirm Password</label>
              <input
                name="passwordConfirmation"
                type="password"
                placeholder="Reenter password"
                value={fields.passwordConfirmation}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="ui basic green button">
              Signup
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
