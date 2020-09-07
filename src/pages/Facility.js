import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
// import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
import bottomImage from "@assests/img/pattern.svg";
import Select from "../components/Select";

import {
  facilityListApiCall,
  selectedFacility,
} from "../apicalls/FacilityApiCalls";
import { Typography } from "@material-ui/core";
import Header from "../components/Header";
import Loader from "../components/Loader";

let toasterOption = {
  option: "error",
  message: "Please select Facility",
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "500px",
    marginTop: "15px",
    margin: "auto",
    position: "relative",
    paddingBottom: 101,
    "@media (min-width:241px)": {
      paddingBottom: 40,
    },
    "@media (min-width:768px)": {
      paddingBottom: 100,
    },
  },
  logo: {
    display: "block",
    height: "100%",
    width: 100,
    margin: "10px auto",
  },
  listItemsChild: {
    marginBottom: 20,
    // marginTop: 20,
  },
  formControl: {
    minWidth: 120,
    width: "100%",
    display: "flex",
  },
  bottomImage: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    left: 0,
    display: "block",
  },
  // label: {
  //   fontSize: 14,
  //   color: "#707070",
  //   fontWeight: 500,
  //   fontFamily: "Roboto",
  // },
  button: {
    fontSize: 13,
    color: "#ffffff",
    fontWeight: 500,
    fontFamily: "Roboto",
    width: "100%",
    height: 30,
    backgroundColor: "#0c79c1",
    textTransform: "inherit",
  },
  cardContent: {
    paddingBottom: "5px",
    marginTop: "25px",
  },
}));

export default function Facility() {
  const classes = useStyles();
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [facility, setSelectFacility] = useState(
    useSelector(({ base }) => base.facility)
  );
  const [errors, setErrors] = useState("");
  const authToken = useSelector(({ auth }) => auth.authToken);
  let facilityList = useSelector(({ base }) => base.facilityList);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);
    if (facility !== "") {
      dispatch(selectedFacility(facility));
      history.push("/operations");
    } else {
      setErrors("Please select facility");
      //setAlert(true)
      setLoading(false);
    }

    //dispatch(LoginApi(data,remember_me, handleCallback));
  };
  useEffect(() => {
    if (facilityList.length === 0) {
      dispatch(facilityListApiCall(authToken, handleCallbackFacilityList));
    }
  });
  const handleCallbackFacilityList = (response) => {
    const {
      data: { status },
    } = response;
    if (status) {
      setLoading(false);
    } else {
      toasterOption = {
        option: "error",
        message: "Try After Some Time",
      };
      setAlert(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <br />

      <Card className={classes.root}>
        <CardContent>
          {alert && (
            <Alert severity={toasterOption.option}>
              {toasterOption.message}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Grid item xs={12} className={classes.listItemsChild}>
              {loading && <Loader />}
              {!loading && (
                <>
                  {/* <Typography
                    className={classes.formControl}
                    style={{ textAlign: "center", paddingBottom: 5 }}
                  >
                    Facility
                  </Typography> */}
                  <FormControl
                    variant="filled"
                    className={classes.formControl}
                    error={errors !== ""}
                  >
                    <Select
                      selectedValue={facility !== '' ? facility : 'none'}
                      handleChange={setSelectFacility}
                      options={facilityList}
                      placeholder="Select Facility"
                    />

                    <FormHelperText>{errors}</FormHelperText>
                  </FormControl>
                </>
              )}
            </Grid>

            <Grid item xs={12} className={classes.listItemsChild}>
              <Button
                type="submit"
                variant="contained"
                size="small"
                className={classes.button}
                disabled={loading}
              >
                Ok {loading && <CircularProgress size={24} />}
              </Button>
            </Grid>
          </form>
          <img src={bottomImage} alt="bottom" className={classes.bottomImage} />
        </CardContent>
      </Card>
    </>
  );
}
