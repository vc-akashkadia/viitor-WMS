import { connect } from "react-redux";
import { withRouter } from "react-router";
import LocationUpdatePage from "../../components/Yard/LocationUpdatePage";

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = (dispatch) => ({
  
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LocationUpdatePage)
);
