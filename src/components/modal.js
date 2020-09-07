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
<<<<<<< HEAD
<<<<<<< HEAD
  label :{
=======
  label:{
>>>>>>> 8e1dc19e601dcce6bc6483f5bfb916d2a6a8be6d
=======
  label: {
>>>>>>> 26e17d4cf6c65365214fa1c82c9efb0c19b77da8
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
<<<<<<< HEAD
<<<<<<< HEAD
    justifyContent: "center",
    whiteSpace: "nowrap",
    paddingLeft: 15,
    backgroundColor: "#ffffff"
  },
=======
    backgroundColor:"white",
    paddingLeft:"15px",
    justifyContent: "center",
    whiteSpace: "nowrap"
>>>>>>> 8e1dc19e601dcce6bc6483f5bfb916d2a6a8be6d

=======
    backgroundColor: "white",
    paddingLeft: "15px",
    justifyContent: "center",
    whiteSpace: "nowrap",
>>>>>>> 26e17d4cf6c65365214fa1c82c9efb0c19b77da8
  },

  actionbutton: {
    paddingBottom: 15,
    justifyContent: "center",
  },
  button:{
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
  }
}));

export default function AlertDialog(props) {
  const classes = useStyles();
  const { open, setOpen, modalData, data } = props;

  const handleClose = (status = false) => {
    setOpen(status);
  };

  return (
    <div>
<<<<<<< HEAD
<<<<<<< HEAD
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>CONFIRMATION</DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText id="alert-dialog-description"  >
          Are you sure you want to confirm Work Order?
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.actionbutton}>
          <Button onClick={handleClose}variant="contained"
                size="small"  color="secondary" className={classes.button}>
            Back
          </Button>
          <Button onClick={handleClose} variant="contained"
                size="small" color="primary" autoFocus className={classes.button}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog> */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>CONTAINER NO.</DialogTitle>
        <DialogContent className={classes.content}>
          <img src={container} alt="container-popup" />
          <div className={classes.containerLabel}>
          <InputLabel
                  shrink
                  htmlFor="bootstrap-input"
                  className={classes.label}
                >
                  1420 1100 1234
                </InputLabel>
          </div>
          
        </DialogContent>
        <DialogActions className={classes.actionbutton}>
          <Button onClick={handleClose}variant="contained"
                size="small"  color="secondary" className={classes.button}>
            Back
          </Button>
          <Button onClick={handleClose} variant="contained"
                size="small" color="primary" autoFocus className={classes.button}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
=======
      {modalData ==="truck" ?
        ( <Dialog
=======
      {modalData === "truck" && (
        <Dialog
>>>>>>> 26e17d4cf6c65365214fa1c82c9efb0c19b77da8
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
<<<<<<< HEAD
        </Dialog>) :(
         modalData ==="container" ?(
>>>>>>> 8e1dc19e601dcce6bc6483f5bfb916d2a6a8be6d

          <Dialog
=======
        </Dialog>
      )}
      {modalData === "container" && (
        <Dialog
>>>>>>> 26e17d4cf6c65365214fa1c82c9efb0c19b77da8
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
<<<<<<< HEAD
         )

<<<<<<< HEAD
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>TRUCK LICENCE</DialogTitle>
        <DialogContent className={classes.content}>
          <img src={license} alt="container-popup" />
          <div className={classes.licenseLabel}>
          <InputLabel
                  shrink
                  htmlFor="bootstrap-input"
                  className={classes.label}
                >
                  1420 1100 1234
                </InputLabel>
          </div>
        </DialogContent>
        <DialogActions className={classes.actionbutton}>
          <Button onClick={handleClose}variant="contained"
                size="small"  color="secondary" className={classes.button}>
            Back
          </Button>
          <Button onClick={handleClose} variant="contained"
                size="small" color="primary" autoFocus className={classes.button}>
            Ok
          </Button>
        </DialogActions>
      </Dialog> */}
=======
      )
      }
>>>>>>> 8e1dc19e601dcce6bc6483f5bfb916d2a6a8be6d
=======
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
            <DialogContentText id="alert-dialog-description">
            </DialogContentText>
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
>>>>>>> 26e17d4cf6c65365214fa1c82c9efb0c19b77da8
    </div>
  );
}
