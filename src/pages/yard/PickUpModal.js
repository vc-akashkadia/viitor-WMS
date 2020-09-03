import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AddPickUpApiCall } from "../../apicalls/YardApiCalls";
import { dispatch } from "store";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title:{
      fontSize: 16,
      color: "#0c79c1",
      fontWeight: 900,
      fontFamily: "Roboto",
      textTransform: "uppercase",
      paddingTop: 12,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 5,
      margin: "auto"
  },
  content:{
      color: "#5c5c5c",
      fontFamily: "Roboto",
      textAlign: "center",
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: "#f6f6f6",
      position: "relative"
  },
  licenseLabel:{
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    marginLeft: 40,
    width: "auto",
    overflow: "hidden",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    whiteSpace: "nowrap"
  },
  label:{
    fontSize: 15,
    fontWeight: 900,
    color: "#000000"
  },

  containerLabel:{
    position: "absolute",
    bottom: 40,
    left: "45%",
    transform: "translateX(-50%)",
    marginLeft: 15,
    width: "auto",
    overflow: "hidden",
    textAlign: "center",
    display: "flex",
    backgroundColor:"white",
    paddingLeft:"15px",
    justifyContent: "center",
    whiteSpace: "nowrap"

  },

  actionbutton:{
    paddingBottom: 15,
    justifyContent: "center"
  },
  button:{
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 14,
    fontWeight: 400,
    fontFamily: "Roboto",
    lineHeight: "16px",
    textTransform: "inherit"
  }
}));

export default function PickUpModal(props) {
  const { open, setOpen, container } = props;
  const classes = useStyles();
  const dispatch = useDispatch()
  const authToken = useSelector(({ auth }) => auth.authToken);
  const yardCrane = useSelector(({ base }) => base.yardCrane);
  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    let data = {
      containerNumber: container.containerNumber,
      locationNumber: container.location,
      craneNumber: yardCrane,
      truckNumber: container.truckNumber,
    };
    dispatch(AddPickUpApiCall(data,authToken,handleCallback))
  };
  const handleCallback = (response) => {
    setOpen(true);
  }

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
          <DialogTitle id="alert-dialog-title" className={classes.title}>CONFIRMATION</DialogTitle>
          <DialogContent className={classes.content}>
            <DialogContentText id="alert-dialog-description"  >
            Are you sure you want to confirm Work Order For Container : <br />
            {container.containerNumber}
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.actionbutton}>
            <Button onClick={handleClose}variant="contained"
                  size="small"  color="secondary" className={classes.button}>
              Back
            </Button>
            <Button onClick={handleConfirm} variant="contained"
                  size="small" color="primary" autoFocus className={classes.button}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      
    </div>
  );
}
