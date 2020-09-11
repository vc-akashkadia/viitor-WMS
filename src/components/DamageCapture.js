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
import CardGrid from "./Card";
import { makeStyles } from "@material-ui/core/styles";
import { DamageCodeListApi } from "../apicalls/GateApiCalls";
// import CircularProgress from "@material-ui/core/CircularProgress";
import Loader from "./Loader";


import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => ({
    root:{
        marginBottom:"-4px"
    },
  title: {
    color: "#0c79c1",
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

  const handleOnChange = (value, valueFor, damageId) => {
    let newDamageList = [...damageList];
    newDamageList.map((item) => {
      if (item.id === damageId) {
        item.damageCode = value;
        let singleDamageCode = damageCodes.find(
          (item) => item.value === value
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
            <DialogContentText style={{ color:  "#777777" }} className={classes.root}>
              Truck Number:{" "}
              {<span style={{ color: "#1f1f21" }}>{container && container.truckNumber}</span>}
            </DialogContentText >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <DialogContentText className={classes.root} style={{ color: "#777777",marginTop:"7px" ,display: 'flex'}}>
                Container: {<span style={{ color: "#1f1f21" }}>{container.containerNumber}</span>}
              </DialogContentText>
              <Box
                style={{ marginRight: "-4px", borderRadius: "50%" }}
                onClick={addDamageRow}
              >
              <AddIcon className={classes.addNewICon} />
              </Box>
            </Box>
          </Box>

          {loading && <Loader key={Math.random()}/>}
          <Box key="boxdiv" style={{ marginTop: "50px" }}>
            {!loading &&
              showAdd &&
              damageList &&
              damageList.map((damage) => (
               <> 
               <CardGrid index={damage.id} item={damage} key={damage.id} handleChange={handleOnChange} selectOption={damageCodes}  cardFor={"damageCapture"} handleRemove={handleRemove}/>
                </>
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
