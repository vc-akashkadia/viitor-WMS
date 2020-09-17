import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import LocationSlip from "./print/LocationPrint";
import EIRSlip from "./print/EIRPrint";
import { LocationSlipApi, EIRPrintApi ,updateContainerPrintStatus} from "./../apicalls/GateApiCalls";
import Loader from "./Loader";
import Toaster from "./Toaster";
import  Divider  from "@material-ui/core/Divider";
import useGlobalStyle from "@common-style"
import {constants} from "@config/constant";
let toasterOption = {
  varient: "success",
  message: "",
};


const useStyles = makeStyles((theme) => ({
  // title: {
  //   fontSize: 16,
  //   color: "#0c79c1",
  //   fontWeight: 900,
  //   fontFamily: "Roboto",
  //   textTransform: "uppercase",
  //   padding:"5px 10px",
  //   margin: "auto",
  // },
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
    paddingBottom: 10,
    justifyContent: "center",
    marginTop: "3px",
  },
  muiDialog: {
    "& paper": {
      margin: 1,
    },
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
    // textTransform: "inherit"
    textTransform: "capitalize",
    padding: 0,
    height: 26,
  },
  buttonPrint: {
    textTransform: "capitalize",
    padding: 0,
    height: 28,
    width: "110px",
    marginLeft: "52px",
    marginTop: "6px",
    marginBottom: "1px",
  },
  hiddenPrint: {
    "@media print": {
      display: "none !important",
    },
  },
}));

export default function PrintModal(props) {
  const classes = {...useGlobalStyle(),...useStyles()};
  const [loading, setLoading] = useState(false);
  const { open, setOpen, modalData, container, gateType } = props;
  const [printType, setPrintType] = useState("");
  const dispatch = useDispatch();
  const [toaster, setToaster] = useState(false);
  const authToken = useSelector(({ auth }) => auth.authToken);
  const facility = useSelector(({ base }) => base.facility);
  const locationSlipData = useSelector(({ base }) => base.locationSlip);
  const handlePrintType = (printType) => {
    setLoading(true)
    if (printType === "LOCATION") {
      let data = {
        shipmentId: container.shipmentId,
        operationCode: container.operationCode,
        operationStatus: container.operationCode,
        facilityId: facility,
        containerNumber: container.containerNumber,
        printType:printType
      };
      dispatch(LocationSlipApi(data, authToken, handleCallback));
    } else {
      let data = {
        containerNumber: container.containerNumber,
        operationCode: container.operationCode,
        facility_id: facility,
        printType:printType
      };
      dispatch(EIRPrintApi(data, authToken, handleCallback));
    }
  };
  const handleCallback = (response,printType) => {
    const { data : {status}} = response
   if(status){
    setPrintType(printType);
    setTimeout(() => {
      const anchor = document.querySelector(".ticket");
      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth" });
      }
      setLoading(false)
    }, 100);
  }else{
    toasterOption = {
      varient: "error",
      message: constants.apiError.error,
    };
    setToaster(true);
    setPrintType('');
    setLoading(false)
  }
  };
  const handleClose = (status = false) => {
    setOpen(status);
  };

  const handlePrint = () => {
    let data ={
      printType:printType,
      containerNumber:container.containerNumber,
      operationStatus:container.operationCode,
      
    }
    dispatch(updateContainerPrintStatus(data, authToken, handleCallbackPrint));
  };

  const handleCallbackPrint =(response) => {
    window.print();
  }

  return (
    <div>
      {modalData === "print" && (
        <Dialog
          open={open}
          onClose={() => handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.muiDialog}
          fullScreen={printType === "LOCATION" || printType === "EIR"}
        >
          {printType === "LOCATION" && (container.operationCode === 'GATE_IN_INBOUND' || container.operationCode === 'GATE_IN_OUTBOUND') && (
            <>
              <LocationSlip data={locationSlipData} />
            </>
          )}
          {printType === "EIR" && (
            <>
              <EIRSlip data={locationSlipData} gateType={gateType} />
            </>
          )}
          {printType !== "" && (
            <>
              <DialogActions className={classes.actionbutton}>
                <Button
                  onClick={() => handleClose(true)}
                  variant="contained"
                  size="small"
                  color="secondary"
                  autoFocus
                  className={classes.button + " " + classes.hiddenPrint}
                  
                >
                  Close
                </Button>
                <Button
                  onClick={() => handlePrint()}
                  variant="contained"
                  size="small"
                  color="primary"
                  autoFocus
                  className={classes.button + " " + classes.hiddenPrint}
                >
                  Print
                </Button>
              </DialogActions>
            </>
          )}
          {printType === "" && (
            <>
              <DialogTitle id="alert-dialog-title" className={classes.title}>
                Choose the Print Type
              </DialogTitle>
              <Divider className={classes.dividerStyle} />
              {loading && <Loader />}
              {!loading && (
                <>
                  {(container.operationCode === 'GATE_IN_INBOUND' || container.operationCode === 'GATE_IN_OUTBOUND') && (
                    <Button
                      onClick={(e) => handlePrintType("LOCATION")}
                      variant="contained"
                      size="small"
                      color="primary"
                      autoFocus
                      className={classes.buttonPrint}
                      // style={{width:"110px"}}
                      disabled={container.print_location}
                    >
                      Location Slip
                    </Button>
                  )}

                  <Button
                    onClick={(e) => handlePrintType("EIR")}
                    variant="contained"
                    size="small"
                    color="primary"
                    autoFocus
                    className={classes.buttonPrint}
                    // style={{width:"110px"}}
                    disabled={container.print_eir}
                  >
                    EIR Slip
                  </Button>
                </>
              )}
              <DialogActions className={classes.actionbutton}>
                <Button
                  onClick={() => handleClose(false)}
                  variant="contained"
                  size="small"
                  color="secondary"
                  autoFocus
                  className={classes.button}
                >
                  Close
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      )}
      <Toaster 
        open={toaster}
        handleClose={setToaster}
        option={toasterOption.varient}
        message={toasterOption.message}
        />
      
      
    </div>
  );
}
