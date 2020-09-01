import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import brandLogo from "@assests/img/logo.png";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import bottomImage from "@assests/img/pattern.svg";

import {
  facilityListApiCall,
  selectedFacility,
} from "../apicalls/FacilityApiCalls";

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
    paddingBottom: 12,
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
    marginTop: 20,
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
  },
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
  const [facility, setSelectFacility] = useState("");
  const [errors, setErrors] = useState('');
  const authToken = useSelector(({ auth }) => auth.authToken);
  let facilityList = useSelector(({ base }) => base.facilityList);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    
    setLoading(true);
    if(facility !== ''){
        dispatch(selectedFacility(facility));
        history.push("/dashboard");
    }else{
        setErrors('Please select facility')
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
      setAlert(true)
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Link to="/" className="brand-logo">
          <img src={brandLogo} alt="Logo" className={classes.logo} />
        </Link>
      </div>

      <Card className={classes.root}>
        <CardContent>
          {alert && (
            <Alert severity={toasterOption.option}>
              {toasterOption.message}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Grid item xs={12} className={classes.listItemsChild}>
              {loading && <CircularProgress size={24} />}
              {!loading && (
                <FormControl variant="filled" className={classes.formControl} error={errors !== ''}>
                  <InputLabel htmlFor="filled-age-native-simple">
                    Facility
                  </InputLabel>
                  <Select
                    native
                    value={facility}
                    onChange={(e) => setSelectFacility(e.target.value)}
                    inputProps={{
                      name: "facility",
                      id: "facility",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                    {facilityList.map((item) => (
                      <option value={item.value}>{item.lable}</option>
                    ))}
                  </Select>
                    <FormHelperText>{errors}</FormHelperText>
                </FormControl>
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
          <img
            src={bottomImage}
            alt="bottom-image"
            className={classes.bottomImage}
          />
        </CardContent>
      </Card>
    </>
  );
}
