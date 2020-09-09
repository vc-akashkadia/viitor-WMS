import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
// import { ReactComponent as GateinIcon } from "@assests/img/gate-in1.svg"
// import  GateinIcon1 from "@assests/img/gate-in1.svg"

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
    // justifyContent: "space-between",
    marginBottom: 10,
    marginTop: "3px",
    color: "#707070",
  },
  innerContentCheck: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  content2: {
    fontFamily: "Roboto",
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: 400,
    marginTop: "-15px",
  },
  actionbutton: {
    paddingBottom: 15,
    justifyContent: "center",
  },
  boxStyle: {
    // backgroundColor: "lightgrey",
    width: "190px",
    border: "1px solid LightGray",
    // padding: "15px",
    paddingLeft: "5px",
    margin: "4px 0px 0px 0px",
  },
  searchInput: {
    width: "60%",
    '& input':{
      height: '25px'
    }
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location === "") {
      setError("pelase enter the location");
    } else {
      if (type === "add") {
        //call the add API

        console.log("api", api);
        setOpen(false);
      } else {
        //call edit API

        console.log("api", api);
        setOpen(false);
      }
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>
          {type === "add" ? "Add User Access" : "Update User Access"}
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.content}>
          {type === "add" ? (
            ""
          ) : (
            <>
              <Typography className={classes.innerContent}>
                User Name:
                {type === "add" ? (
                  <span style={{ color: "#000000" }}>John</span>
                ) : (
                  <TextField
                    className={classes.searchInput}
                    id="outlined-basic"
                    placeholder="Enter No."
                    label=""
                    variant="outlined"
                    style={{ marginTop: "-6px", marginLeft: "2px" }}
                  />
                )}
              </Typography>
              <Typography className={classes.innerContent}>
                Facility:
                {type === "add" ? (
                  <span style={{ color: "#000000" }}>John</span>
                ) : (
                  <TextField
                    className={classes.searchInput}
                    id="outlined-basic"
                    placeholder="Enter No."
                    label=""
                    variant="outlined"
                    style={{ marginTop: "-6px", marginLeft: "2px" }}
                  />
                )}
              </Typography>
            </>
          )}

          {/* Access user */}
          <form onSubmit={handleSubmit}>
            <Typography style={{ fontWeight: "400" }}>Access</Typography>
            <div className={classes.boxStyle}>
              <Typography style={{ fontWeight: "400" }}>
                Gate In :
                <Checkbox
                  defaultChecked
                  // onChange={handleChange}
                  //   className={classes.colorPrimary}
                  // indeterminate
                  // indeterminateIcon={<GateinIcon />}
                  // indeterminateIco n={<img src={GateinIcon1} alt="img" />}
                  name="checkedB"
                  color="#0c79c1"
                />
              </Typography>
              <Typography style={{ fontWeight: "400" }}>
                Yard Job :
                <Checkbox
                  //   defaultChecked
                  //   className={classes.colorPrimary}
                  name="checkedB"
                  color="#0c79c1"
                />
              </Typography>
            </div>
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
              Update
            </Button>
          </DialogActions>
        </form>
              </DialogContent>
      </Dialog>
    </div>
  );
}
