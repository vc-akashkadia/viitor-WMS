import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TitleHeader from "../components/TitleHeader";
import { constants } from "@config/constant";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import useGobalStyle from "@common-style";
import Select from "../components/Select";
import Box from "@material-ui/core/Box";
import LocalPrintshopOutlinedIcon from "@material-ui/icons/LocalPrintshopOutlined";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import { getReprintContainerListApi } from "../apicalls/GateApiCalls";
import Loader from "../components/Loader";
import CradGrid from "../components/Card";
import Modal from "../components/modal";
import PrintModal from "../components/PrintModal";
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
    color: "#1f1f21",
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
      borderRadius: 3,
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
    minWidth: 28,
    height: 61,
    padding: 0,
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
    marginTop: "190px",
    "@media (min-width:600px)": {
      marginTop: 75,
    },
  },
  button: {
    textTransform: "capitalize",
    padding: 0,
    height: 26,
  },
});
function GetFormattedDate() {
  var todayTime = new Date();
  var month = ("0" + (todayTime.getMonth() + 1)).slice(-2);
  var day = ("0" + todayTime.getDate()).slice(-2);
  var year = todayTime.getFullYear();
  return year + "-" + month + "-" + day;
}

const rePrintOption = constants.rePrintTypes;
export default function Reprint() {
  const classes = { ...useGobalStyle(), ...useStyles() };
  const [open, setOpen] = useState(false);
  const [block, setBlock] = useState("");
  const [fromDate, setFromDate] = useState(GetFormattedDate());
  const [toDate, setToDate] = useState(GetFormattedDate());
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState();
  const [dataModal, setDataModal] = useState("");
  const [openModal, setOpenMdal] = useState(false);
  const [selectContainer, setSelectContainer] = useState({});
  const [openPrintModal, setOpenPrintModal] = useState(false);
  const authToken = useSelector(({ auth }) => auth.authToken);
  const facility = useSelector(({ base }) => base.facility);
  const dispatch = useDispatch();
  const getContainerList = () => {
    let data = {
      fromDate: fromDate.toString().split("-").reverse().join("-"),
      toDate: toDate.toString().split("-").reverse().join("-"),
      facility_id: facility,
      operationtype: block,
    };
    setLoading(true);
    dispatch(getReprintContainerListApi(data, authToken, handleCallback));
  };
  useEffect(getContainerList, []);
  const handleSearch = () => {
    getContainerList();
    setOpen(false);
  };

  const handleCallback = (response) => {
    setLoading(false);
  };
  const gateMoveContainerList = useSelector(
    ({ base }) => base.gateMoveContainerList
  );
  const handleOpenModal = (title, data) => {
    setOpenMdal(true);
    setModalData(title);
    setDataModal(data);
  };
  const handleOpenPrint = (container, index) => {
    setSelectContainer(container);
    setOpenPrintModal(true);
    setModalData("print");
  };
  return (
    <>
      <TitleHeader
        open={open}
        setOpen={setOpen}
        title={constants.reprint.title}
        backPath={"/operations"}
      />
      {open && (
        <div className={classes.filterSearch}>
          <Card className={classes.filterPadding}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={6}>
                <Typography className={classes.searchTitle}>
                  Search Here
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Select
                    selectedValue={block === "" ? "none" : block}
                    handleChange={setBlock}
                    options={rePrintOption}
                    placeholder={constants.formPlaceHolder.gateType}
                    inputStyle={<BootstrapInput />}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id="date"
                    label="From Date"
                    type="date"
                    value={fromDate}
                    style={{ marginTop: "-8px" }}
                    onChange={(e) => setFromDate(e.target.value)}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id="date"
                    label="To Date"
                    type="date"
                    value={toDate}
                    format="dd/MM/yyyy"
                    onChange={(e) => setToDate(e.target.value)}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{ min: fromDate, max: GetFormattedDate() }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.searchBtn}
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </FormControl>
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
              cardFor="gateOperation"
            >
              <Box style={{ marginLeft: "3px" }}>
                <Button
                  className={classes.rightBoxArrow}
                  onClick={() => handleOpenPrint(item, key)}
                >
                  <LocalPrintshopOutlinedIcon color="secondary" />
                </Button>
              </Box>
            </CradGrid>
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
      {openPrintModal && (
        <PrintModal
          open={openPrintModal}
          setOpen={() => setOpenPrintModal(false)}
          modalData={modalData}
          data={dataModal}
          container={selectContainer}
          checkingPageType={"reprint"}
        />
      )}
    </>
  );
}
