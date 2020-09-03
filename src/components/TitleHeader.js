import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
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
}));



export default function TitleHeader(props) {
    const {open,setOpen,title,backPath}=props
    const history =useHistory()
    const classes= useStyles()
    const handleFilterOpen =()=>{
        setOpen(!open)
      }
  return (
      <>
    <CssBaseline />
      <AppBar position="fixed" color="secondary">
        <Toolbar  >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            style={{ width: "100%" }}
          >
            <Box display="flex" alignItems="center">
              <IconButton
                aria-label="back"
                className={classes.backIcon}
                size="small"
                onClick={() => history.push(backPath)}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography className={classes.backText}>
                {/* Position Update */}
                {title}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" onClick={handleFilterOpen}>
              <IconButton
                aria-label="back"
                className={classes.backIcon}
                size="small"
                style={{ paddingRight: 10 }}
              >
                {!open && <SearchIcon />}
                {open && <CloseIcon />}
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      </>
  );
}
