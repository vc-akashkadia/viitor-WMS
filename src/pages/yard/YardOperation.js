import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import FormControl from "@material-ui/core/FormControl";

import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import Modal from "../../components/modal";
import PickUpModal from "./PickUpModal";
// import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Select from "../../components/Select";
import CardGrid from "../../components/Card";
import {
  getBlockListApiCall,
  getYardOperationApiCall,
} from "../../apicalls/YardApiCalls";
import TitleHeader from "../../components/TitleHeader";
import ScrollToTop from "../../components/ScrollToTop";
import Loader from "../../components/Loader";
import Divider from "@material-ui/core/Divider";
import GroundingModal from "../../components/GroundingContainer";
import RefreshIcon from '@material-ui/icons/Refresh';

let toasterOption = {
  varient: "success",
  message: "",
};

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
  backIcon: {
    color: "#173a64",
  },
  backText: {
    color: "#173a64",
    fontSize: 15,
  },
  yardTitle: {
    margin: "10px 10px",
    fontSize: 15,
    color: "#173a64",
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
  rightBoxArrow: {
    backgroundColor: "#2991d6",
    minWidth: 28,
    height: 61,
    padding: 0,
  },
  filterSearch: {
    margin: "1px 1px",
    padding: 10,
    position: "fixed",
    backgroundColor: "#ffff",
    zIndex: "2",
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
}));

const vehicalOption = [
  {
    value: "Criteria",
    label: "Criteria",
  },
  { value: "truck", label: "Truck" },
  { value: "container", label: "Container" },
];

const gateTypeOptions = [
  { value: "ALL", label: "Both" },
  { value: "GROUNDING", label: "Ground" },
  { value: "PICKUP", label: "Pick Up" },
];
const blockConst = [{ value: "Block", label: "Block" }];
export default function YardOperation(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [toaster, setToaster] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const [openPickUpModal, setopenPickUpModal] = useState(false);
  const [selectedContainer, setselectedContainer] = useState({});
  const [openGrounding, setOpenGrounding] = React.useState(false);
  const [block, setBlock] = useState("Block");
  const [gateType, setGetType] = useState("ALL");
  const [vehical, setVehical] = useState("");
  const [number, setNumber] = useState("");
  const [dataModal, setDataModal] = useState("");

  const [openModal, setOpenMdal] = useState(false);
  const dispatch = useDispatch();
  const authToken = useSelector(({ auth }) => auth.authToken);
  const facility = useSelector(({ base }) => base.facility);
  const blockList = useSelector(({ base }) => base.blockList);
  const yardContainerList = useSelector(({ base }) => base.yardContainerList);
  useEffect(() => {
    if (blockList.length === 0) {
      dispatch(getBlockListApiCall(facility, authToken, handleCallbackBlock));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockList]);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block, gateType]);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleCallbackBlock = () => {};

  // const handleFilterOpen = () => {
  //   setOpen(!open);
  // };

  const handleOpenModal = (title, data) => {
    setOpenMdal(true);
    setModalData(title);
    setDataModal(data);
  };

  const handleSearch = () => {
    let data = {
      facilityId: facility,
      gatetype: gateType,
    };
    if (block !== "Block") {
      data.blockNumber = block;
    }
    if (vehical !== "" && vehical !== "Criteria") {
      if (number === "") {
        alert("Please add search text");
        return;
      }
      if (number.length < 4) {
        alert("Please add minimum 4 character");
        return;
      } else {
        data.vehical = vehical;
        data.number = number;
      }
    }

    setLoading(true);
    getYardContainerList(data);
  };

  const getYardContainerList = (data) => {
    dispatch(getYardOperationApiCall(data, authToken, handleCallbackList));
  };
  const handleCallbackList = (response) => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleOpenPickUpModal = (container) => {
    setselectedContainer(container);
    setopenPickUpModal(true);
  };

  const handleClosePickUp = (status) => {
    setopenPickUpModal(false);
    setselectedContainer({});
    if (status) {
      toasterOption = {
        varient: "success",
        message: "Container Pickup Successfully",
      };
      setToaster(true);
      handleSearch();
    }
  };

  const handleOpenGroundingModal = (container) => {
    setselectedContainer(container);
    setOpenGrounding(true);
  };

  const handleCloseGrounding = (status) => {
    setOpenGrounding(false);
    setselectedContainer({});
    if (status) {
      toasterOption = {
        varient: "success",
        message: "Container Ground Successfully",
      };
      setToaster(true);
      handleSearch();
    }
  };
  console.log(openGrounding)

  return (
    <>
      <TitleHeader
        open={open}
        setOpen={setOpen}
        title={"Yard Operation"}
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
                  placeholder="Select Block"
                  inputStyle={<BootstrapInput />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Select
                  selectedValue={gateType === "" ? "ALL" : gateType}
                  handleChange={setGetType}
                  options={gateTypeOptions}
                  placeholder="Select Type"
                  inputStyle={<BootstrapInput />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Select
                  selectedValue={vehical === "" ? "Criteria" : vehical}
                  handleChange={(value) => {
                    setVehical(value);
                    if (value === "Criteria") {
                      setNumber("");
                    }
                  }}
                  options={vehicalOption}
                  placeholder="Select Type"
                  inputStyle={<BootstrapInput />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <TextField
                className={classes.searchInput}
                onChange={(e) => setNumber(e.target.value)}
                id="outlined-basic"
                placeholder="Enter No."
                label=""
                value={number}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                className={classes.searchBtn}
                onClick={() => {
                  if (vehical === "" || vehical === "Criteria") {
                    setOpen(false);
                  }

                  if (number !== "" && number.length > 3) {
                    setOpen(false);
                  }
                  handleSearch();
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Card>
      )}
      <div
        className={classes.yardMain}
        style={open ? { marginTop: "132px" } : { marginTop: "0px" }}
      >
         <div style={{position:'relative'}}>
        <Typography className={classes.yardTitle}>Work Order</Typography>
        <RefreshIcon fontSize="small" style={{position:'absolute',top: '-2px',right:'10px'}}  />
        </div>
        <Divider style={{ marginBottom: "7px" }} />
        {loading && <Loader />}
        {!loading && yardContainerList && yardContainerList.length === 0 && (
          <Typography className={classes.yardNoData}>No Data Found</Typography>
        )}
        {!loading &&
          yardContainerList &&
          yardContainerList.length > 0 &&
          yardContainerList.map((item, key) => (
            <CardGrid
              key={key}
              item={item}
              handleOpenModal={handleOpenModal}
              cardFor="yardOperation"
            >
              <Box>
                {item.containerStatus === "GROUNDING" ? (
                  <Button
                    className={classes.rightBoxArrow}
                    onClick={() => handleOpenGroundingModal(item)}
                  >
                    <ArrowDownwardIcon color="secondary" />
                  </Button>
                ) : (
                  <Button
                    className={classes.rightBoxArrow}
                    onClick={() => handleOpenPickUpModal(item)}
                    // onClick={() => handleOpenModal("pickup",item.containerNumber)}
                  >
                    <ArrowUpwardIcon color="secondary" />
                  </Button>
                )}
              </Box>
            </CardGrid>
          ))}
      </div>
      {openModal && (
        <Modal
          open={openModal}
          setOpen={setOpenMdal}
          modalData={modalData}
          data={dataModal}
        />
      )}
      {openGrounding && (
        <GroundingModal
          container={selectedContainer}
          setOpen={handleCloseGrounding}
          open={openGrounding}
          type={"grounding"}
          api={"Grounding Api"}
          data={""}
        />
      )}
      {openPickUpModal && (
        <PickUpModal
          container={selectedContainer}
          open={openPickUpModal}
          setOpen={handleClosePickUp}
        />
      )}
      <Snackbar
        open={toaster}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={() => setToaster(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setToaster(false)}
          severity={toasterOption.varient}
        >
          {toasterOption.message}
        </MuiAlert>
      </Snackbar>
      <ScrollToTop />
    </>
  );
}
