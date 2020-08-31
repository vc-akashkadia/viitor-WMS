import { connect } from "react-redux";
import { withRouter } from "react-router";
import YardCrane from "../../components/Yard/YardCrane";
import { selectYardCrane } from "../../actions/actions";

const mapStateToProps = (state) => ({
  yardCrane: state.base.yardCrane,
});

const mapDispatchToProps = (dispatch) => ({
  selectYardCrane: (yardCrane) => dispatch(selectYardCrane(yardCrane)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(YardCrane)
);
