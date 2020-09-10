import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import InputBase from "@material-ui/core/InputBase";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { ReactComponent as GateInIcon } from "@assests/img/gate-in-user.svg";
import { ReactComponent as YardIcon } from "@assests/img/yard-operation-user.svg";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import FormHelperText from "@material-ui/core/FormHelperText";
import {AddRoleApi} from '../../apicalls/ModuleAccessApiCalls';
import Select from "../../components/Select";
import Loader from "../../components/Loader";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
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
    fontSize: 16,
    color: "#0c79c1",
    fontWeight: 900,
    fontFamily: "Roboto",
    textTransform: "uppercase",
    paddingTop: 12,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
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
    width: "190px",
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

let toasterOption = {
  varient: "success",
  message: "",
};

const accessValue = [
  {
    title: "Yard Operation",
    roleName : "YARD_JOB",
    icon: <YardIcon />,
    startIcon: <YardIcon style={{ width: "21px" }} />,
  },
  {
    title: "Gate Operation",
    roleName : "GATE_JOB",
    icon: <GateInIcon style={{ width: "18px", marginLeft: "3px" }} />,
    startIcon: <GateInIcon style={{ width: "18px", marginLeft: "3px" }} />,
  },
];

export default function EditModal(props) {
  const classes = useStyles();
  const { open, setOpen, type, api } = props;
  const [userName, setUserName] = useState("");
  const [facility, setFacility] = useState();
  const [access, setAccess] = useState([]);
  const [toaster, setToaster] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    userName: "",
    facility: "",
  });
  const [gateChecked, setGetChecked] = useState(false);
  const authToken = useSelector(({ auth }) => auth.authToken);
  let facilityList = useSelector(({ base }) => base.facilityList);
  const dispatch = useDispatch();
  const handleNameChange =(e)=>{
    setUserName(e.target.value)
  }

  const handleFacility =(value)=>{
    setFacility(value)
  }

  const handleClose = () => {
    setOpen(false);
  };
  
  const validateData = () => {
    let validate = true
    let error = { userName: "", facility: "" };
    if (userName === "") {
      error.userName = "User Name is required";
      validate = false
    }
     if (facility === undefined) {
      error.facility = "Please select the facility";
      validate = false
    }
    setErrors(error);
    // if (!values.gateIn && !values.yardOperation) {
    //   errors.anyone = "Please give atleast one access";
    // }
    return validate;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("facility",facility)
    if(validateData){
      let data =  {
        "username":userName,
        "facilityName":facility,
        "roleList":access
      }
      console.log(data)
      if(type==="add"){
        setLoading(true)
        dispatch(AddRoleApi(data,authToken,handleCallback));
      }else{
        // call edit user api
      }
    }
  };

  const handleCallback = (response) => {
    const {status} = response
    if(status){
      toasterOption = {
        varient: "success",
        message: type === 'add' ? "User Add Sucessful" : "User Edit Sucessful",
      };
    }else{
      toasterOption = {
        varient: "error",
        message: "Something went wrong try after sometime",
      };
    }
    setToaster(true);
    setLoading(false)
  }

  const handleCheckbox = (e, targetName) => {
    // setFieldValue(targetName, e.target.checked);
    let newAccess = [...access];
    let index = newAccess.indexOf(targetName);
    if(e.target.checked){
      if(index === -1){
        newAccess.push(targetName)
      }
    }else{
      if(index > -1){
        newAccess.splice(index, 1);
      }
    }
    setAccess(newAccess)
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
              style={{ marginTop: "-3px", width: "100%",marginBottom: "5px" }}
            />
          
            {/* <Select
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
            </Select> */}
              <Select
                selectedValue={facility !== '' ? facility : 'none'}
                handleChange={handleFacility}
                options={facilityList}
                placeholder="Select Facility"
                inputStyle={<BootstrapInput />}
                style={{ width: "100%", marginTop: "5px" }}
                
              />
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
                  <React.Fragment key={index}>
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
                        onChange={(e) => handleCheckbox(e, item.roleName)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider style={{backgroundColor:"#ced4da"}} />
                  </React.Fragment>
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
                className={classes.button}
              >
                {type === "edit" ? "Update" : "Add User"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={toaster}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
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
    </div>
  );
}
