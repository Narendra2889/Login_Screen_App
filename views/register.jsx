var React = require('react');
var DefaultLayout = require('./layouts/default');
import { Alert } from 'react-bootstrap';

class HelloMessage extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          errors: props.errors || [],
          success_msg: props.success_msg || null,
          error_msg: props.error_msg || null,
          error: props.error || null
      }
  }

  render() {
    return (
      <DefaultLayout title={this.props.title}>
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="#">OTP App</a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="/register">Register</a>
                </li>             
              </ul>
            </div>
          </nav>
          <div className="container">
           <div>
           {this.state.errors.map(function(name, index) {
               return <Alert bsStyle="warning">
                    {name.msg}
                </Alert>
            })}

            </div>
            <div className="row justify-content-md-center">
                <div className="col col-lg-6">
                <div className="text-center">
                    <h3>Register Page</h3>
                </div>
                <form method="post" action="/users/register">
                    <div className="form-group">
                        <label for="email">Email address</label>
                        <input type="email" name="email" className="form-control" id="eail" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" className="form-control" id="password" placeholder="Password"/>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary justify text-center">Register</button>
                    </div>


                </form>
                </div>
            </div>
          </div>
      </DefaultLayout>
    );
  }
}

module.exports = HelloMessage;