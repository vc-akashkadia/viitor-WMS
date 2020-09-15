import React from "react";
import Zoom from "@material-ui/core/Zoom";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
const useStyles = makeStyles((theme) => ({
    root: {
        // position:"fixed",
        // bottom: theme.spacing(2),
        // right: theme.spacing(2),
        position:"fixed",
          bottom: 0,
          // left: 100,
          display: "flex",
          justifyContent: "center",
          width: "100%"
      },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 50,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function scrollToTop(props) {
  return (
    <ScrollTop {...props}>
      <Fab color="secondary" size="small" aria-label="scroll back to top" style={{width: 40, height: 20,borderRadius:'inherit', border: '3px solid #a5a4a4',minHeight:"inherit"}}>
        <KeyboardArrowUpIcon fontSize="small"/>
      </Fab>
    </ScrollTop>
  );
}
