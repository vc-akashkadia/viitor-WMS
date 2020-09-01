import React, { useState } from "react";
import { Link } from "react-router-dom";
import brandLogo from "@assests/img/logo.png";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { LoginApi } from "../../apicalls/authCall";
import {  useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 240,
    marginTop:"15px"
  },
  listItemsChild: {
    marginBottom: 20,
  },
  cardContent: {
    paddingBottom: "5px",
    marginTop: "25px",
  },
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
            style={{
              display: "block",
              height: "100%",
              width: "56%",
              marginLeft: "52px",
              marginTop: "10px",
            }}
          />
        </Link>
      </div>

      <Card className={classes.root}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid item xs={12} className={classes.listItemsChild}>
              <TextField
                id="filled-basic"
                label="User Name"
                variant="filled"
                size="small"
                value={email}
                onInput={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} className={classes.listItemsChild}>
              <TextField
                type="password"
                id="filled-basic"
                label="Password"
                variant="filled"
                size="small"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Checkbox
                className={classes.checkBox}
                color="primary"
                name="rememberme"
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
                color="primary"
                size="small"
                style={{ width: "208px" }}
              >
                Sign in
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
