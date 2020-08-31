import { connect } from "react-redux";
import { withRouter } from "react-router";
import FacilityPage from "../components/FacilityPage";
import { selectFacility } from "../actions/actions";

const mapStateToProps = (state) => ({
  user : state.auth.user,
  facility: state.base.facility,
});

const mapDispatchToProps = (dispatch) => ({
  selectFacility: (facility) => dispatch(selectFacility(facility)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FacilityPage)
);
