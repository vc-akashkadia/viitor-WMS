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
import { ReactComponent as GateInIcon } from "@assests/img/gate-in-user.svg";
import { ReactComponent as YardIcon } from "@assests/img/yard-operation-user.svg";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import FormHelperText from "@material-ui/core/FormHelperText";

const GreenCheckbox = withStyles({
  root: {
    "&$checked": {
      color: "#0c79c1",
    },
  },
  checked: {},
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
      // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
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
    padding: "10px 10px",
    margin: 5
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
    // paddingBottom: 15,
    justifyContent: "center",
  },
  boxStyle: {
    width: "180px",
    border: "1px solid #ced4da",
    paddingLeft: "2px",
    margin: "4px 0px 0px 0px",
  },
  searchInput: {
    width: "60%",
    "& input": {
      height: "25px",
    },
  },
  listItemText: {
    marginLeft: "-29px",
  },
  listItem: {
    marginBottom: "-7px",
    marginTop:"-5px",
    paddingLeft: "0px",
    paddingRight: "16px",
    paddingTop: "0px",
    paddingBottom: "0px",
  },
  button: {
    textTransform: "capitalize",
    padding: 0,
    height: 26,
  },
  notchedOutline: {
    borderColor: "#f6f6f6 !important",
  },
}));

const accessValue = [
  {
    title: "Yard Operation",
    icon: <YardIcon />,
    startIcon: <YardIcon style={{ width: "21px" }} />,
  },
  {
    title: "Gate Operation",
    icon: <GateInIcon style={{ width: "18px", marginLeft: "3px" }} />,
    startIcon: <GateInIcon style={{ width: "18px", marginLeft: "3px" }} />,
  },
];

export default function EditModal(props) {
  const classes = useStyles();
  const { open, setOpen, type, api } = props;
  const [userName, setUserName] = useState("");
  const [facility, setFacility] = useState();
  const [errors, setErrors] = useState({
    userName: "",
    facility: "",
  });
  const [gateChecked, setGetChecked] = useState(false);

  const handleNameChange =(e)=>{
    setUserName(e.target.value)
  }

  const handleFacility =(e)=>{
    setFacility(e.target.value)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("facility",facility)
    let error = { userName: "", facility: "" };
    if (userName === "") {
      error.userName = "User Name is required";
    }
     if (facility === undefined) {
      error.facility = "Please select the facility";
    }
    setErrors(error);
    if(type==="add"){
      //call the add user api
    }else{
      // call edit user api
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
          {type === "edit" ? (
            <Typography className={classes.innerContent}>
              User Name:
              <span style={{ color: "#000000", marginLeft: "2px" }}>John</span>
            </Typography>
          ) : (
            <>
            <TextField
            error={errors.userName !== ""}
              className={classes.searchInput}
              id="outlined-basic"
              placeholder="Enter User Name"
              label=""
              value={userName}
              helperText={errors.userName}
              onChange={handleNameChange}
              variant="outlined"
              style={{ marginTop: "-3px", width: "100%" }}
            />
          
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              name="damageCode"
              value={facility ? facility :"none"}
              onChange={handleFacility}
              // defaultValue="Select Facility"
              // onChange={(event) =>
              //   handleChange(event.target.value)
              // }
              input={<BootstrapInput />}
              placeholder="Block"
              style={{ width: "100%", marginTop: "5px" }}
            >
              <MenuItem value="none" disabled>
                Select Facility
              </MenuItem>
              <MenuItem value={"a"}>a</MenuItem>
            </Select>
            <FormHelperText style={{color:"red"}}>{errors.facility}</FormHelperText>
            </>
          )}
          {/* Access user */}
          <form onSubmit={handleSubmit}>
            <Typography style={{ fontWeight: "400", marginTop: "10px" }}>
              Access
            </Typography>
            <div className={classes.boxStyle}>
              <List style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                {accessValue.map((item,index) => (
                  <>
                  <ListItem
                    key={item.title}
                    role={undefined}
                    dense
                    button
                    className={classes.listItem}
                    // style={index !==0 ?{borderTop:"1px solid #ced4da"}:{}}
                    // onClick={handleToggle(value)}
                  >
                    <ListItemIcon style={{paddingLeft:"2px"}}>
                      <IconButton edge="start" aria-label="comments" >
                        {item.startIcon}
                      </IconButton>
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      className={classes.listItemText}
                    />
                    <ListItemSecondaryAction>
                      <GreenCheckbox
                        edge="end"
                        name={item.title}
                        tabIndex={-1}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider style={{backgroundColor:"#ced4da",marginLeft: '-3px'}} />
                  </>
                ))}
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
                // onClick={handleSubmit}
                className={classes.button}
              >
                {type === "edit" ? "Update" : "Add User"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
