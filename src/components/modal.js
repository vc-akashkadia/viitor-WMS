import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title:{
      fontSize: 16,
      color: "#0c79c1",
      fontWeight: 900,
      fontFamily: "Roboto",
      textTransform: "uppercase",
      paddingTop: 12,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
      margin: "auto"
  },
  content:{
      color: "#5c5c5c",
      fontFamily: "Roboto",
      paddingLeft: 0,
      paddingRight: 0,
      textAlign: "center"
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

export default function AlertDialog(props) {
  const classes = useStyles();
    const {open,setOpen} =props

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
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
      </Dialog>
    </div>
  );
}