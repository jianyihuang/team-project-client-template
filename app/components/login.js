import React from 'react';
import {Link} from 'react-router';

export default class LoginPage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="pr-wrap">
              <div className="pass-reset">
                <label>
                Enter the email you signed up with</label>
                <input type="email" placeholder="Email" />
                <input type="submit" value="Submit" className="pass-reset-submit btn btn-success btn-sm" />
              </div>
            </div>
            <div className="wrap">
              <p className="form-title">
              ExServ</p>
              <form className="login">
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <input type="submit" value="Sign In" className="btn btn-success btn-sm" />
                <div className="remember-forgot">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" />
                          Remember Me
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 forgot-pass-content">
                      <a href="javascription:void(0)" className="forgot-pass">Forgot Password</a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
