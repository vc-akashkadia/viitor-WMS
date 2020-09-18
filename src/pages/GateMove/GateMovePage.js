import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LocalPrintshopOutlinedIcon from "@material-ui/icons/LocalPrintshopOutlined";
import FormControl from "@material-ui/core/FormControl";

import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";

import Modal from "../../components/modal";
import PrintModal from "../../components/PrintModal";

import DamageModal from "../../components/DamageCapture";

import {
  getContainerListApi,
  gateMoveContainerApi,
  getRefreshContainer,
} from "../../apicalls/GateApiCalls";
import CradGrid from "../../components/Card";
import TitleHeader from "../../components/TitleHeader";
import ScrollToTop from "../../components/ScrollToTop";
import Loader from "../../components/Loader";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import GateInIcon from "@assests/img/gate-in1.svg";
import GateOutIcon from "@assests/img/gate-out1.svg";
import Select from "../../components/Select";
import RefreshIcon from "@material-ui/icons/Refresh";
import Toaster from "../../components/Toaster";
import Divider from "@material-ui/core/Divider";
import useGlobalStyle from "@common-style";
import { constants } from "@config/constant";
import clsx from "clsx";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 3,
    position: "relative",
    backgroundColor: "#f6f6f6",
    border: "1px solid #ced4da",
    fontSize: 14,
    padding: "0px 26px 0px 7px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    width: "100%",
    height: 26,
    color: "#1f1f21",
    alignItems: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "inline-block",
    lineHeight: "28px",
    fontFamily: ["Roboto"].join(","),
    "&:focus": {
      borderRadius: 3,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles(theme=>({
  backIcon: {
    color: "#173a64",
  },
  backText: {
    color: "#173a64",
    fontSize: 15,
  },
  yardNoData: {
    width: "100%",
    marginTop: "93px",
    paddingLeft: 70,
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
    minWidth: 26,
    height: 61,
    padding: 0,
  },
  scroobar:{
    ...theme.layout.scrollbarStyles,
    height: theme.layout.mainDivHeight
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
  searchBtn: {
    minWidth: "100%",
    textTransform: "capitalize",
    padding: 0,
    height: 26,
  },
  title: {
    fontSize: 16,
    color: "#0c79c1",
    fontWeight: 900,
    fontFamily: "Roboto",
    textTransform: "uppercase",
    padding: "5px 10px",
    margin: "auto",
  },
  content: {
    color: "#5c5c5c",
    fontFamily: "Roboto",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#f6f6f6",
    position: "relative",
  },
  licenseLabel: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    marginLeft: 40,
    width: "auto",
    overflow: "hidden",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    whiteSpace: "nowrap",
  },
  label: {
    fontSize: 15,
    fontWeight: 900,
    color: "#000000",
  },

  containerLabel: {
    position: "absolute",
    bottom: 40,
    left: "45%",
    transform: "translateX(-50%)",
    marginLeft: 15,
    width: "auto",
    overflow: "hidden",
    textAlign: "center",
    display: "flex",
    backgroundColor: "white",
    paddingLeft: "15px",
    justifyContent: "center",
    whiteSpace: "nowrap",
  },

  actionbutton: {
    paddingBottom: 15,
    justifyContent: "center",
  },
  filterOpen: {
    marginTop: "130px",
    "@media (min-width:600px)": {
      marginTop: 75,
    },
  },
  button: {
    textTransform: "capitalize",
    padding: 0,
    height: 26,
  },
}));
let toasterOption = {
  varient: "success",
  message: "",
};

const gateTypeOptions = constants.gateTypes;

const vehicalOption = constants.vehicle;

export default function GateMovePage(props) {
  const classes = { ...useGlobalStyle(), ...useStyles() };
  const scrollRef = React.createRef()

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [toaster, setToaster] = useState(false);
  const [containerIndex, setContainerIndex] = useState();
  const [damageAdded, setDamage] = useState(false);
  const [filterPopup, setFilterPopup] = useState(false);

  const [modalData, setModalData] = useState();
  const [damagedContainer, setDamagedContainer] = useState();
  const [dataModal, setDataModal] = useState("");
  const [openModal, setOpenMdal] = useState(false);
  const [openConfirmGateOperation, setopenConfirmGateOperation] = useState(
    false
  );
  const [openDamageModal, setOpenDamageModal] = useState(false);
  const [openPrintModal, setOpenPrintModal] = useState(false);
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

  useEffect(() => {
    if (damageAdded) {
      setModalData("filterPopup");
      setFilterPopup(true);
      setDataModal(damagedContainer);
      return;
    }
    getContainerList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gatetype]);

  const getContainerList = () => {
    if (vehical !== "" && vehical !== "Criteria" && number === "") {
      alert(constants.vehicleNumber.error);
      return;
    }
    if (vehical !== "" && vehical !== "Criteria" && number.length < 4) {
      alert(constants.vehicleNumber.minError);
      return;
    }

    let data = {
      vehical: vehical,
      number: number,
      facility_id: facility,
      gate_type: `GATE_${props.gateType}`.toUpperCase(),
    };
    if (gatetype === "Both") {
      data.operationtype = `Gate_${props.gateType}`.toUpperCase();
    } else {
      data.operationtype = `Gate_${props.gateType}_${gatetype}`.toUpperCase();
    }
    setLoading(true);
    dispatch(getContainerListApi(data, authToken, handleCallback));
  };
  const handleSearch = () => {
    if (damageAdded) {
      setModalData("filterPopup");
      setFilterPopup(true);
      setDataModal(damagedContainer);
      return;
    }
    setOpen(false);
    getContainerList();
  };
  const handleCallback = (response) => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleCallbackGateOperation = (response) => {
    const {
      data: { status },
    } = response;
    if (status) {
      toasterOption = {
        varient: "success",
        message:
          "Gate " +
          props.gateType.charAt(0).toUpperCase() +
          props.gateType.slice(1) +
          " Succesful",
      };
      setToaster(true);
      setTimeout(() => {
        setLoading(false);
        getContainerList();
      }, 1000);
    } else {
      toasterOption = {
        varient: "error",
        message: constants.apiError.error,
      };
      setToaster(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    setDamage(false);
  };
  const handleGateMove = (item) => {
    let data = {
      container_number: item.containerNumber,
      truck_number: item.truckNumber,
      operation_type: `Gate_${props.gateType}_${item.containerStatus}`.toUpperCase(),
      containter_status: item.containerStatus,
      facility_id: facility,
      damage: item.damage !== undefined ? item.damage : "",
      shipment_id: item.shipmentId,
    };
    setLoading(true);

    dispatch(
      gateMoveContainerApi(data, authToken, handleCallbackGateOperation)
    );
  };

  const handleOpenModal = (title, data) => {
    setOpenMdal(true);
    setModalData(title);
    setDataModal(data);
  };
  const handleOpenDamageModal = (item, index) => {
    setSelectContainer(item);
    if (damageAdded && index !== containerIndex) {
      setModalData("newDamageAdd");
      setDataModal(item.containerNumber);
      setFilterPopup(true);
      return;
    }
    setOpenDamageModal(true);
  };
  const handleFilterPopup = (status) => {
    if (status) {
      setDamage(false);
      if (modalData === "newDamageAdd") {
        gateMoveContainerList.map(function (item) {
          delete item.damage;
          return item;
        });
        setDamagedContainer("");
        setOpenDamageModal(true);
      } else if (modalData === "gateOperation") {
        setopenConfirmGateOperation(true);
      } else {
        getContainerList();
      }
    }
    setFilterPopup(false);
  };
  const handleDamage = (damageCode) => {
    if (damageCode !== "") {
      setDamage(true);
      let containerIndexDamage = gateMoveContainerList.findIndex(
        (item) => item.containerId === selectContainer.containerId
      );
      gateMoveContainerList[containerIndexDamage].damage = damageCode;
      setDamagedContainer(
        gateMoveContainerList[containerIndexDamage].containerNumber
      );
      setContainerIndex(containerIndexDamage);
    }
    setOpenDamageModal(false);
  };

  const handleOpenModalGate = (container, index) => {
    setSelectContainer(container);

    if (damageAdded && index !== containerIndex) {
      setModalData("gateOperation");
      setFilterPopup(true);
      setDataModal(damagedContainer);
    } else {
      setopenConfirmGateOperation(true);
    }
  };

  const handleCloseGateModal = (status) => {
    if (status) {
      handleGateMove(selectContainer);
    }
    setSelectContainer({});
    setopenConfirmGateOperation(false);
  };

  const handleOpenPrint = (container, index) => {
    setSelectContainer(container);
    setOpenPrintModal(true);
    setModalData("print");
  };
  const handleRefresh = () => {
    if (damageAdded) {
      setModalData("refreshContainer");
      setFilterPopup(true);
      setDataModal(damagedContainer);
      return;
    }
    setLoading(true);
    let data = {
      facility_id: facility,
    };
    dispatch(getRefreshContainer(data, authToken, handleCallbackRefresh));
  };
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
  };

  const handleClosePrintModal = (status) => {
    setOpenPrintModal(false);
    if (status) {
      getContainerList();
    }
  };
  return (
    <div className={classes.scroobar} ref={scrollRef}>
      <TitleHeader
        open={open}
        setOpen={setOpen}
        title={`Gate ${props.gateType}`}
        backPath={"/operations"}
      />
      {open && (
        <div className={classes.filterSearch}>
          <Card className={classes.filterPadding}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12}>
                <Typography className={classes.searchTitle}>
                  Search Here
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Select
                    selectedValue={gatetype}
                    handleChange={setGateType}
                    options={gateTypeOptions}
                    placeholder={constants.formPlaceHolder.gateType}
                    inputStyle={<BootstrapInput />}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Select
                    selectedValue={vehical}
                    handleChange={(value) => {
                      setVehical(value);
                      if (value === "Criteria") {
                        setNumber("");
                        handleSearch();
                      }
                    }}
                    options={vehicalOption}
                    placeholder={constants.formPlaceHolder.vehical}
                    inputStyle={<BootstrapInput />}
                  />
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
        </div>
      )}
      <div
        className={clsx({
          [classes.filterOpen]: open, //only when open === true
        })}
      >
        <div style={{ position: "relative" }}>
          <Typography className={classes.yardTitle}>Work Order</Typography>
          <RefreshIcon
            onClick={handleRefresh}
            fontSize="small"
            className={classes.refreshStyle}
          />
        </div>
        <Divider style={{ marginBottom: "7px" }} />

        {loading && <Loader />}
        {!loading &&
          gateMoveContainerList &&
          gateMoveContainerList.length === 0 && (
            <Typography className={classes.yardNoData}>
              No Data Found
            </Typography>
          )}
        {!loading &&
          gateMoveContainerList &&
          gateMoveContainerList.length > 0 &&
          gateMoveContainerList.map((item, key) => (
            <CradGrid
              key={key}
              index={key}
              item={item}
              handleOpenModal={handleOpenModal}
              handleOpenDamageModal={handleOpenDamageModal}
              cardFor="gateOperation"
            >
              {!item.gateOperationCompleted ? (
                <Box style={{ marginLeft: "3px" }}>
                  {item.operationCode === "GATE_IN_INBOUND" ||
                  item.operationCode === "GATE_IN_OUTBOUND" ? (
                    <Button
                      className={classes.rightBoxArrow}
                      onClick={() => handleOpenModalGate(item, key)}
                    >
                      <img
                        src={GateInIcon}
                        alt="Gate In"
                        style={{ paddingLeft: "5px" }}
                      />
                    </Button>
                  ) : (
                    <Button
                      className={classes.rightBoxArrow}
                      onClick={() => handleOpenModalGate(item, key)}
                    >
                      <img
                        src={GateOutIcon}
                        alt="Gate Out"
                        style={{ paddingLeft: "5px" }}
                      />
                    </Button>
                  )}
                </Box>
              ) : (
                <Box style={{ marginLeft: "3px" }}>
                  <Button
                    className={classes.rightBoxArrow}
                    onClick={() => handleOpenPrint(item, key)}
                  >
                    <LocalPrintshopOutlinedIcon color="secondary" />
                  </Button>
                </Box>
              )}
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
      {filterPopup && (
        <Modal
          open={filterPopup}
          setOpen={handleFilterPopup}
          modalData={modalData}
          data={dataModal}
        />
      )}
      {openPrintModal && (
        <PrintModal
          open={openPrintModal}
          setOpen={handleClosePrintModal}
          modalData={modalData}
          data={dataModal}
          container={selectContainer}
          gateType={props.gateType}
          // handleAction={handlePrintData}
        />
      )}
      {openConfirmGateOperation && (
        <Dialog
          open={openConfirmGateOperation}
          onClose={() => handleCloseGateModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className={classes.title}>
            CONFIRMATION
          </DialogTitle>
          <Divider className={classes.dividerStyle} />
          <DialogContent className={classes.content}>
            <DialogContentText id="alert-dialog-description">
              Do you want to confirm Gate{" "}
              {props.gateType.charAt(0).toUpperCase() + props.gateType.slice(1)}{" "}
              for{" "}
              <span style={{ color: "#000000" }}>
                {selectContainer.containerNumber}
              </span>
              ?
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.actionbutton}>
            <Button
              onClick={() => handleCloseGateModal(false)}
              variant="contained"
              size="small"
              color="secondary"
              className={classes.button}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleCloseGateModal(true)}
              variant="contained"
              size="small"
              color="primary"
              autoFocus
              className={classes.button}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <ScrollToTop refClass={scrollRef} />
      <Toaster
        open={toaster}
        handleClose={setToaster}
        option={toasterOption.varient}
        message={toasterOption.message}
      />
    </div>
  );
}
