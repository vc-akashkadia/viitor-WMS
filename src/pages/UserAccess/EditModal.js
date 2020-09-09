import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { ReactComponent as GateInIcon }from "@assests/img/gate-in1.svg"
import { ReactComponent as YardIcon }from "@assests/img/yard-operation.svg"
import { green } from "@material-ui/core/colors";
// import LocalShippingIcon from '@material-ui/icons/LocalShipping';

const GreenCheckbox = withStyles({
  root: {
    fill: "#000",
    "&$checked": {
      fill: green[600]
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);

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
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#0c79c1",
    textTransform: "uppercase",
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 0,
    margin: "auto",
  },
  content: {
    fontFamily: "Roboto",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 0,
  },
  innerContent: {
    display: "flex",
    // justifyContent: "space-between",
    marginBottom: 10,
    marginTop: "3px",
    color: "#707070",
  },
  innerContentCheck: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  content2: {
    fontFamily: "Roboto",
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: 400,
    marginTop: "-15px",
  },
  actionbutton: {
    paddingBottom: 15,
    justifyContent: "center",
  },
  boxStyle: {
    // backgroundColor: "lightgrey",
    width: "190px",
    border: "1px solid #ced4da",
    // padding: "15px",
    paddingLeft: "5px",
    margin: "4px 0px 0px 0px",
  },
  searchInput: {
    width: "60%",
    "& input": {
      height: "25px",
    },
  },
  listItemText:{
    marginLeft:"-21px"
  },
  listItem:{
    // marginLeft:"-11px"
    paddingLeft:"4px",
    paddingRight:"16px",
    paddingTop:"0px",
    paddingBottom:"0px"
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
    // textTransform: "inherit",
    textTransform: "capitalize",
    padding: 0,
    height: 26,
  },
  notchedOutline: {
    borderColor: "#f6f6f6 !important",
  },
}));

export default function GroundingContainers(props) {
  const classes = useStyles();
  const { open, setOpen, type, api, data } = props;
  const [location, setLocation] = useState(data);
  const [error, setError] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location === "") {
      setError("pelase enter the location");
    } else {
      if (type === "add") {
        //call the add API

        console.log("api", api);
        setOpen(false);
      } else {
        //call edit API

        console.log("api", api);
        setOpen(false);
      }
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>
          {type === "add" ? "Add User Access" : "Update User Access"}
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.content}>
          <Typography className={classes.innerContent}>
            User Name:
            {type === "edit" ? (
              <span style={{ color: "#000000", marginLeft: "2px" }}>John</span>
            ) : (
              <TextField
                className={classes.searchInput}
                id="outlined-basic"
                placeholder="Enter No."
                label=""
                variant="outlined"
                style={{ marginLeft: "2px", marginTop: "-3px" }}
              />
            )}
          </Typography>
          {type === "add" && (
            <Typography className={classes.innerContent}>
              Facility:
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                name="damageCode"
                // value={item.damageCode}
                // onChange={(event) =>
                //   handleChange(event.target.value)
                // }
                input={<BootstrapInput />}
                placeholder="Block"
                style={{ width: "70%", marginLeft: "2px", marginTop: "-4px" }}
              >
                <MenuItem
                  // key={selectItem.value + "_" + key}
                  value={"a"}
                >
                  a
                </MenuItem>
              </Select>
            </Typography>
          )}
          {/* Access user */}
          <form onSubmit={handleSubmit}>
            <Typography style={{ fontWeight: "400" }}>Access</Typography>
            <div className={classes.boxStyle}>
              <List style={{paddingTop:"0px",paddingBottom:"0px"}}>
                <ListItem
                  // key={value}
                  role={undefined}
                  dense
                  button
                  className={classes.listItem}
                  // onClick={handleToggle(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      // defaultChecked
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                      // checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      // disableRipple
                      color="primary"
                      // inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Yard Job"}
                    
                  className={classes.listItemText} 
                  />
                </ListItem>
                <ListItem
                  className={classes.listItem}
                  // key={value}
                  style={{marginTop:"-8px"}}
                  role={undefined}
                  dense
                  button
                  // onClick={handleToggle(value)}
                >
                  <ListItemIcon>
                    <GreenCheckbox
                    name="checkedD"
                    indeterminate
                    // className={classes.GreenCheckbox}
                    indeterminateIcon={<YardIcon />}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={"gate"}
                    className={classes.listItemText}
                    primary={"Gate In"}
                  />
                </ListItem>
              </List>
            </div>
            
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
                type="submit"
                variant="contained"
                size="small"
                color="primary"
                autoFocus
                className={classes.button}
              >
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
