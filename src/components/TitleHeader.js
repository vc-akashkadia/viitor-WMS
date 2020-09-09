import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
  },
  backIcon: {
    color: "#173a64",
  },
  backText: {
    color: "#173a64",
    fontSize: 15,
  },
  searchTitle: {
    fontSize: 15,
    color: "#173a64",
  },
  headerDiv: {
    width: "100%",
    textAlign: "center",
    // marginLeft: "5px",
  },
  headerDiv1: {
    width: "100%",
    // textAlign:'center'
    marginLeft: "5px",
  },
  mainbox: {
    width: "100%",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bolder",
  },
  menuIcon: {
    minWidth: "auto",
    paddingRight: 15,
  },
}));

const StyledMenu = withStyles({
  paper: {
    borderRadius: 0,
    boxShadow: "0px 3px 4px rgba(0,0,0,0.16)",
    width: "auto",
    "& ul": {
      padding: 0,
      "& li": {
        padding: "10px 15px",
      },
    },
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
    "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
      color: theme.palette.common.black,
    },
  },
}))(MenuItem);

export default function TitleHeader(props) {
  const { open, setOpen, title, backPath, isSearch } = props;
  const history = useHistory();
  const classes = useStyles();
  // const anchorRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleFilterOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            style={{ width: "100%" }}
          >
            <Box display="flex" className={classes.mainbox} alignItems="center">
              <IconButton
                aria-label="back"
                className={classes.backIcon}
                size="small"
                onClick={() => history.push(backPath)}
              >
                <ArrowBackIcon />
              </IconButton>

              <div
                className={
                  title && title.length <= 10
                    ? classes.headerDiv
                    : classes.headerDiv1
                }
              >
                <Typography
                  className={classes.backText + " " + classes.headerText}
                >
                  {title}
                </Typography>
              </div>
            </Box>
            {isSearch !== false && (
              <Box
                display="flex"
                alignItems="center"
                onClick={handleFilterOpen}
              >
                <IconButton
                  aria-label="back"
                  className={classes.backIcon}
                  size="small"
                  style={{ paddingRight: 0 }}
                >
                  {!open && <SearchIcon />}
                  {open && <CloseIcon />}
                </IconButton>
              </Box>
            )}
            <Box display="flex">
              <IconButton
                aria-haspopup="true"
                style={
                  isSearch === false ? { paddingRight: 7 } : { paddingRight: 0 }
                }
                onClick={handleClick}
                // ref={anchorRef}
              >
                <AccountCircle style={{color:"#173a64"}}/>
              </IconButton >
            </Box>
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              style={{marginLeft:"14px",marginTop:"0px"}}
              disableAutoFocusItem={true}
            >
              <StyledMenuItem
              >
                <ListItemIcon className={classes.menuIcon}>
                  <AccountBalanceIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="HYD-PTF" />
              </StyledMenuItem>
              
              <StyledMenuItem
              onClick={() => history.push("/logout")}
              >
                <ListItemIcon className={classes.menuIcon}>
                  <ExitToAppIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </StyledMenuItem>
            </StyledMenu>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
    </>
  );
}
