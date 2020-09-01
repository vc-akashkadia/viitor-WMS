import React, { useState } from "react";
import { Link } from "react-router-dom";
import brandLogo from "@assests/img/logo.png";
import bottomImage from "@assests/img/bottom.svg";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles,withStyles,fade } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputBase from '@material-ui/core/InputBase';
import InputLabel from "@material-ui/core/InputLabel";
import { LoginApi } from "../../apicalls/authCall";
import {  useDispatch } from "react-redux";
import clsx from 'clsx';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(2),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#eff0f3',
    border: 'none',
    fontSize: 13,
    fontFamily: "Roboto",
    fontWeight: 400,
    width: '100%',
    padding: '8px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginTop:"15px",
    position: "relative",
    paddingBottom: 12,
    "@media (min-width:241px)":{
      paddingBottom: 40
    },
    "@media (min-width:768px)":{
      paddingBottom: 140
    },
    "@media (min-width:1240px)":{
      paddingBottom: 220
    },
    "@media (min-width:1600px)":{
      paddingBottom: 300
    }
  },
  logo:{
    display: "block",
    height: "100%",
    width: "45%",
    margin: "10px auto",
  "@media (min-width:768px)":{
      width: "30%",
  }
  },
  listItemsChild: {
    marginBottom: 15,
  },
  cardContent: {
    paddingBottom: "5px",
    marginTop: "25px",
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
  },
  checkedIcon: {
    backgroundColor: '#007bff',
    '&:before': {
      display: 'block',
      width: 15,
      height: 15,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
  },
  paddingRemove: {
    paddingLeft: 0,
    paddingTop : 8
  },
  field:{
    display: "flex" 
  },
  card:{
    padding: 20
  },
  label :{
    fontSize: 14,
    color: "#707070",
    fontWeight: 500,
    fontFamily: "Roboto",
  },
  rememberText:{
    fontSize: 12,
    color: "#707070",
    fontWeight: 500,
    fontFamily: "Roboto"
  },
  button:{
    fontSize: 13,
    color: "#ffffff",
    fontWeight: 500,
    fontFamily: "Roboto",
    width: "100%",
    height: 30,
    backgroundColor: "#0c79c1",
    textTransform: "inherit"
  },
  bottomImage:{
    position: "absolute",
    bottom: 0,
    width: "100%",
    left: 0,
  }
}));
let errors = {
  email: "",
  password: "",
};
export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email, "Password: ", password);
    if (email !== "") {
      errors.email = "User Name is required";
    }
    if (password !== "") {
      errors.email = "Password is required";
    }
    let data = {
      username: email,
      password: password,
    };
    dispatch(LoginApi(data, handleCallback));
  };
  

  const handleCallback = (response) => {

  }
  return (
    <>
      <div>
        <Link to="/" className="brand-logo">
          <img
            src={brandLogo}
            alt="Logo"
            className= {classes.logo}
          />
        </Link>
      </div>

      <Card className={classes.root}>
        <CardContent className={classes.card}>
          <form onSubmit={handleSubmit}>
            <Grid item xs={12} className={classes.listItemsChild}>
            <FormControl className={classes.field}>
                <InputLabel shrink htmlFor="bootstrap-input" className={classes.label}>
                  User Name
                </InputLabel>
                <BootstrapInput placeholder="Enter User Name" id="bootstrap-input" />
              </FormControl>
            </Grid>
            <Grid item xs={12} className={classes.listItemsChild}>
              <FormControl className={classes.field}>
                <InputLabel shrink htmlFor="bootstrap-input" className={classes.label}>
                  Password
                </InputLabel>
                <BootstrapInput placeholder="Enter Password" id="bootstrap-input"/>
              </FormControl>
            </Grid>

            <Grid item xs={12} className={classes.listItemsChild} >
              <Checkbox                
                className={clsx(classes.checkBox, classes.paddingRemove)}
                color="primary"
                name="rememberme"
                icon={<span className={classes.icon} />}
                checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
              />
              <Typography
                variant="body1"
                component="span"
                className={classes.rememberText}
              >
                Remember Me
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.listItemsChild}>
              <Button 
                type="submit"
                variant="contained"
                size="small"
                className={classes.button}
              >
                Sign in
              </Button>
            </Grid>
          </form>
          <img
            src={bottomImage}
            alt="bottom-image"
            className= {classes.bottomImage}
          />
        </CardContent>
      </Card>
    </>
  );
}