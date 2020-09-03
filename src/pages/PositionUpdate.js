import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from '@material-ui/icons/Edit';
import GroundingModal from "./../components/GroundingContainer"
import { getContainerListForLocationUpdate } from "../apicalls/ModuleAccessApiCalls";
import TitleHeader from "../components/TitleHeader"
import ScrollToTop from "../components/ScrollToTop"

// import Modal from "../../components/modal"


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
  },
  yardTitle: {
    margin: "12px 10px",
    fontSize: 15,
    color: "#173a64",
  },
  yardCard: {
    padding: 12,
    marginBottom: 15,
    "&:last-child": {
      marginBottom: 0,
    },
  },
  chipMain: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "2px 1px",
    },
  },
  confirmBtn: {
    backgroundColor: "#40d759",
    minWidth: 37,
    height: 26,
    color: "#fff",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "20px",
    textTransform: "uppercase",
  },
  filterSearch: {
    margin: "12px 10px",
    padding: 10,
  },
 
  searchInput: {
    width: "100%",
  },
  input: {
    padding: "0px 5px",
  },
  searchBtn: {
    minWidth: "100%",
    textTransform: "capitalize",
    padding: 0,
    height: 26,
  },
}));



export default function YardOperation(props) {
  const classes = useStyles();
  const history = useHistory();
  const authToken = useSelector(({ auth }) => auth.authToken);
  const facility = useSelector(({ base }) => base.facility);
  const [open, setOpen] = useState(false);
  const [gModal, setGModal] = useState(false);
  const [gType, setGType] = useState();
  // const handleFilterOpen =()=>{
  //   setOpen(!open)
  // }
  let containerList = useSelector(({ base }) => base.containerListForLocation);
  const dispatch = useDispatch();
  //   const [open, setOpen] = useState(false);
  useEffect(() => {
    if (containerList.length === 0) {
      dispatch(
        getContainerListForLocationUpdate(facility, authToken, handleCallBack)
      );
    }
  }, []);
  const handleCallBack = () => {};
  const handleGModal =()=>{
    setGModal(true)
    setGType("position")
  }
  
  return (
    <>
    {/* <CssBaseline />
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
                onClick={() => history.push("/operations")}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography className={classes.backText}>
                Position Update
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
      <Toolbar id="back-to-top-anchor" /> */}
      <TitleHeader open={open} setOpen={setOpen} title={"Location Update"} backPath={"/operations"}/>
      {open && (
        <Card className={classes.filterSearch}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={6}>
              <Typography className={classes.searchTitle}>
                Search Here
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                className={classes.searchInput}
                id="outlined-basic"
                placeholder="Enter No."
                label=""
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                className={classes.searchBtn}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Card>
      )}
      <div className={classes.yardMain}>
        <Typography className={classes.yardTitle}>Work Order</Typography>
        <Card className={classes.yardCard}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box className={classes.chipMain}>
              <Chip label="C1" size="medium" style={{ width: 85 }} />
              <Chip label="LOC1234" size="medium" style={{ width:85 }} />
              <Button
                className={classes.confirmBtn}
                onClick={handleGModal}
              >
                <EditIcon fontSize="small"/>
              </Button>
            </Box>
          </Box>
        </Card>
        <Card className={classes.yardCard}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box className={classes.chipMain}>
              <Chip label="C1" size="medium" style={{ width: 85 }} />
              <Chip label="LOC1234" size="medium" style={{ width:85 }} />
              <Button
                className={classes.confirmBtn}
                onClick={handleGModal}
              >
                <EditIcon fontSize="small"/>
              </Button>
            </Box>
          </Box>
        </Card>
        <Card className={classes.yardCard}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box className={classes.chipMain}>
              <Chip label="C1" size="medium" style={{ width: 85 }} />
              <Chip label="LOC1234" size="medium" style={{ width:85 }} />
              <Button
                className={classes.confirmBtn}
                onClick={handleGModal}
              >
                <EditIcon fontSize="small"/>
              </Button>
            </Box>
          </Box>
        </Card>
        <Card className={classes.yardCard}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box className={classes.chipMain}>
              <Chip label="C1" size="medium" style={{ width: 85 }} />
              <Chip label="LOC1234" size="medium" style={{ width:85 }} />
              <Button
                className={classes.confirmBtn}
                onClick={handleGModal}
              >
                <EditIcon fontSize="small"/>
              </Button>
            </Box>
          </Box>
        </Card>
        <Card className={classes.yardCard}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box className={classes.chipMain}>
              <Chip label="C1" size="medium" style={{ width: 85 }} />
              <Chip label="LOC1234" size="medium" style={{ width:85 }} />
              <Button
                className={classes.confirmBtn}
                onClick={handleGModal}
              >
                <EditIcon fontSize="small"/>
              </Button>
            </Box>
          </Box>
        </Card>
        <Card className={classes.yardCard}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box className={classes.chipMain}>
              <Chip label="C1" size="medium" style={{ width: 85 }} />
              <Chip label="LOC1234" size="medium" style={{ width:85 }} />
              <Button
                className={classes.confirmBtn}
                onClick={handleGModal}
              >
                <EditIcon fontSize="small"/>
              </Button>
            </Box>
          </Box>
        </Card>
        <Card className={classes.yardCard}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box className={classes.chipMain}>
              <Chip label="C1" size="medium" style={{ width: 85 }} />
              <Chip label="LOC1234" size="medium" style={{ width:85 }} />
              <Button
                className={classes.confirmBtn}
                onClick={handleGModal}
              >
                <EditIcon fontSize="small"/>
              </Button>
            </Box>
          </Box>
        </Card>
        <Card className={classes.yardCard}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box className={classes.chipMain}>
              <Chip label="C1" size="medium" style={{ width: 85 }} />
              <Chip label="LOC1234" size="medium" style={{ width:85 }} />
              <Button
                className={classes.confirmBtn}
                onClick={handleGModal}
              >
                <EditIcon fontSize="small"/>
              </Button>
            </Box>
          </Box>
        </Card>
      </div>
     <ScrollToTop />
     {gModal &&( <GroundingModal open={gModal} setOpen={setGModal} type={gType} api={"Location Api"} data={"LOC1234"} />)}
    </>
  );
}
