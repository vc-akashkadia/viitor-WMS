import { connect } from "react-redux";
import { withRouter } from "react-router";
import DamangeContainerPage from "../../components/GateMove/DamangeContainerPage";
import { selectGateInOperationOption } from "../../actions/actions";

const mapStateToProps = (state) => ({
  vehical: state.base.gateInOperation.vehical,
  number: state.base.gateInOperation.number,
});

const mapDispatchToProps = (dispatch) => ({
  setGateINOptions: (data) => dispatch(selectGateInOperationOption(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DamangeContainerPage)
);
