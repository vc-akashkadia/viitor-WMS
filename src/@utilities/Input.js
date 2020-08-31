import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  // dense: {
  //   marginTop: theme.spacing(2)
  // },
  menu: {
    width: 200,
  },
}));
export default function InputField({ value, type, customClasses, ...props }) {
  const classes = useStyles();
  return (
    <TextField
      id="outlined-name"
      type={type}
      className={classes.textField + " input-paddingRemove " + customClasses}
      value={value}
      margin="normal"
      variant="outlined"
      {...props}
    />
  );
}
