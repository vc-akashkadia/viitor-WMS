import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "./Loader";
import Toaster from "./Toaster";
import { GroundingContianerApiCall } from "../apicalls/YardApiCalls";
import { LocationUpdatePost } from "../apicalls/ModuleAccessApiCalls";
import Divider from "@material-ui/core/Divider";
import useGlobalStyle from "@common-style";
import { constants } from "@config/constant";
let toasterOption = {
  varient: "success",
  message: "",
};

const useStyles = makeStyles((theme) => ({
  // title: {
  //   color: "#0c79c1",
  //   textTransform: "uppercase",
  //   paddingTop: 12,
  //   padding: "5px 10px",
  //   margin: "auto",
  // },
  content: {
    fontFamily: "Roboto",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 0,
  },
  innerContent: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
    color: "#777777",
  },
  content2: {
    fontFamily: "Roboto",
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: 400,
    marginTop: "-21px",
  },
  actionbutton: {
    paddingBottom: 15,
    justifyContent: "center",
  },
  button: {
    // paddingTop: 10,
    // paddingBottom: 10,
    // paddingLeft: 15,
    // paddingRight: 15,
    // fontSize: 14,
    // fontWeight: 400,
    // fontFamily: "Roboto",
    // lineHeight: "16px",
    // textTransform: "inherit",
    textTransform: "capitalize",
    padding: 0,
    height: 26,
  },
  notchedOutline: {
    borderColor: "#f6f6f6 !important",
  },
}));

export default function GroundingContainers(props) {
  const classes = { ...useGlobalStyle(), ...useStyles() };
  const { open, setOpen, type, container } = props;
  const [location, setLocation] = useState(container && container.locationBarcode);
  const [error, setError] = useState("");
  const [toaster, setToaster] = useState(false);
  const dispatch = useDispatch();
  const authToken = useSelector(({ auth }) => auth.authToken);
  const yardCrane = useSelector(({ base }) => base.yardCrane);
  const locationCrane = useSelector(({ base }) => base.locationCrane);
  const facility = useSelector(({ base }) => base.facility);
  const [loading, setLoading] = useState(false);
  //   const [open, setOpen] = React.useState(open);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location === "") {
      setError(constants.yardOperation.locationError);
    } else {
      if (type === "location") {
        let data = {
          containerNumber: container.containerNumber,
          locationNumber: location,
          craneNumber: locationCrane,
          facility_id: facility,
        };
        setLoading(true);
        dispatch(LocationUpdatePost(data, authToken, handleCallback));
        // setOpen(false);
      } else {
        //call other API
        let data = {
          containerNumber: container.containerNumber,
          locationNumber: location,
          craneNumber: yardCrane,
          truckNumber: container.truckNumber,
          facility_id: facility,
        };
        setLoading(true);

        // setTimeout(() => {
        //   handleCallback({});
        // }, 1000);
        dispatch(GroundingContianerApiCall(data, authToken, handleCallback));
      }
    }
  };

  const handleCallback = (response) => {
    const {
      data: { status },
    } = response;
    if (status) {
      toasterOption = {
        varient: "success",
        message:
          type === "location"
            ? constants.yardOperation.locationSucess
            : constants.yardOperation.groundsuccess,
      };
      setToaster(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(true);
      }, 1000);
    } else {
      toasterOption = {
        varient: "error",
        message: constants.apiError.error,
      };
      setToaster(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(true);
      }, 1000);
    }
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>
          {type !== "location" ? "Grounding Container" : "Location Update"}
        </DialogTitle>
        <Divider className={classes.dividerStyle} />
        <DialogContent className={classes.content}>
          <Typography className={classes.innerContent}>
            Cont#:{" "}
            <span style={{ color: "#1f1f21", textAlign: "right" }}>
              {container && container.containerNumber}
            </span>{" "}
          </Typography>
          {type !== "location" && (
            <Typography className={classes.innerContent}>
              Status: <span style={{ color: "#0c79c1" }}>Ground</span>{" "}
            </Typography>
          )}
          <Typography className={classes.innerContent}>
            Location:{" "}
            <span style={{ color: "#1f1f21", textAlign: "right" }}>
              {container && container.location}
            </span>{" "}
          </Typography>
          <Typography className={classes.innerContent}>
            Crane:{" "}
            <span style={{ color: "#1f1f21", textAlign: "right" }}>
              {type === "location" ? locationCrane : yardCrane}
            </span>{" "}
          </Typography>
        </DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogContent className={classes.content2}>
            <Typography className={classes.innerContent}>
              New Location:
            </Typography>
            <TextField
              error={error !== ""}
              id="newLocation"
              label=""
              variant="outlined"
              placeholder="Enter New Location"
              style={{ width: "100%", marginTop: "-6px" }}
              value={location !== null ? location : ""}
              onChange={handleChange}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
              helperText={error}
            />
          </DialogContent>
          {loading && <Loader />}
          {!loading && (
            <DialogActions className={classes.actionbutton}>
              <Button
                onClick={handleClose}
                variant="contained"
                size="small"
                color="secondary"
                className={classes.button}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="small"
                color="primary"
                autoFocus
                className={classes.button}
              >
                Confirm
              </Button>
            </DialogActions>
          )}
        </form>
      </Dialog>
      <Toaster
        open={toaster}
        handleClose={setToaster}
        option={toasterOption.varient}
        message={toasterOption.message}
      />
    </div>
  );
}
