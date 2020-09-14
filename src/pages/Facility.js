import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

// import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
import bottomImage from "@assests/img/pattern.svg";
import Select from "../components/Select";
import Toaster from "../components/Toaster";
import InputBase from "@material-ui/core/InputBase";
import {constants} from "@config/constant";

import {
  facilityListApiCall,
  selectedFacility,
} from "../apicalls/FacilityApiCalls";
import Header from "../components/Header";
import Loader from "../components/Loader";

let toasterOption = {
  option: "error",
  message: constants.facility.error,
};

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 3,
    position: "relative",
    backgroundColor: "#f6f6f6",
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "0px 26px 0px 7px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    width: "100%",
    height: 30,
    // display: "flex",
    color:"#1f1f21",
    alignItems: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "inline-block",
    lineHeight: "32px",
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Roboto"].join(","),
    "&:focus": {
      borderRadius: 3,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "500px",
    margin: "0 10px",
    height: "calc(100vh - 75px)",
    // margin: "auto",
    position: "relative",
    // paddingBottom: 125,
    "@media (min-width:241px)": {
      // paddingBottom: 40,
      margin: '0 15px',
      maxWidth: '100%'
    },
    "@media (min-width:768px)": {
      paddingBottom: 100,
      margin: 'auto',
      height: 'fit-content',
      maxWidth: "500px"
    }
  },
  logo: {
    display: "block",
    height: "100%",
    width: 100,
    margin: "10px auto",
  },
  listItemsChild: {
    marginBottom: 10,
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
    padding: "0 10px"
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
  facilityForm:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 210
  }
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
      dispatch(selectedFacility(facility,authToken,handleCallback));
      
    } else {
      setErrors(constants.facility.error);
      //setAlert(true)
      setLoading(false);
    }

    //dispatch(LoginApi(data,remember_me, handleCallback));
  };
  const handleCallback = (response) => {
    const {data : {status}} =response
    //if(status){
      history.push("/operations");
    // }else{
    //   toasterOption = {
    //     option: "error",
    //     message: 'Wrong Facility Selected',
    //   };
    //   setAlert(true);
      
    // }
    setLoading(false);
    
  }
  useEffect(() => {
    if (facilityList.length === 0) {
      dispatch(facilityListApiCall(authToken, handleCallbackFacilityList));
    }
  },[]);
  const handleCallbackFacilityList = (response) => {
    const {
      data: { status },
    } = response;
    if (status) {
      setLoading(false);
    } else {
      toasterOption = {
        option: "error",
        message: constants.apiError.error,
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
        <CardContent style={{minHeight: '250px'}}>
          {/* {alert && (
            <Alert severity={toasterOption.option}>
              {toasterOption.message}
            </Alert>
          )} */}
          <form onSubmit={handleSubmit} className={classes.facilityForm}>
            <Grid item xs={12} className={classes.listItemsChild}>
              {loading && <Loader />}
              {!loading && (
                <>
                  <FormControl
                    variant="filled"
                    className={classes.formControl}
                    error={errors !== ""}
                  >
                    <Select
                      selectedValue={facility !== '' ? facility : 'none'}
                      handleChange={setSelectFacility}
                      options={facilityList}
                      placeholder={constants.formPlaceHolder.facility}
                      inputStyle={<BootstrapInput />}
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
                Go 
              </Button>
            </Grid>
          </form>
          <img src={bottomImage} alt="bottom" className={classes.bottomImage} />
        </CardContent>
      </Card>
      <Toaster 
      open={alert}
      handleClose={setAlert}
      option={toasterOption.option}
      message={toasterOption.message}
      />
    </>
  );
}
