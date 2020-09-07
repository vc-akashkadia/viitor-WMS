import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#0c79c1",
    textTransform: "uppercase",
    paddingTop: 12,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 0,
    margin: "auto",
  },
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
    color: "#707070",
  },
  content2: {
    fontFamily: "Roboto",
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: 400,
    marginTop:"-15px"
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
  const classes = useStyles();
  const { open, setOpen, type, api, data } = props;
  const [location, setLocation] = useState(data);
  const [error, setError] = useState("");
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
      setError("pelase enter the location");
    } else {
      if (type === "position") {
        //call the postion API

        console.log("api", api);
        setOpen(false);
      } else {
        //call other API

        console.log("api", api);
        setOpen(false);
      }
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
          {type !== "position" ? "Grounding Container" : "Location Update"}
        </DialogTitle>
        <DialogContent className={classes.content}>
          <Typography className={classes.innerContent}>
            Cont# <span style={{ color: "#000000" }}>1420 1100 1234</span>{" "}
          </Typography>
          {type !== "position" && (
            <Typography className={classes.innerContent}>
              Status <span style={{ color: "#0c79c1" }}>Ground</span>{" "}
            </Typography>
          )}
          <Typography className={classes.innerContent}>
            Location <span style={{ color: "#000000" }}>LOC1020</span>{" "}
          </Typography>
        </DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogContent className={classes.content2}>
            <Typography style={{ fontWeight: "400" }}>
              New Location:
            </Typography>
            <TextField
              error={error !== ""}
              id="newLocation"
              label=""
              variant="outlined"
              placeholder="Enter New Location"
              style={{ width: "100%", marginTop: 10 }}
              value={location}
              onChange={handleChange}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
              helperText={error}
            />
          </DialogContent>
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
        </form>
      </Dialog>
    </div>
  );
}
