import React, { useState, useEffect } from "react";
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
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import {
  AddRoleApi,
  getUserRoleList,
  EditRoleApi,
} from "../../apicalls/ModuleAccessApiCalls";
import Select from "../../components/Select";
import Toaster from "../../components/Toaster";
import Loader from "../../components/Loader";
import useGlobalStyle from "@common-style"
import {constants} from '@config/constant'
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
    color:"#1f1f21",
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
    paddingLeft: 23,
    paddingRight: 23,
    paddingBottom: 0,
  },
  innerContent: {
    display: "flex",
    // justifyContent: "space-between",
    marginBottom: 10,
    marginTop: "0px",
    color: "#777777",
  },
  innerContentActive: {
    display: "flex",
    // justifyContent: "space-between",
    marginBottom: 3,
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
    width: "100%",
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
const accessValue = {
  ROLE_YARD: {
    title: "Yard Operation",
    roleName: "ROLE_YARD",
    icon: <YardIcon />,
    startIcon: <YardIcon style={{ width: "18px" }} />,
  },
  ROLE_GATE: {
    title: "Gate Operation",
    roleName: "ROLE_GATE",
    icon: <GateInIcon style={{ width: "15px", marginLeft: "3px" }} />,
    startIcon: <GateInIcon style={{ width: "15px", marginLeft: "3px" }} />,
  },
  ROLE_LOCATION: {
    title: "Location Update",
    roleName: "ROLE_LOCATION",
    icon: <LocationOnOutlinedIcon style={{ width: "18px", marginLeft: "3px",color:"#5c5c5c"  }} />,
    startIcon: <LocationOnOutlinedIcon style={{ width: "18px", marginLeft: "3px",color:"#5c5c5c"  }} />,
  },
  ROLE_ADMIN: {
    title: "Admin",
    roleName: "ROLE_ADMIN",
    icon: <SupervisorAccountIcon style={{ width: "18px", marginLeft: "3px", color:"#5c5c5c" }} />,
    startIcon: <SupervisorAccountIcon style={{ width: "18px", marginLeft: "3px",color:"#5c5c5c"  }} />,
  }
  // "ROLE_ADMIN" : "Admin"
};

export default function EditModal(props) {
  const classes = {...useGlobalStyle(),...useStyles()};
  const { open, setOpen, type, user } = props;
  const [userName, setUserName] = useState(user.userName);
  const [facility, setFacility] = useState(user.facilityId);
  const [access, setAccess] = useState(
    user.userRoleId !== undefined
      ? user.userRoleId.map((role) => role.roleName)
      : []
  );
  const [toaster, setToaster] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState((user.isactive) ? user.isactive : true);
  const [errors, setErrors] = useState({
    userName: "",
    facility: "",
  });
  const authToken = useSelector(({ auth }) => auth.authToken);
  let facilityList = useSelector(({ base }) => base.facilityList);
  let roleList = useSelector(({ base }) => base.userRoleList);
  const dispatch = useDispatch();

  const getUserRoleListAPI = () => {
    if (roleList.length === 0) {
      dispatch(getUserRoleList(authToken, handleCallRoleBack));
    }
  };
  useEffect(getUserRoleListAPI, []);

  const handleCallRoleBack = (response) => {};
  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleFacility = (value) => {
    setFacility(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateData = () => {
    let validate = true;
    let error = { userName: "", facility: "" };
    if (userName === "") {
      error.userName = constants.userAccess.error.username;
      validate = false;
    }
    if (facility === undefined) {
      error.facility = constants.userAccess.error.facility;
      validate = false;
    }
    if(access.length === 0){
      errors.anyone = constants.userAccess.error.atleastOne;
    }
    setErrors(error);
    return validate;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateData) {
      let data = {
        username: userName,
        facilityName: facility,
        roleList: access.toString(),
        IsActive:active ? 1 : 0
      };
      if (type === "add") {
        setLoading(true);
        dispatch(AddRoleApi(data, authToken, handleCallback));
      } else {
        // call edit user api //getUserRoleList
        setLoading(true);
        dispatch(EditRoleApi(data, authToken, handleCallback));
      }
    }
  };

  const handleCallback = (response) => {
    const {
      data: { status },
    } = response;
    if (status) {
      toasterOption = {
        varient: "success",
        message: type === "add" ? constants.userAccess.addUser : constants.userAccess.editUser,
      };
    } else {
      toasterOption = {
        varient: "error",
        message: constants.apiError.error,
      };
    }
    setToaster(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(true);
    }, 1000);
  };

  const handleCheckbox = (e, targetName) => {
    // setFieldValue(targetName, e.target.checked);
    let newAccess = [...access];
    let index = newAccess.indexOf(targetName);
    if (e.target.checked) {
      if (index === -1) {
        newAccess.push(targetName);
      }
    } else {
      if (index > -1) {
        newAccess.splice(index, 1);
      }
    }
    setAccess(newAccess);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen={true}
      >
        {loading && <Loader />}
        <DialogTitle id="alert-dialog-title" className={classes.title}>
          {type === "add" ? "Add User Access" : "Update User Access"}
        </DialogTitle>
        <Divider className={classes.dividerStyle} />
        <DialogContent className={classes.content}>
          {type === "edit" ? (
            <>
              <Typography className={classes.innerContent}>
                User Name:
                <span style={{ color:"#1f1f21", marginLeft: "2px" }}>
                  {user.userName}
                </span>
              </Typography>
              <Typography className={classes.innerContent}>
                Facility Code:
                <span style={{ color:"#1f1f21", marginLeft: "2px" }}>
                  {user.facilityId}
                </span>
              </Typography>
              <Typography className={classes.innerContentActive}>
              Active:
              <span style={{ color:"#1f1f21", marginLeft: "-8px", marginTop: "-12px"  }}>
                {" "}
                <GreenCheckbox
                  edge="end"
                  name={"isactive"}
                  tabIndex={-1}
                  onChange={(e) => setActive(e.target.checked)}
                  checked={active}
                  style={{paddingTop: 8,paddingBottom: 0}}
                />
              </span>
            </Typography>
            </>
          ) : (
            <>
              <TextField
                error={errors.userName !== ""}
                className={classes.searchInput}
                id="outlined-basic"
                placeholder={constants.formPlaceHolder.userName}
                label=""
                value={
                  userName !== "" && userName !== undefined ? userName : ""
                }
                helperText={errors.userName}
                onChange={handleNameChange}
                variant="outlined"
                style={{
                  marginTop: "-3px",
                  width: "100%",
                  marginBottom: "5px",
                }}
              />
              <Select
                selectedValue={
                  facility !== "" && facility !== undefined ? facility : "none"
                }
                handleChange={handleFacility}
                options={facilityList}
                placeholder={constants.formPlaceHolder.facility}
                inputStyle={<BootstrapInput />}
                style={{ width: "100%", marginTop: "5px" }}
              />
              <FormHelperText style={{ color: "red" }}>
                {errors.facility}
              </FormHelperText>
            </>
          )}
          {/* Access user */}
          <form onSubmit={handleSubmit}>
            

            <Typography style={{ fontWeight: "500", marginTop: "6px", color: "#777777" }}>
              Access
            </Typography>
            <div className={classes.boxStyle}>
              <List style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                {roleList &&
                  roleList.map((role, roleIndex) => {
                    let roleData = accessValue[role.roleName];
                    if (roleData === undefined) {
                      return null;
                    }
                    return (
                      <React.Fragment key={roleIndex}>
                        <ListItem
                          key={roleData.title}
                          role={undefined}
                          dense
                          button
                          className={classes.listItem}
                          // style={index !==0 ?{borderTop:"1px solid #ced4da"}:{}}
                          // onClick={handleToggle(value)}
                        >
                          <ListItemIcon style={{ paddingLeft: "2px" }}>
                            <IconButton edge="start" aria-label="comments">
                              {roleData.startIcon}
                            </IconButton>
                          </ListItemIcon>
                          <ListItemText
                            primary={roleData.title}
                            className={classes.listItemText}
                            style={{color:"#1f1f21"}}
                          />
                          <ListItemSecondaryAction>
                            <GreenCheckbox
                              edge="end"
                              name={roleData.title}
                              tabIndex={-1}
                              onChange={(e) =>
                                handleCheckbox(e, roleData.roleName)
                              }
                              checked={access.indexOf(roleData.roleName) > -1}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider className={classes.divider} style={{backgroundColor:"#ced4da",marginLeft:'-1px',height:"0.5px"}} />
                      </React.Fragment>
                    );
                  })}
                {/* {accessValue.map((item,index) => (
                  
                ))} */}
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
                {type === "edit" ? "Update" : "Save"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster
        open={toaster}
        handleClose={setToaster}
        option={toasterOption.varient}
        message={toasterOption.message}
      />
    </div>
  );
}
