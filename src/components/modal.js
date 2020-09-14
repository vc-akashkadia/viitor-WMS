import React from "react";
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
import RoomSharpIcon from '@material-ui/icons/RoomSharp';
import crane from "@assests/img/LocationContainer.svg";
import Divider from "@material-ui/core/Divider"
import useGlobalStyle from "@common-style"

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
    bottom: "13.5px",
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
    fontSize: 20,
    fontWeight: 900,
    color: "#000000",
  },

  containerLabel: {
    position: "absolute",
    bottom: 46,
    left: "45%",
    transform: "translate(-50%, 20px)",
    margin: '0 10px',
    width: "80%",
    height: '50%',
    overflow: "hidden",
    // textAlign: "center",
    display: "flex",
    backgroundColor: "white",
    // paddingLeft: "15px",
    padding:"0 5px",
    justifyContent: "center",
    alignItems: 'center'
    // whiteSpace: "nowrap",
  },

  LocationLabel:{
    position: "absolute",
    bottom: 45,
    left: "45%",
    transform: "translate(-50%, 20px)",
    margin: '0 10px',
    width: "70%",
    height: '53%',
    overflow: "hidden",
    display: "flex",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: 'center',
    // fontSize:20
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
}));

export default function AlertDialog(props) {
  const classes = {...useGlobalStyle(),...useStyles()};
  const { open, setOpen, modalData, data } = props;
  const handleClose = (status = false) => {
    setOpen(status);
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
          <Divider className={classes.dividerStyle} />
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
          <Divider className={classes.dividerStyle} />
          <DialogContent className={classes.content}>
            <img src={container} alt="container-popup" />
            <div className={classes.containerLabel}>
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                className={classes.label}
                style={{  transform: "translateX(0)",
                  display: "inline-block",
                  lineHeight: "24px"
                }}
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

      {modalData === "location" && (
        <Dialog
          open={open}
          onClose={() => handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className={classes.title}>
            LOCATION NO.
          </DialogTitle>
          <Divider className={classes.dividerStyle} />
          <DialogContent className={classes.content}>
            <img src={crane} alt="container-popup" />
            <RoomSharpIcon 
                  size="small"
                  color="action"
                  style={{
                    position: "absolute",
                    top: "-3px",
                    left: "90px",
                    width: 22,
                    color:"#5c5c5c",
                    // backgroundColor: "#ffffff",
                    // borderRadius: '50%'
                  }}
                />
            <div className={classes.LocationLabel}>
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                className={classes.label}
                style={{  transform: "translateX(0)",
                  display: "inline-block",
                  lineHeight: "24px"
                }}
              >
                {data ? data :"----"}
                {/* HYD-PFT-DRP-001 */}
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
      {(modalData === "filterPopup" || modalData === "refreshContainer" ) && (
        <Dialog

          open={open}
          onClose={() => handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className={classes.title}>
            CONFIRMATION
          </DialogTitle>
          <Divider className={classes.dividerStyle} />
          <DialogContent className={classes.content}>
            <DialogContentText id="alert-dialog-description">
              Damage Captured on <span style={{ color: "#000000" }}>{data}</span> will be lost
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
            <DialogContentText id="alert-dialog-description">
            Damage Captured on <span style={{ color: "#000000" }}>{data}</span> will be lost
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
      
    </div>
  );
}
