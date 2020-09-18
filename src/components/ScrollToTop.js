import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: 0,
    // left: 100,
    // display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));
export default function ScrollToTop(props) {
  const classes = useStyles();
  const { refClass } = props;
  const [topValue, seTopValue] = useState();

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    refClass.current.addEventListener(
      "scroll",
      function (event) {
        seTopValue(this.scrollTop);
      },
      false
    );
    console.log("refClass", refClass);
  }, []);
  return (
    <div
      onClick={handleClick}
      role="presentation"
      className={classes.root}
      style={topValue > 50 ? { display: "flex" } : { display: "none" }}
    >
      <Fab
        color="secondary"
        size="small"
        aria-label="scroll back to top"
        style={{
          width: 40,
          height: 20,
          borderRadius: "inherit",
          border: "3px solid #a5a4a4",
          minHeight: "inherit",
        }}
      >
        <KeyboardArrowUpIcon fontSize="small" />
      </Fab>
    </div>
  );
}
