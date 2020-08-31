import { connect } from "react-redux";
import { withRouter } from "react-router";
import AddUser from "../../components/ModuleAccess/AddUser";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddUser)
);
