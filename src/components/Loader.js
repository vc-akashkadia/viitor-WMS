import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "20px",
  },
  backDrop: {
    zIndex: 9999,
    color: "#fff",
    opacity: "0.5 !important",
  },
}));

export default function Loader() {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backDrop} open={true}>
      <div key="loader" className={classes.root}>
        <CircularProgress size={24} color="inherit" />
      </div>
    </Backdrop>
  );
}
