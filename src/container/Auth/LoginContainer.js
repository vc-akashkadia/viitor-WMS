import { connect } from "react-redux";
import { withRouter } from "react-router";
import LoginComponent from "../../components/Auth/LoginComponent";
import { login } from "../../actions/authActions";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  login : (data) => dispatch(login(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
);
