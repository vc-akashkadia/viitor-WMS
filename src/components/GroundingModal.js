import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from "@material-ui/core/Typography"
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";

export default function AlertDialog(props) {
    const {open,setOpen} =props
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
        <DialogTitle id="alert-dialog-title">GROUNDING CONTAINER</DialogTitle>
        <DialogContent dividers>
            <Typography>Con. no. : 1420 1100 1234</Typography>
            <Typography>Status : Ground</Typography>
            <Typography>Location: LOC1020</Typography>
          
        </DialogContent>
        <DialogContent>
            <DialogContentText>What to Add to new location</DialogContentText>
            <TextField 
                  id="newLocation" 
                  label=""
                  variant="outlined"
                  placeholder="Enter New Location"
                  style={{width: '100%'}}
                  />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}variant="contained"
                size="small"  color="secondary">
            Back
          </Button>
          <Button onClick={handleClose} variant="contained"
                size="small" color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}