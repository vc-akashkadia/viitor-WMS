import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
// import Table from "./Table"
import Card from "@material-ui/core/Card";
import CancelIcon from "@material-ui/icons/Cancel";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { DamageCodeListApi } from "../apicalls/GateApiCalls";
// import CircularProgress from "@material-ui/core/CircularProgress";
import Loader from "../components/Loader"
const useStyles = makeStyles((theme) => ({
  title: {
    color: "#0c79c1",
    textTransform: "uppercase",
    paddingTop: 12,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 0,
    margin: "auto",
  },
  content: {
    fontFamily: "Roboto",
    paddingLeft: 10,
    paddingRight: 10,
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 14,
    fontWeight: 400,
    fontFamily: "Roboto",
    lineHeight: "16px",
    textTransform: "inherit",
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
    width:'100%'
  },
  dataTable: {
    // border: '1px solid #000'
    width : '100%'
  },
  tableTh: {
    borderRight: "1px solid #000",
    borderBottom: "1px solid #000",
    borderLeft: "1px solid #000",
    borderTop: "1px solid #000",
    fontSize: 12,
  },
}));

export default function AlertDialog(props) {
  const { open, setOpen, container,addDamage } = props;
  const classes = useStyles();
  const [showAdd, setAddButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [damageList, setDamage] = useState([]);
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
    if(container.damage !== undefined && container.damage !== ''){
      let selectedDamageCodes = container.damage.split(",");
      let filterDamageCodes = damageCodes.filter(
        (item) => selectedDamageCodes.includes(item.value)
      );
      let selecftDamageList = filterDamageCodes.map((item) => (
          {
            id: Math.random(),
            damageCode: item.value,
            description: item.label,
            editable: false,
          }
      ))
      setDamage(selecftDamageList)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[open])
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
    // alert('here')
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
    setAddButton(!showAdd);
  };
  const handleOnChange = (event, valueFor, damageId) => {
    let newDamageList = [...damageList];
    newDamageList.map((item) => {
      if (item.id === damageId) {
        item.damageCode = event.value;
        let singleDamageCode = damageCodes.find(
          (item) => item.value === event.value
        );
        item.description = singleDamageCode.label;
      }
      return item;
    });
    setDamage(newDamageList);
  };

  const handleSave = (damageId) => {
    //let damage = damageList.find((item) => item.id === damageId);
    let newDamageList = [...damageList];
    newDamageList.map((item) => {
      item.editable = false;
      return item;
    });
    enableLoading();
    setTimeout(() => {
      setDamage(newDamageList);
      setAddButton(!showAdd);
      disableLoading();
    }, 1000);
  };
  const handleRemove = (damageId) => {
    let newDamageList = [...damageList];
    setDamage(newDamageList.filter((item) => item.id !== damageId));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
     
    let damageCodeSelected = damageList.map(function(damage) {
      return damage.damageCode;
    });
    addDamage(damageCodeSelected.toString())
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}

        <DialogContent className={classes.content}>
          <DialogContentText>
            Truck Number : {container.truckNumber}
          </DialogContentText>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <DialogContentText>
              Container: {container.containerNumber}
            </DialogContentText>
            {showAdd && <AddCircleIcon onClick={addDamageRow} />}
          </Box>

          <Card className={classes.tableCard}>
            {loading && <Loader /> }
            {!loading && (
              <table className={classes.dataTable}>
                <thead>
                  <tr>
                    <th className={classes.tableTh}>D.Code</th>
                    <th className={classes.tableTh}>Description</th>
                    <th className={classes.tableTh}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {damageList.map((damage) => {
                    return (
                      <tr key={damage.id}>
                        {!damage.editable ? (
                          <>
                            <td className={classes.tableTh}>
                              {damage.damageCode}
                            </td>
                            <td className={classes.tableTh}>
                              {damage.description}
                            </td>
                            <td className={classes.tableTh}>
                              <CancelIcon
                                color="error"
                                onClick={(e) => handleRemove(damage.id)}
                              />
                            </td>
                          </>
                        ) : (
                          <>
                            <td className={classes.tableTh}>
                              <Select
                                native
                                value={damage.damageCode}
                                onChange={(event) =>
                                  handleOnChange(
                                    event.target,
                                    "damageCode",
                                    damage.id
                                  )
                                }
                                inputProps={{
                                  name: "damageCode",
                                  id: "damageCode",
                                }}
                              >
                                <option aria-label="None" value="" />
                                {damageCodes.map((item) => (
                                  <option key={item.value} value={item.value}>
                                    {item.value}
                                  </option>
                                ))}
                              </Select>
                            </td>
                            <td className={classes.tableTh}>
                              {damage.description}
                            </td>
                            <td className={classes.tableTh}>
                              <SaveRoundedIcon
                                onClick={(e) => handleSave(damage.id)}
                              />
                              <CancelIcon
                                color="error"
                                onClick={(e) => handleRemove(damage.id)}
                              />
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </Card>
        </DialogContent>
        <DialogActions className={classes.actionbutton}>
          <Button
            onClick={handleClose}
            variant="contained"
            size="small"
            color="secondary"
            className={classes.button}
          >
            Back
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
    </div>
  );
}
