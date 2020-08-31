import { connect } from "react-redux";
import { withRouter } from "react-router";
import GroundContainer from "../../components/Yard/GroundingContainer";
import { selectGroundContainer } from "../../actions/actions";

const mapStateToProps = (state) => ({
  groundContainer: state.base.groundContainer,
});

const mapDispatchToProps = (dispatch) => ({
  selectGroundContainer: (yardCrane) =>
    dispatch(selectGroundContainer(yardCrane)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GroundContainer)
);
