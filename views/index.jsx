var React = require('react');
var DefaultLayout = require('./layouts/default');

class HelloMessage extends React.Component {
  render() {
    return (
      <DefaultLayout title={this.props.title}>
        <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#">OTP App</a>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                  <a class="nav-link" href="#">Enter OTP</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/logout">Logout</a>
                </li>
              </ul>
            </div>
          </nav>
      </DefaultLayout>
    );
  }
}

module.exports = HelloMessage;