import { connect } from "react-redux";
import { withRouter } from "react-router";
import ModuleAccessList from "../../components/ModuleAccess/ModuleAccessList";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModuleAccessList)
);
