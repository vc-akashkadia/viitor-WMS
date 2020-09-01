import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

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
        fontSize: 14,
        color: "#5c5c5c",
        fontWeight: 400,
        fontFamily: "Roboto",
        paddingLeft: 0,
        paddingRight: 0,
        textAlign: "center"
    }
}));

export default function Popup() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open 
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="simple-dialog-title" className={classes.title}>Confirmation</DialogTitle>
            <List>
                <ListItem className={classes.content}>
                    <ListItemText >Are you sure want to confirm Work order?</ListItemText>
                </ListItem>
                <ListItem>
                    <Button variant="outlined" color="primary" >Back</Button>
                    <Button variant="outlined" color="primary" >Confirm</Button>
                </ListItem>
            </List>
        </Dialog>
      </div>
    );
  }

  
