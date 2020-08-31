import { connect } from "react-redux";
import { withRouter } from "react-router";
import GateMovePage from "../../components/GateMove/GateMovePage";
import { selectGateInOperationOption } from "../../actions/actions";

const mapStateToProps = (state) => ({
  vehical: state.base.gateInOperation.vehical,
  number: state.base.gateInOperation.number,
  type: state.base.gateInOperation.type,
});

const mapDispatchToProps = (dispatch) => ({
  setGateINOptions: (data) => dispatch(selectGateInOperationOption(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GateMovePage)
);
