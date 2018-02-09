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
                <li className="nav-item active">
                    <a className="nav-link" href="home">Enter OTP</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/users/logout">Logout</a>
                    </li>
                </ul>
                </div>
            </nav>
            <div className="container">
            {this.state.success_msg.length ? 
                        <Alert bsStyle="success">
                            {this.state.success_msg}
                    </Alert> : ''}
                <div className="row justify-content-md-center">
                    <div className="col col-lg-6">
                        <form method="post" action="/users/checkotp">
                            <div className="form-group">
                                <label for="otp">Enter a number from 0 - 99:</label>
                                <input type="number" name="otp" className="form-control" id="otp" aria-describedby="emailHelp" placeholder="Enter a number" />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary justify text-center">Login</button>
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