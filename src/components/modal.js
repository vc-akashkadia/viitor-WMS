import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import container from "@assests/img/popup-container.svg";
import license from "@assests/img/popup-licence.svg";
import { Divider } from "@material-ui/core";
import LocationSlip from './print/LocationPrint'
import EIRSlip from './print/EIRPrint'
const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 16,
    color: "#0c79c1",
    fontWeight: 900,
    fontFamily: "Roboto",
    textTransform: "uppercase",
    paddingTop: 12,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    margin: "auto",
  },
  content: {
    color: "#5c5c5c",
    fontFamily: "Roboto",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#f6f6f6",
    position: "relative",
  },
  licenseLabel: {
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
    whiteSpace: "nowrap",
  },
  label: {
    fontSize: 15,
    fontWeight: 900,
    color: "#000000",
  },

  containerLabel: {
    position: "absolute",
    bottom: 40,
    left: "45%",
    transform: "translateX(-50%)",
    marginLeft: 15,
    width: "auto",
    overflow: "hidden",
    textAlign: "center",
    display: "flex",
    backgroundColor: "white",
    paddingLeft: "15px",
    justifyContent: "center",
    whiteSpace: "nowrap",
  },

  actionbutton: {
    paddingBottom: 10,
    justifyContent: "center",
    marginTop: "3px",
  },
  muiDialog:{
    "& paper":{
      margin: 1,
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
    // textTransform: "inherit"
    textTransform: "capitalize",
    padding: 0,
    height: 26,
  },
  buttonPrint: {
    textTransform: "capitalize",
    padding: 0,
    height: 28,
    width: "110px",
    marginLeft: "52px",
    marginTop: "6px",
    marginBottom: "1px",
  },
  hiddenPrint:{
    '@media print' :{
      display: 'none !important'
    }
  }
}));

export default function AlertDialog(props) {
  const classes = useStyles();
  const { open, setOpen, modalData, data } = props;
  const [printType, setPrintType] = useState("");

  const handlePrintType = (printType) => {
    setPrintType(printType);
    setTimeout(() => {
      const anchor = (document).querySelector(
        ".ticket"
      );
      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
   
    
  };
  const handleClose = (status = false) => {
    setOpen(status);
  };

  const handlePrint = () => {
    window.print();
  };
  return (
    <div>
      {modalData === "truck" && (
        <Dialog
          open={open}
          onClose={() => handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className={classes.title}>
            TRUCK LICENCE
          </DialogTitle>
          <DialogContent className={classes.content}>
            <img src={license} alt="container-popup" />
            <div className={classes.licenseLabel}>
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                className={classes.label}
              >
                {data}
              </InputLabel>
            </div>
          </DialogContent>
          <DialogActions className={classes.actionbutton}>
            <Button
              onClick={() => handleClose(false)}
              variant="contained"
              size="small"
              color="primary"
              autoFocus
              className={classes.button}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {modalData === "container" && (
        <Dialog
          open={open}
          onClose={() => handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className={classes.title}>
            CONTAINER NO.
          </DialogTitle>
          <DialogContent className={classes.content}>
            <img src={container} alt="container-popup" />
            <div className={classes.containerLabel}>
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                className={classes.label}
              >
                {data}
              </InputLabel>
            </div>
          </DialogContent>
          <DialogActions className={classes.actionbutton}>
            <Button
              onClick={() => handleClose(false)}
              variant="contained"
              size="small"
              color="primary"
              autoFocus
              className={classes.button}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {/* (
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
            {data}
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.actionbutton}>
            <Button onClick={handleClose}variant="contained"
                  size="small"  color="secondary" className={classes.button}>
              Cancel
            </Button>
            <Button onClick={handleClose} variant="contained"
                  size="small" color="primary" autoFocus className={classes.button}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
         ) */}
      {modalData === "filterPopup" && (
        <Dialog

          open={open}
          onClose={() => handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className={classes.title}>
            CONFIRMATION
          </DialogTitle>
          <DialogContent className={classes.content}>
            <DialogContentText id="alert-dialog-description">
              Damage Captured on <b>{data}</b> will be lost
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.actionbutton}>
            <Button
              onClick={() => handleClose(false)}
              variant="contained"
              size="small"
              color="secondary"
              className={classes.button}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleClose(true)}
              variant="contained"
              size="small"
              color="primary"
              autoFocus
              className={classes.button}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {(modalData === "newDamageAdd" || modalData === "gateOperation") && (
        <Dialog
          open={open}
          onClose={() => handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className={classes.title}>
            CONFIRMATION
          </DialogTitle>
          <DialogContent className={classes.content}>
            <DialogContentText id="alert-dialog-description"></DialogContentText>
            Damage Captured on <b>{data}</b> will be lost
          </DialogContent>
          <DialogActions className={classes.actionbutton}>
            <Button
              onClick={() => handleClose(false)}
              variant="contained"
              size="small"
              color="secondary"
              className={classes.button}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleClose(true)}
              variant="contained"
              size="small"
              color="primary"
              autoFocus
              className={classes.button}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {modalData === "print" && (
        <Dialog
          open={open}
          
          onClose={() => handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.muiDialog}
          fullScreen={(printType ==="locationSlip" || printType==="EIR")}
        >
          {printType === 'locationSlip' && <>
          <LocationSlip />
          </>}
          {printType === 'EIR' && <><EIRSlip /> </>}
          {printType !== '' && <>
          <DialogActions className={classes.actionbutton}>
                <Button
                  onClick={() => handleClose(false)}
                  variant="contained"
                  size="small"
                  color="secondary"
                  autoFocus
                  className={classes.button +' '+ classes.hiddenPrint}
                >
                  Close
                </Button>
                <Button
                  onClick={() => handlePrint()}
                  variant="contained"
                  size="small"
                  color="primary"
                  autoFocus
                  className={classes.button +' '+ classes.hiddenPrint}
                >
                  Print
                </Button>
              </DialogActions>
          </>}
          {printType === "" &&
           (
            <>
              <DialogTitle id="alert-dialog-title" className={classes.title}>
                Choose the Print Type
              </DialogTitle>
              <Divider />

              <Button
                onClick={(e) => handlePrintType("locationSlip")}
                variant="contained"
                size="small"
                color="primary"
                autoFocus
                className={classes.buttonPrint}
                // style={{width:"110px"}}
              >
                Location Slip
              </Button>
              <Button
                onClick={(e) => handlePrintType("EIR")}
                variant="contained"
                size="small"
                color="primary"
                autoFocus
                className={classes.buttonPrint}
                // style={{width:"110px"}}
              >
                EIR Slip
              </Button>

              <DialogActions className={classes.actionbutton}>
                <Button
                  onClick={() => handleClose(false)}
                  variant="contained"
                  size="small"
                  color="secondary"
                  autoFocus
                  className={classes.button}
                >
                  Close
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      )}
    </div>
  );
}
