import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import AddIcon from "@material-ui/icons/Add";
// import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import DialogTitle from "@material-ui/core/DialogTitle";
// import Table from "./Table"
import Card from "@material-ui/core/Card";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Select from "@material-ui/core/Select";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { DamageCodeListApi } from "../apicalls/GateApiCalls";
// import CircularProgress from "@material-ui/core/CircularProgress";
import Loader from "../components/Loader";
import Chip from "@material-ui/core/Chip";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => ({
    root:{
        marginBottom:"-4px"
    },
  title: {
    color: "#173a64",
    // textTransform: "uppercase",
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 0,
    margin: "auto",
  },
  content: {
    fontFamily: "Roboto",
    paddingLeft: 10,
    paddingRight: 10,
    // backgroundColor: "white",
    backgroundColor: "#f6f6f6",
    paddingBottom: 0,
  },
  innerContent: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
    color: "#707070",
  },
  content2: {
    fontFamily: "Roboto",
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: 400,
  },
  actionbutton: {
    paddingBottom: 15,
    justifyContent: "center",
  },
  button: {
    // paddingTop: 10,
    // paddingBottom: 10,
    // paddingLeft: 15,
    // paddingRight: 15,
    // fontSize: 14,
    // fontWeight: 400,
    // fontFamily: "Roboto",
    // lineHeight: "16px",
    // // textTransform: "inherit",
    // minWidth: "100%",
    textTransform: "capitalize",
    padding: 0,
    height: 26,
  },
  yardCard: {
    padding: 1,
    margin: "0px -9px",
    marginBottom: 5,
    "&:last-child": {
      marginBottom: 0,
    },
  },
  notchedOutline: {
    borderColor: "#f6f6f6 !important",
  },
  addIcon: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  tableCard: {
    marginBottom: 10,
    width: "100%",
    borderRadius: 0,
  },
  dataTable: {
    borderCollapse: "collapse",
    width: "100%",
    boxSizing: "border-box",
  },
  tableTh: {
    border: "1px solid #000",
    fontSize: 12,
    textAlign: "left",
    boxSizing: "border-box",
    // padding: "11px"
    padding: " 0px 0 0px 14px",
    // paddingLeft:"15px",
    // paddingTop:"0px",
  },
  chipMain: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "2px 1px",
    },
  },
  rightBoxArrow: {
    backgroundColor: "#ff0000bd",
    minWidth: 28,
    height: 56,
    color: "white",
    padding: 0,
  },
  addNewICon: {
    backgroundColor: "#0c79c1",
    width: 19,
    height: 20,
    color: "white",
    padding: 0,
  },
}));

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
    border: "none",
    fontSize: 14,
    fontWeight: 500,
    padding: "0px 26px 0px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    width: "100%",
    height: 26,
    // display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "inline-block",
    lineHeight: "26px",
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Roboto"].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

export default function DamageCapture(props) {
  const { open, setOpen, container, addDamage } = props;
  const classes = useStyles();
  const [showAdd, setAddButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [damageList, setDamage] = useState([]);
  const [lastIndex, setLastIndex] = useState([]);
  const dispatch = useDispatch();
  const authToken = useSelector(({ auth }) => auth.authToken);
  const damageCodes = useSelector(({ base }) => base.damageCodeList);

  useEffect(() => {
    if (damageCodes.length === 0) {
      enableLoading();
      dispatch(DamageCodeListApi(authToken, handleCallbackDamageCodeList));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (container.damage !== undefined && container.damage !== "") {
      let selectedDamageCodes = container.damage.split(",");
      let filterDamageCodes = damageCodes.filter((item) =>
        selectedDamageCodes.includes(item.value)
      );
      let selecftDamageList = filterDamageCodes.map((item) => ({
        id: Math.random(),
        damageCode: item.value,
        description: item.label,
        editable: false,
      }));
      setDamage(selecftDamageList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const handleCallbackDamageCodeList = (response) => {
    disableLoading();
  };
  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const addDamageRow = () => {
    if (damageList && damageList.length < 1) {
      let newDamageList = [
        ...damageList,
        {
          id: Math.random(),
          damageCode: "",
          description: "",
          editable: true,
        },
      ];

      setDamage(newDamageList);
      setLastIndex(newDamageList[newDamageList.length - 1]);
    } else {
      if (lastIndex && lastIndex.damageCode === "") {
        // alert("please fill the card value");
        setError(true);
      } else {
        let newDamageList = [
          ...damageList,
          {
            id: Math.random(),
            damageCode: "",
            description: "",
            editable: true,
          },
        ];
        setDamage(newDamageList);
        setLastIndex(newDamageList[newDamageList.length - 1]);
      }
    }
    if (lastIndex) {
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    var elmnt = document.getElementById(lastIndex && lastIndex.id);
    if (lastIndex && lastIndex.id) {
      if (elmnt !== null) {
        elmnt.scrollIntoView();
      }
    }
  };

  useEffect(() => {
    if (lastIndex) {
      scrollToTop();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastIndex]);

  const handleOnChange = (event, valueFor, damageId) => {
    let newDamageList = [...damageList];
    newDamageList.map((item) => {
      if (item.id === damageId) {
        item.damageCode = event.value;
        let singleDamageCode = damageCodes.find(
          (item) => item.value === event.value
        );
        if (singleDamageCode !== undefined) {
          item.description = singleDamageCode.label;
        } else {
          item.description = "";
        }
      }
      return item;
    });
    setDamage(newDamageList);
    setLastIndex(newDamageList[newDamageList.length - 1]);
  };

  // const handleSave = (damageId) => {
  //   //let damage = damageList.find((item) => item.id === damageId);
  //   let newDamageList = [...damageList];
  //   newDamageList.map((item) => {
  //     item.editable = false;
  //     return item;
  //   });
  //   enableLoading();
  //   setTimeout(() => {
  //     setDamage(newDamageList);
  //     setAddButton(!showAdd);
  //     disableLoading();
  //   }, 1000);
  // };
  const handleRemove = (damageId) => {
    let newDamageList = [...damageList];
    setDamage(newDamageList.filter((item) => item.id !== damageId));

    setLoading(true);
    setAddButton(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setLastIndex(
      newDamageList.filter((item) => item.id !== damageId)[
        newDamageList.filter((item) => item.id !== damageId).length - 1
      ]
    );
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleErrorClose =()=>{
      setError(false)
  }

  const handleConfirm = () => {
    let damageCodeSelected = damageList.map(function (damage) {
      return damage.damageCode;
    });
    addDamage(damageCodeSelected.toString());
  };

  return (
    <div>
      <Dialog
        open={open}
        fullScreen
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>
          {" "}
          Damage Capture
        </DialogTitle>

        <DialogContent className={classes.content}>
          <Box
            style={{
              position: "fixed",
              width: "99%",
              padding: "7px",
              marginLeft: "-9px",
              marginTop: "-8px",
              backgroundColor: "#f6f6f6",
              zIndex: "2",
            }}
          >
            <DialogContentText style={{ color: "#173a64" }} className={classes.root}>
              Truck Number:{" "}
              {<b>{container && container.truckNumber}</b>}
            </DialogContentText >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <DialogContentText className={classes.root} style={{ color: "#173a64",marginTop:"7px" }}>
                Container: {<b>{container.containerNumber}</b>}
              </DialogContentText>
              <Box
                style={{ marginRight: "-4px", borderRadius: "50%" }}
                onClick={addDamageRow}
              >
                <AddIcon className={classes.addNewICon} />
              </Box>
            </Box>
          </Box>

          {loading && <Loader />}
          <Box style={{ marginTop: "50px" }}>
            {!loading &&
              showAdd &&
              damageList &&
              damageList.map((damage) => (
                <Card className={classes.yardCard} id={damage.id}  key={damage.id}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box className={classes.chipMain}>
                      <Chip label="Code" style={{ width: "57px" }} />
                      <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        name="damageCode"
                        value={damage.damageCode}
                        onChange={(event) =>
                          handleOnChange(event.target, "damageCode", damage.id)
                        }
                        input={<BootstrapInput />}
                        placeholder="Block"
                        style={{ width: "70%" }}
                      >
                        
                        {damageCodes.map((item,key) => {
                          return (
                            <MenuItem key={item.value+'_'+key} value={item.value}>
                              {item.value}
                            </MenuItem>
                          );
                        })}
                      </Select>

                      <Chip
                        label={damage.description}
                        style={{ width: "203px", justifyContent: "left" }}
                      />
                    </Box>
                    <Box
                      style={{ marginLeft: "3px" }}
                      onClick={(e) => handleRemove(damage.id)}
                    >
                      <Button className={classes.rightBoxArrow}>
                        <DeleteForeverIcon />
                      </Button>
                    </Box>
                  </Box>
                </Card>
              ))}
          </Box>
        </DialogContent>
        <DialogActions className={classes.actionbutton}>
          <Button
            onClick={handleClose}
            variant="contained"
            size="small"
            color="secondary"
            className={classes.button}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
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
      {error && (
        <Snackbar
          open={error}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={handleErrorClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleErrorClose}
            severity="error"
          >
           Please Fill the Damage Code
          </MuiAlert>
        </Snackbar>
      )}
    </div>
  );
}
