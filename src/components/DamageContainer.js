import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Table from "./Table"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title:{
        color: "#0c79c1",
        textTransform: "uppercase",
        paddingTop: 12,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 0,
        margin: "auto"
    },
    content:{
      fontFamily: "Roboto",
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: "#f6f6f6",
      paddingBottom: 0
    },
    innerContent:{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 10,
      color: "#707070"
    },
    content2:{
      fontFamily: "Roboto",
      paddingLeft: 10,
      paddingRight: 10,
      fontWeight: 400
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
    },
    notchedOutline: {
      borderColor: "#f6f6f6 !important"
    }
  }));

export default function AlertDialog(props) {

  const { open, setOpen } = props;
  const classes = useStyles();
  //   const [open, setOpen] = React.useState(open);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    setOpen(false);
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
        {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}

        <DialogContent className={classes.content}>
          <DialogContentText>Truck Number : DXB-1234</DialogContentText>
          <DialogContentText>Container: C1</DialogContentText>
        </DialogContent>
          <Table />
        <DialogActions  className={classes.actionbutton}>
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
