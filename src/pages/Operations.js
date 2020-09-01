import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import brandLogo from "@assests/img/logo.png";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import SettingsIcon from "@material-ui/icons/Settings";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import Header from "../components/Header"
import {
  facilityListApiCall,
  selectedFacility,
} from "../apicalls/FacilityApiCalls";
import { GetYardCraneList, selectYardCraneApi } from "../apicalls/YardApiCalls";
let toasterOption = {
  option: "error",
  message: "Please select Facility",
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 240,
    marginTop: "15px",
  },
  listItemsChild: {
    marginBottom: 10,
    marginTop: 10,
    padding: "10px",
    backgroundColor: "#ffffff",
  },
  lableContainer: {
    textAlign: "center",
  },
  cardcontent: {
    padding: "0px !important",
  },
  formControl: {
    minWidth: 120,
    width: "100%",
  },
}));

export default function Facility() {
  const classes = useStyles();
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [crane, setCrane] = useState("");
  const authToken = useSelector(({ auth }) => auth.authToken);
  const facility = useSelector(({ base }) => base.facility);
  let yardCraneList = useSelector(({ base }) => base.yardCraneList);
  const dispatch = useDispatch();
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (crane !== "") {
      dispatch(selectYardCraneApi(crane));
      history.push("/yard/operation");
    } else {
      setErrors("Please Select Crane");
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(yardCraneList.length);
    if (yardCraneList.length === 0) {
      dispatch(
        GetYardCraneList(facility, authToken, handleCallBackYardCraneList)
      );
      setLoading(false);
    }
  }, [yardCraneList]);

  const handleCallBackYardCraneList = (response) => {
    const {
      data: { status },
    } = response;
    if (status) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
    <Header />
      {/* <div>
        <Link to="/" className="brand-logo">
          <img
            src={brandLogo}
            alt="Logo"
            style={{
              display: "block",
              height: "100%",
              width: "56%",
              marginLeft: "52px",
              marginTop: "10px",
            }}
          />
        </Link>
      </div> */}
      {/* <div> */}
        <Grid
          item
          xs={12}
        >
          <CardContent className={classes.cardcontent}>
            <SettingsIcon />{" "}
            <Typography
              onClick={handleExpandClick}
              className={classes.lableContainer}
              variant="h6"
            >
              Yard Operation
            </Typography>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              {loading && <CircularProgress size={24} />}
              {!loading && (
                <form onSubmit={handleSubmit}>
                  <FormControl
                    variant="filled"
                    className={classes.formControl}
                    error={errors !== ""}
                  >
                    <InputLabel htmlFor="filled-age-native-simple">
                      Select Yard Crane
                    </InputLabel>
                    <Select
                      native
                      value={facility}
                      onChange={(e) => setCrane(e.target.value)}
                      inputProps={{
                        name: "crane",
                        id: "crane",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value={10}>Ten</option>
                      <option value={20}>Twenty</option>
                      <option value={30}>Thirty</option>
                      {yardCraneList.map((item) => (
                        <option value={item.value}>{item.lable}</option>
                      ))}
                    </Select>
                    <FormHelperText>{errors}</FormHelperText>
                  </FormControl>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ width: "208px" }}
                    disabled={loading}
                  >
                    Ok
                  </Button>
                </form>
              )}
            </Collapse>
          </CardContent>
        </Grid>
        <Grid item xs={12} className={classes.listItemsChild}>
          <SettingsIcon />{" "}
          <Typography className={classes.lableContainer} variant="h6">
            Position Update{" "}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.listItemsChild}>
          <Typography className={classes.lableContainer} variant="h6">
            Gate In
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.listItemsChild}>
          <Typography className={classes.lableContainer} variant="h6">
            Gate Out{" "}
          </Typography>
        </Grid>
      {/* </div> */}
    </>
  );
}
