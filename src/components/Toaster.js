import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default function Toaster(props) {
  const {open,handleClose,option,message} = props 
  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={() => handleClose(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => handleClose(false)}
          severity={option}
        >
          {message}
        </MuiAlert>
      </Snackbar>
      
    </>
  );
}
