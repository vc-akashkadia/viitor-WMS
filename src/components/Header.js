import React, { useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link, useHistory } from "react-router-dom";
import { makeStyles, useTheme,withStyles } from "@material-ui/core/styles";
import brandLogo from "@assests/img/logo-new.svg";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import List from "@material-ui/core/List";
import PersonIcon from "@material-ui/icons/Person";
import Menu from "@material-ui/core/Menu";
const useStyles = makeStyles((theme) => ({
  colorPrimary: {
    backgroundColor: "white",
  },
  menuIcon: {
    minWidth: "auto",
    paddingRight: 15,
  },
  regular: {
    minHeight: "40px",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
    justifyContent: "space-between",
    minHeight: "auto"
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

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleDrawer = () => {
    setOpenDrawer(true);
    console.log("trurrr");
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleLogout = (event) => {
    history.push("/logout");
  };

  // const prevOpen = React.useRef(open);
  // React.useEffect(() => {
  //   if (prevOpen.current === true && open === false) {
  //     anchorRef.current.focus();
  //   }

  //   prevOpen.current = open;
  // }, [open]);
  return (
    <>
      <CssBaseline />
      <AppBar className={classes.colorPrimary}>
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            style={{ width: "100%" }}
          >
            <IconButton
              aria-label="delete"
              className={classes.margin}
              size="small"
              color="primary"
              onClick={handleDrawer}
            >
              <MenuIcon style={{color:"#120e5b"}}/>
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
            <IconButton aria-haspopup="true" onClick={handleClick}>
              <AccountCircle style={{color:"#120e5b"}}/>
            </IconButton>
          </Box>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            style={{ marginLeft: "14px", marginTop: "0px" }}
            disableAutoFocusItem={true}
          >
            <StyledMenuItem onClick={() => history.push("/logout")}>
              <ListItemIcon className={classes.menuIcon}>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </StyledMenuItem>
          </StyledMenu>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography style={{ textAlign: "center" }}>WMS</Typography>
          <IconButton onClick={handleDrawerClose} style={{paddingRight :0}}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List style={{padding: 0}}>
          {/* <ListItem button onClick={() => history.push("/user")}>
            <ListItemIcon>{<PersonIcon />}</ListItemIcon>
            <ListItemText primary={"User Access"} />
          </ListItem> */}
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>{<ExitToAppIcon />}</ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </>
  );
}
