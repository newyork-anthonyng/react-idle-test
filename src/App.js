import React, { Fragment, Component } from "react";
import Idle from "react-idle";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showWarning: false,
      isAuthenticated: true
    };

    this.INACTIVE_TIME = 1000;
    this.LOGOUT_WARNING_TIME = 1500;
  }

  renderAuthenticatedPage = () => {
    return (
      <div>
        <h1>Profile</h1>
        {this.state.showWarning && (
          <Fragment>
            <h2>You are about to be logged off</h2>
            <Idle
              timeout={this.LOGOUT_WARNING_TIME}
              onChange={({ idle }) => {
                if (idle) {
                  this.setState({
                    isAuthenticated: false
                  });
                }
              }}
            />
          </Fragment>
        )}

        <Idle
          defaultIdle={this.state.showWarning}
          timeout={this.INACTIVE_TIME}
          onChange={({ idle }) => {
            this.setState({
              showWarning: idle
            });
          }}
        />
      </div>
    );
  };

  render() {
    if (this.state.isAuthenticated) {
      return this.renderAuthenticatedPage();
    } else {
      return <h1>Please log in</h1>;
    }
  }
}

export default App;
