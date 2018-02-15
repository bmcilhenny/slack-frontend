import React from 'react';
import {adapter} from '../adapter';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link, withRouter } from 'react-router-dom';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      fields: {
        username: '',
        password: '',
        password_confirmation: '',
        display_name: '',
        image_url: ''
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
        this.props.history.push('/login');
      }
      this.setState({
        username: '',
        password: '',
        password_confirmation: '',
        display_name: '',
        image_url: ''
      })
    });
  };

  render() {
    const { fields } = this.state;
    console.log(fields)
    return (
      <div className="backgroundSignInAndSignUpFom">
        <div className="ui middle aligned grid child">
          <div className="column">
            <div className="ui center aligned page grid">
              {this.state.error ? <h1>Try Again</h1> : null}
              <div className="eight wide  column">
                <img class="ui centered medium image" src="https://cdn.worldvectorlogo.com/logos/slack.svg"/>
                <div className="ui left aligned segment purple" >
                  <h4 className="ui dividing header large">Account Info</h4>

                  <div className="ui inverted form">
                    <form onSubmit={this.handleSubmit}>
                      <div className="field">
                        <label className="alignLabels" for="username">Email:</label>
                        <div className="ui icon input">
                          <input className="signupInput" type="text" placeholder="Username" name="username" value={fields.username} onChange={this.handleChange} /> <i className="mail icon"></i>
                        </div>
                      </div>
                      <div className="field">
                        <label className="alignLabels" for="display_name">Display Name</label>
                        <div className="ui icon input">
                          <input className="signupInput" type="text" name="display_name" placeholder="Your Slack display name" value={fields.display_name} onChange={this.handleChange}/> <i class="slack icon"></i>
                        </div>
                      </div>
                      <div className="field">
                        <label className="alignLabels" for="image_url">Image Url</label>
                        <div className="ui icon input">
                          <input className="signupInput" type="text" name="image_url" placeholder="Your Slack avatar" value={fields.image_url} onChange={this.handleChange}/> <i class="camera retro icon"></i>
                        </div>
                      </div>
                      <div className="field">
                        <label className="alignLabels" for="password">Password:</label>
                        <div className="ui icon input">
                          <input className="signupInput" type="password" placeholder="Password" name="password" value={fields.password} onChange={this.handleChange}/> <i className="lock icon"></i>

                        </div>
                      </div>
                      <div className="field">
                        <label className="alignLabels" for="password_confirmation">Confirm your password:</label>
                        <div className="ui icon input">
                          <input className="signupInput" type="password" placeholder="Reenter password" name="password_confirmation" value={fields.password_confirmation} onChange={this.handleChange}/> <i className="lock icon"></i>
                        </div>
                      </div>
                      <input type="submit" name="submit" className="ui purple button" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }
}

export default withRouter(connect(null, actions)(Signup));


// const { fields } = this.state;
// console.log(fields)
// return (
//   <div>
//     {this.state.error ? <h1>Try Again</h1> : null}
//     <div className="ui form">
//       <form onSubmit={this.handleSubmit}>
//         <div className="ui field">
//           <label>Username</label>
//           <input
//             name="username"
//             placeholder="username"
//             value={fields.username}
//             onChange={this.handleChange}
//           />
//         </div>
        // <div className="ui field">
        //   <label>Display Name</label>
        //   <input
        //     name="display_name"
        //     placeholder="Your Slack display name"
        //     value={fields.display_name}
        //     onChange={this.handleChange}
        //   />
        // </div>
        // <div className="ui field">
        //   <label>Profile Image</label>
        //   <input
        //     name="image_url"
        //     placeholder="Enter a url for your profile image"
        //     value={fields.image_url}
        //     onChange={this.handleChange}
        //   />
        // </div>
//         <div className="ui field">
//           <label>Password</label>
//           <input
//             name="password"
//             type="password"
//             placeholder="password"
//             value={fields.password}
//             onChange={this.handleChange}
//           />
//         </div>
//         <div className="ui field">
//           <label>Confirm Password</label>
//           <input
//             name="password_confirmation"
//             type="password"
//             placeholder="Reenter password"
//             value={fields.password_confirmation}
//             onChange={this.handleChange}
//           />
//         </div>
//         <button type="submit" className="ui basic green button">
//           Signup
//         </button>
//       </form>
//     </div>
//   </div>
// );

//
// handleSubmit = e => {
//   e.preventDefault();
//
//   const user = {
//     username: this.state.username,
//     password: this.state.password,
//     password_confirmation: this.state.password_confirmation,
//     display_name: this.state.display_name,
//     image_url: this.state.image_url,
//     team_id: '4'
//   }
//
//   this.props.signup(user);
//   this.setState({
//     username: '',
//     password: '',
//     password_confirmation: '',
//     display_name: '',
//     image_url: '',
//   })
// };
