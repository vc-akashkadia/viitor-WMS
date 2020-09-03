import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import DamageModal from "../../components/DamageModal";
import Modal from "../../components/modal";
import { useHistory } from "react-router-dom";
// import CircularProgress from "@material-ui/core/CircularProgress";
import {
  getContainerListApi,
  GateMoveContainerApi,
} from "../../apicalls/GateApiCalls";
import CradGrid from '../../components/Card'
import TitleHeader from "../../components/TitleHeader"
import ScrollToTop from "../../components/ScrollToTop"
import Loader from "../../components/Loader"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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
    fontSize: 16,
    padding: "0px 26px 0px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    width: "100%",
    height: 28,
    display: "flex",
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

const useStyles = makeStyles({
  backIcon: {
    color: "#173a64",
  },
  backText: {
    color: "#173a64",
    fontSize: 15,
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
  damageCode: {
    backgroundColor: "#efefef",
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
    marginLeft: "5px",
  },
  rightBoxArrow: {
    backgroundColor: "#2991d6",
    minWidth: 28,
    height: 61,
    padding: 0,
  },
  filterSearch: {
    margin: "12px 10px",
    padding: 10,
    position: 'fixed'
  },
  searchTitle: {
    fontSize: 15,
    color: "#173a64",
  },
  searchInput: {
    width: "100%",
  },
  searchBtn: {
    minWidth: "100%",
    textTransform: "capitalize",
    padding: 0,
    height: 26,
  },
});
let toasterOption = {
  varient : 'success',
  message : ''
}
export default function GateMovePage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [toaster, setToaster] = useState(false);
  const [modalData, setModalData] = useState();
  const [dataModal, setDataModal] = useState("");
  const [openModal, setOpenMdal] = useState(false);
  const [openConfirmGateOperation, setopenConfirmGateOperation] = useState(false);
  const [openDamageModal, setOpenDamageModal] = useState(false);
  const [selectContainer, setSelectContainer] = useState({});
  const [gatetype, setGateType] = useState("Both");
  const [vehical, setVehical] = useState("Criteria");
  const [number, setNumber] = useState("");
  const dispatch = useDispatch();
  const authToken = useSelector(({ auth }) => auth.authToken);
  const facility = useSelector(({ base }) => base.facility);
  const gateMoveContainerList = useSelector(
    ({ base }) => base.gateMoveContainerList
  );
  const handleFilterOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    getContainerList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gatetype]);

  const getContainerList = () => {
    if (vehical !== "" && vehical !== "Criteria" && number === "") {
      alert("Please enter Truck or Container No.");
      return;
    }
    // operationtype: `Gate_${props.gateType}_${gatetype}`.toUpperCase(),
    let data = {
      vehical: vehical,
      number: number,
      facilityid: facility,
      operationtype : `Gate_${props.gateType}_INBOUND`.toUpperCase()
    };
    // if(gatetype !== 'Both'){
      //data.operationtype = `Gate_${props.gateType}_${gatetype}`.toUpperCase();
    // }
    //setLoading(true);
    //dispatch(getContainerListApi(data, authToken, handleCallback));
  };
  const handleSearch = () => {
    getContainerList();
  };
  const handleCallback = (response) => {
    setTimeout(() => {
      setLoading(false);
      
    }, 1000);
  };

  const handleCallbackGateOperation = (response) => {
    const {data : {status}} = response
    if(status){
      toasterOption = {
        varient : 'success',
        message : 'Gate Operation Successfully'
    }
    setToaster(true)
      setTimeout(() => {
        setLoading(false);
        getContainerList();
      }, 1000);
    }else{
      toasterOption = {
        varient : 'error',
        message : 'Something went wrong try after sometime'
    }
    setToaster(true)
      setTimeout(() => {
        setLoading(false);
        
      }, 1000);
    }
    
  }
  const handleGateMove = (item) => {
    let data = {
      container_number: item.containerNumber,
      truck_number: item.truckNumber,
      operation_type: `Gate_${props.gateType}_${gatetype}`.toUpperCase(),
      containter_status: item.containerStatus,
      facility_id: facility,
      damage: item.damage !== undefined ? item.damage : "",
      shipment_id: item.shipmentId
    };
    setLoading(true);
    dispatch(GateMoveContainerApi(data, authToken, handleCallbackGateOperation));
  };

  const handleOpenModal = (title, data) => {
    setOpenMdal(true);
    setModalData(title);
    setDataModal(data);
  };
  const handleOpenDamageModal = (item) => {
    setSelectContainer(item);
    setOpenDamageModal(true);
  };
  const handleDamage = (damageCode) => {
    let containerIndex = gateMoveContainerList.findIndex(
      (item) => item.containerId === selectContainer.containerId
    );
    gateMoveContainerList[containerIndex].damage = damageCode;
    setSelectContainer({});
    setOpenDamageModal(false);
  };

  const handleOpenModalGate = (container) => {
    setSelectContainer(container);
    setopenConfirmGateOperation(true)
  }

  const handleCloseGateModal = (status) => {
    if(status){
      handleGateMove(selectContainer)
    }
    setSelectContainer({});
    setopenConfirmGateOperation(false)
  }
  return (
    <>
      
      <TitleHeader open={open} setOpen={setOpen} title={`Gate ${props.gateType}`} backPath={"/operations"}/>
      {open && (
        <Card className={classes.filterSearch}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12}>
              <Typography className={classes.searchTitle}>
                Search Here
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={gatetype}
                  onChange={(e) => setGateType(e.target.value)}
                  input={<BootstrapInput />}
                  placeholder="Select Yard Crane"
                  style={{ width: "100%" }}
                >
                  <MenuItem value={"Both"}>Both</MenuItem>
                  <MenuItem value={"INBOUND"}>In Bound</MenuItem>
                  <MenuItem value={"OUTBOUND"}>Out Bound</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={vehical}
                  onChange={(e) => {
                    setVehical(e.target.value);
                    if (e.target.value === "Criteria") {
                      setNumber("");
                    }
                  }}
                  input={<BootstrapInput />}
                  placeholder="Select Yard Crane"
                  style={{ width: "100%" }}
                >
                  <MenuItem value="Criteria">
                    Criteria
                  </MenuItem>
                  <MenuItem value={"truck"}>Truck</MenuItem>
                  <MenuItem value={"container"}>Container</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <TextField
                className={classes.searchInput}
                id="outlined-basic"
                placeholder="Enter No."
                label=""
                variant="outlined"
                value={number}
                onInput={(e) => setNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                className={classes.searchBtn}
                onClick={handleSearch}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Card>
      )}
      <div className={classes.yardMain}>
        <Typography className={classes.yardTitle}>Work Order</Typography>
        {loading && <Loader />}
        {!loading &&
          gateMoveContainerList &&
          gateMoveContainerList.length === 0 && (
            <Typography className={classes.yardTitle}>
              No record Found
            </Typography>
          )}
        {!loading &&
          gateMoveContainerList &&
          gateMoveContainerList.length > 0 &&
          gateMoveContainerList.map((item, key) => (
            <CradGrid key={key} index={key} item={item} handleOpenModal={handleOpenModal}handleOpenDamageModal={handleOpenDamageModal}>
              <Box>
                {item.operationCode === "GATE_IN_INBOUND" ||
                item.operationCode === "GATE_OUT_INBOUND" ? (
                  <Button
                    className={classes.rightBoxArrow}
                    onClick={() => handleGateMove(item)}
                  >
                    <ArrowDownwardIcon color="secondary" />
                  </Button>
                ) : (
                  <Button
                    className={classes.rightBoxArrow}
                    onClick={() => handleOpenModalGate(item)}
                  >
                    <ArrowUpwardIcon color="secondary" />
                  </Button>
                )}
              </Box>
            </CradGrid>
            
          ))}
      </div>
      {openDamageModal && (
        <DamageModal
          container={selectContainer}
          open={openDamageModal}
          setOpen={setOpenDamageModal}
          addDamage={handleDamage}
        />
      )}
      {openModal && (
        <Modal
          open={openModal}
          setOpen={setOpenMdal}
          modalData={modalData}
          data={dataModal}
        />
      )}
      {
        openConfirmGateOperation && (
          (
            <Dialog
            open={openConfirmGateOperation}
            onClose={() => handleCloseGateModal(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" className={classes.title}>CONFIRMATION</DialogTitle>
            <DialogContent className={classes.content}>
              <DialogContentText id="alert-dialog-description"  >
              Are you sure you want to confirm Work Order For Container : <br />
              {selectContainer.containerNumber}
              </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.actionbutton}>
              <Button onClick={() => handleCloseGateModal(false)}variant="contained"
                    size="small"  color="secondary" className={classes.button}>
                Cancel
              </Button>
              <Button onClick={() => handleCloseGateModal(true)} variant="contained"
                    size="small" color="primary" autoFocus className={classes.button}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
           )
        )
      }
      <ScrollToTop />
      <Snackbar open={toaster} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={6000} onClose={() => setToaster(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setToaster(false)} severity={toasterOption.varient}>
          {toasterOption.message}
        </MuiAlert>
      </Snackbar>
      <ScrollToTop />
    </>
  );
}
