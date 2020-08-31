import { connect } from "react-redux";
import { withRouter } from "react-router";
import YardJobOption from "../../components/Yard/YardJobOption";
import { selectYardJobOption } from "../../actions/actions";

const mapStateToProps = (state) => ({
  yardOperation: state.base.yardOperation,
});

const mapDispatchToProps = (dispatch) => ({
  selectYardJobOption: (YardJobOption) =>
    dispatch(selectYardJobOption(YardJobOption)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(YardJobOption)
);
