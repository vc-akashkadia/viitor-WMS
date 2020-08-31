import { connect } from "react-redux";
import { withRouter } from "react-router";
import YardOperation from "../../components/Yard/YardOperation";
import { selectYardOperation } from "../../actions/actions";

const mapStateToProps = (state) => ({
  yardOperation: state.base.yardOperation,
});

const mapDispatchToProps = (dispatch) => ({
  selectYardOperation: (yardOperation) =>
    dispatch(selectYardOperation(yardOperation)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(YardOperation)
);
