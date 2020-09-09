import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
  },
}));

export default function Loader() {
  const classes = useStyles();
  return (
    <div key="loader" className={classes.root}>
      <CircularProgress size={24} />
    </div>
  );
}
