import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
// import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import GroundingModal from "./../components/GroundingContainer";
import { getContainerListForLocationUpdate } from "../apicalls/ModuleAccessApiCalls";
import TitleHeader from "../components/TitleHeader";
import ScrollToTop from "../components/ScrollToTop";
import Modal from "../components/modal";
import Divider from "@material-ui/core/Divider";
import ContainerIcon from "@assests/img/container.svg";
// import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import RefreshIcon from '@material-ui/icons/Refresh';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
// import Modal from "../../components/modal"

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
  },
  yardTitle: {
    margin: "10px 10px",
    fontSize: 15,
    color: "#173a64",
  },
  yardCard: {
    padding: 5,
    marginBottom: 5,
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
    margin: "1px 1px",
    padding: 10,
    position: "fixed",
    backgroundColor: "#ffff",
    zIndex: "2",
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
  modal:{
    '&$MuiDialog':{
      '&$paper':{
        margin: 12
      }
    }
  }
}));

export default function YardOperation(props) {
  const classes = useStyles();
  const history = useHistory();
  const authToken = useSelector(({ auth }) => auth.authToken);
  const facility = useSelector(({ base }) => base.facility);
  const [open, setOpen] = useState(false);
  const [gModal, setGModal] = useState(false);
  const [openModal, setModal] = useState(false);
  const [data, setData] = useState();
  const [gType, setGType] = useState();
  // const handleFilterOpen =()=>{
  //   setOpen(!open)
  // }
  let containerList = useSelector(({ base }) => base.containerListForLocation);
  const dispatch = useDispatch();
  //   const [open, setOpen] = useState(false);
  const getContainerList = () => {
    if (containerList.length === 0) {
      dispatch(
        getContainerListForLocationUpdate(facility, authToken, handleCallBack)
      );
    }
  };
  useEffect(getContainerList, []);
  const handleCallBack = () => {};
  const handleGModal = () => {
    setGModal(true);
    setGType("position");
  };

  const handleOpenModal = () => {
    setModal(true);
    setData("1234");
  };

  return (
    <>
      <TitleHeader
        open={open}
        setOpen={setOpen}
        title={"Location Update"}
        backPath={"/operations"}
      />
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
      <div
        className={classes.yardMain}
        style={open ? { marginTop: "82px" } : { marginTop: "0px" }}
      >
         <div style={{position:'relative'}}>
        <Typography className={classes.yardTitle}>Work Order</Typography>
        <RefreshIcon fontSize="small" style={{position:'absolute',top: '-1px',right:'10px'}}  />
        </div>
        <Divider style={{ marginBottom: "7px" }} />
        <Card className={classes.yardCard} style={{ border: "1px solid #929eaa",marginLeft:"2px", marginRight:"2px" }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box className={classes.chipMain}>
              <div style={{ position: "relative" }}>
                <Chip
                  label="C1"
                  size="small"
                  style={{ width: "49px" }}
                  onClick={handleOpenModal}
                  
                />
                <img
                  src={ContainerIcon}
                  alt="container"
                  style={{
                    position: "absolute",
                    top: "-8px",
                    left: "3px",
                    width: 15,
                  }}
                ></img>
              </div>
              <div style={{ position: "relative" }}>
                <Chip label="LOC1234" style={{ width: "132px" }} />
                <LocationOnOutlinedIcon
                 style={{
                    position: "absolute",
                    top: "-10.5px",
                    left: "3px",
                    width: 18,
                  }}
                  color="action" 
                  />
                </div>
              <Button className={classes.confirmBtn} onClick={handleGModal}>
                <EditIcon fontSize="small" />
              </Button>
            </Box>
          </Box>
        </Card>
        <Card className={classes.yardCard} style={{ border: "1px solid #929eaa",marginLeft:"2px", marginRight:"2px" }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box className={classes.chipMain}>
              <div style={{ position: "relative" }}>
                <Chip
                  label="C1"
                  size="small"
                  style={{ width: "49px" }}
                  onClick={handleOpenModal}
                  
                />
                <img
                  src={ContainerIcon}
                  alt="container"
                  style={{
                    position: "absolute",
                    top: "-8px",
                    left: "3px",
                    width: 15,
                  }}
                ></img>
              </div>
              <div style={{ position: "relative" }}>
                <Chip label="LOC1234" style={{ width: "132px" }} />
                <LocationOnOutlinedIcon
                 style={{
                    position: "absolute",
                    top: "-10.5px",
                    left: "3px",
                    width: 18,
                  }}
                  color="action" 
                  />
                </div>
              <Button className={classes.confirmBtn} onClick={handleGModal}>
                <EditIcon fontSize="small" />
              </Button>
            </Box>
          </Box>
        </Card>
        <Card className={classes.yardCard} style={{ border: "1px solid #929eaa",marginLeft:"2px", marginRight:"2px" }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box className={classes.chipMain}>
              <div style={{ position: "relative" }}>
                <Chip
                  label="C1"
                  size="small"
                  style={{ width: "49px" }}
                  onClick={handleOpenModal}
                  
                />
                <img
                  src={ContainerIcon}
                  alt="container"
                  style={{
                    position: "absolute",
                    top: "-8px",
                    left: "3px",
                    width: 15,
                  }}
                ></img>
              </div>
              <div style={{ position: "relative" }}>
                <Chip label="LOC1234" style={{ width: "132px" }} />
                <LocationOnOutlinedIcon
                 style={{
                    position: "absolute",
                    top: "-10.5px",
                    left: "3px",
                    width: 18,
                  }}
                  color="action" 
                  />
                </div>
              <Button className={classes.confirmBtn} onClick={handleGModal}>
                <EditIcon fontSize="small" />
              </Button>
            </Box>
          </Box>
        </Card>

      </div>
      <ScrollToTop />
      {gModal && (
        <GroundingModal
          open={gModal}
          setOpen={setGModal}
          type={gType}
          api={"Location Api"}
          data={"LOC1234"}
        />
      )}
      {openModal && (
        <Modal
          open={openModal}
          setOpen={setModal}
          modalData={"container"}
          data={data}
        />
      )}
    </>
  );
}
