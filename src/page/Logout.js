import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// import { LayoutSplashScreen } from "../theme/layouts";
import { logout } from "../actions/authActions";
class Logout extends Component {
  componentDidMount() {
    this.props.logout();
    document.body.classList.remove('topbar-mobile-on');
  }

  render() {
    return <Redirect to="/login" />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(
  ({ auth }) => ({ hasAuthToken: Boolean(auth.authToken) }),
  mapDispatchToProps
)(Logout);
