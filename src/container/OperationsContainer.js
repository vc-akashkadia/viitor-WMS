import { connect } from "react-redux";
import { withRouter } from "react-router";
import OperationPage from "../components/OperationPage";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OperationPage)
);
