import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TitleHeader from "../components/TitleHeader";
import { constants } from "@config/constant";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import useGlobalStyle from "@common-style";
import useGobalStyle from "@common-style";
import Select from "../components/Select";
import DateFnsUtils from "@date-io/date-fns";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from '@material-ui/core/TextField';

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

const PickerInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: "10px",
    },
  },
}));

const useStyles = makeStyles((theme) => ({}));

const rePrintOption = constants.rePrintTypes;
export default function Reprint() {
  const classes = { ...useGobalStyle(), ...useStyles() };
  const [open, setOpen] = useState(false);
  const [block, setBlock] = useState("Both");
  const [fromDate,setFromDate] =useState(new Date())
  const [toDate,setToDate] =useState(new Date())
  console.log("fromDate",fromDate)

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
                    selectedValue={block === "" ? "Both" : block}
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
                  // defaultValue="2017-05-24"
                  value={fromDate}
                  onChange={(e)=>setFromDate(e.target.value)}
                //  autoOk={true}
                 format="dd/MM/yyyy"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                  {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      name="startDate"
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      onChange={(e) => {
                         setFromDate(e);
                      }}
                      inputStyle={<PickerInput  />}
                      label={"From Date"}
                      style={{ marginTop: "-5px" }}
                      value={fromDate}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      autoOk
                      views={["year", "month", "date"]}
                    />
                  </MuiPickersUtilsProvider> */}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      name="startDate"
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      onChange={(e) => {
                        console.log("eee",e)
                         setToDate(e);
                      }}
                      minDate={fromDate}
                      label={"To Date"}
                      style={{ marginTop: "-7px" }}
                      value={toDate}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      autoOk
                      views={["year", "month", "date"]}
                    />
                  </MuiPickersUtilsProvider> */}
                  <TextField
                  id="date"
                  label="To Date"
                  type="date"
                  // defaultValue="2017-05-24"
                  value={toDate}
                  format="dd/MM/yyyy"
                  minDate={fromDate}
                  onChange={(e)=>setToDate(e.target.value)}
                //  autoOk={true}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </FormControl>
              </Grid>
            </Grid>
          </Card>
        </div>
      )}
    </>
  );
}
