import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import brandLogo from "@assests/img/logo-new.svg";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import MenuIcon from '@material-ui/icons/Menu';
import menu from '@assests/img/menu.svg'

const useStyles = makeStyles((theme) => ({
  colorPrimary: {
    backgroundColor: "white",
  },
  regular: {
    minHeight: "40px",
  },
}));
export default function Header() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
  }
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <>
      <CssBaseline />
      <AppBar className={classes.colorPrimary}>
        <Toolbar>
          <Box display="flex" justifyContent="space-between" alignItems="center" style={{ width: '100%' }}>
            <IconButton aria-label="delete" className={classes.margin} size="small" >
            <img src={menu} alt="menu" />
            </IconButton>
            <Link to="/">
              <img
                src={brandLogo}
                alt="Logo"
                style={{
                  display: "block",
                }}
              />
            </Link>
            <IconButton
              aria-haspopup="true"
              onClick={handleToggle}
              ref={anchorRef}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Toolbar>
      </AppBar>
    </>
  );
}
