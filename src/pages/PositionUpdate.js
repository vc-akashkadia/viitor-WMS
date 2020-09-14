import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles,withStyles } from "@material-ui/core/styles";
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
import {
  getBlockListApiCall,
} from "../apicalls/YardApiCalls";
import {
  getRefreshContainer,
} from "../apicalls/GateApiCalls";
import TitleHeader from "../components/TitleHeader";
import ScrollToTop from "../components/ScrollToTop";
import Modal from "../components/modal";
import Divider from "@material-ui/core/Divider";
import ContainerIcon from "@assests/img/container.svg";
// import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import RefreshIcon from '@material-ui/icons/Refresh';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Loader from "../components/Loader";
import Select from "../components/Select";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import useGlobalStyle from "@common-style"
import {constants} from '@config/constant'
// import Modal from "../../components/modal"
const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#f6f6f6",
    border: "1px solid #ced4da",
    fontSize: 14,
    padding: "0px 26px 0px 7px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    width: "100%",
    height: 26,
    // display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "inline-block",
    lineHeight: "28px",
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Roboto"].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
  },
  // yardTitle: {
  //   margin: "15px 10px 10px 10px",
  //   fontSize: 15,
  //   color: "#5c5c5c",
  // },
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
    height: 25,
    color: "#fff",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "20px",
    textTransform: "uppercase",
  },
  // filterSearch: {
  //   margin: "1px 1px",
  //   padding: 10,
  //   position: "fixed",
  //   backgroundColor: "#ffff",
  //   zIndex: "2",
  // },
  // searchTitle: {
  //   fontSize: 15,
  //   color: "#5c5c5c",
  // },

  searchInput: {
    width: "100%",
  },
  input: {
    padding: "0px 5px",
  },
  yardNoData: {
    width: "100%",
    marginTop: "93px",
    paddingLeft: 70,
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
const blockConst = [{ value: "Block", label: "Block" }];
export default function PositionUpdate(props) {
  const classes = {...useGlobalStyle(),...useStyles()};
  const history = useHistory();
  const authToken = useSelector(({ auth }) => auth.authToken);
  const facility = useSelector(({ base }) => base.facility);
  const [block, setBlock] = useState("Block");
  const [open, setOpen] = useState(false);
  const [gModal, setGModal] = useState(false);
  const [openModal, setModal] = useState(false);
  const [data, setData] = useState();
  const [gType, setGType] = useState();
  const [containerNumber, setContainerNumber] = useState('');
  const [selectedContainer, setSelectedContainer] = useState('');
  const [loading, setLoading] = useState(false);
  const blockList = useSelector(({ base }) => base.blockList);
  const [modalData,setModalData]=useState()
  // const handleFilterOpen =()=>{
  //   setOpen(!open)
  // }
  let containerList = useSelector(({ base }) => base.containerListForLocation);
  const dispatch = useDispatch();
  //   const [open, setOpen] = useState(false);
  const getContainerList = () => {
      setOpen(false);
      setLoading(true)
      let data ={
        containerNumber:containerNumber,
        facility:facility
      }
      if (block !== "Block") {
        data.blockNumber = block;
      }
      dispatch(
        getContainerListForLocationUpdate(data, authToken, handleCallBack)
      );
    
  };
  useEffect(getContainerList, []);
  useEffect(() => {
    if (blockList.length === 0) {
      dispatch(getBlockListApiCall(facility, authToken, handleCallbackBlock));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockList]);

  const handleCallbackBlock = () => {};

  const handleCallBack = (response) => {
    setLoading(false)
  };
  const handleGModal = (container) => {
    setGModal(true);
    setGType("location");
    setSelectedContainer(container)
  };

  const handleOpenModal = (type,item) => {
    setModal(true);
    if(type==="container"){
      setData(item.containerNumber);
      setModalData("container")
    }else{
      setData(item.location)
      setModalData("location")
    }
  };

  const handleModalClose = (status) => {
    setGModal(false);
    if(status){
      getContainerList()
    }
  };

  const handleRefresh = ()=>{
    setLoading(true);
    let data = {
      facilityid: facility,
      // operationtype : `Gate_${props.gateType}`.toUpperCase()
    };
    dispatch(getRefreshContainer(data, authToken, handleCallbackRefresh));
    
  }
  const handleCallbackRefresh = (response) => {
    const {
      data: { status },
    } = response;
    if (status) {
      getContainerList();
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    
  }

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
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Select
                  selectedValue={block === "" ? "Block" : block}
                  handleChange={setBlock}
                  options={[...blockConst, ...blockList]}
                  placeholder={constants.formPlaceHolder.block}
                  inputStyle={<BootstrapInput />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <TextField
                className={classes.searchInput}
                id="outlined-basic"
                placeholder="Enter Container No."
                label=""
                variant="outlined"
                value={containerNumber}
                onChange={(e) => setContainerNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                className={classes.searchBtn}
                onClick={() => getContainerList()}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Card>
      )}
      <div
        className={classes.yardMain}
        style={open ? { marginTop: "105px" } : { marginTop: "0px" }}
      >
        <div style={{position:'relative'}}>
        <Typography className={classes.yardTitle}>Work Order</Typography>
        <RefreshIcon onClick={()=> handleRefresh()} fontSize="small" className={classes.refreshStyle} />
        </div>
        <Divider style={{ marginBottom: "7px" }} />
        {loading && <Loader />}
        {!loading && containerList && containerList.length === 0 && (
          <Typography className={classes.yardNoData}>No Data Found</Typography>
        )}
        {!loading && containerList && containerList.length > 0 && containerList.map((container,index) => (
          <Card key={index} className={classes.yardCard} style={{ border: "1px solid #929eaa",margin:"3px" }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box className={classes.chipMain}>
              <div style={{ position: "relative" }}>
                <Chip
                  label={(container.containerNumber !== null) ? container.containerNumber.substring(
                    container.containerNumber.length - 4
                  ) : ''}
                  // size="small"
                  style={{ width: "59px" ,color:  "#000000" }}
                  onClick={() => handleOpenModal("container",container)}
                  
                />
                <img
                  src={ContainerIcon}
                  alt="container"
                  style={{
                    position: "absolute",
                    top: "-5.5px",
                    left: "3px",
                    width: 13,
                  }}
                ></img>
              </div>
              <div style={{ position: "relative" }}>
                <Chip label={container.location} style={{ width: "120px",color: "#000000"  }} onClick={() => handleOpenModal("location",container)}/>
                <LocationOnOutlinedIcon
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "0px",
                    width: 13,
                    color:"#0000004d"
                    // backgroundColor: "#ffffff"
                  }}
                  />
                </div>
              <Button className={classes.confirmBtn} onClick={() => handleGModal(container)}>
                <EditIcon fontSize="small" />
              </Button>
            </Box>
          </Box>
        </Card>
        )) }
      </div>
      <ScrollToTop />
      {gModal && (
        <GroundingModal
          open={gModal}
          setOpen={handleModalClose}
          type={gType}
          api={"Location Api"}
          data={"LOC1234"}
          container={selectedContainer}
        />
      )}
      {openModal && (
        <Modal
          open={openModal}
          setOpen={setModal}
          // modalData={"container"}
          modalData={modalData}
          data={data}
        />
      )}
    </>
  );
}
