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
import { useDispatch } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

import { LoginApi } from "../../apicalls/authCall";
let toasterOption = {
  option: "error",
  message: "Invalid Login",
};

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

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember_me, setCheckbox] = useState(false);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    let error = { email: "", password: "" };
    if (email === "") {
      error.email = "User Name is required";
    }
    if (password === "") {
      error.password = "Password is required";
    }
    setErrors(error);
    if (email !== "" && password !== "") {
      setLoading(true);
      let data = {
        username: email,
        password: password,
      };
      dispatch(LoginApi(data,remember_me, handleCallback));
    }
  };

  const handleCallback = (response) => {
    const {
      data: { status },
    } = response;
    if (status) {
      toasterOption = {
        option: "success",
        message: "Login Successfull",
      };
      
    }
    setAlert(true);
    setLoading(false);
  };
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
          {alert && (
            <Alert severity={toasterOption.option}>
              {toasterOption.message}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Grid item xs={12} className={classes.listItemsChild}>
              <TextField
                error={errors.email !== ""}
                id="username"
                label="User Name"
                variant="outlined"
                size="small"
                value={email}
                helperText={errors.email}
                onInput={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} className={classes.listItemsChild}>
              <TextField
               error={errors.password !== ""}
                type="password"
                id="password"
                label="Password"
                variant="outlined"
                size="small"
                value={password}
                helperText={errors.password}
                onInput={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Checkbox
                className={classes.checkBox}
                color="primary"
                name="rememberme"
                id="rememberme"
                onClick={(e) => setCheckbox(e.target.checked)}
              />
              <Typography
                variant="body1"
                component="span"
                className={classes.rememberText}
                htmlFor="rememberme"
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
                disabled={loading}
              >
                Sign in {loading && <CircularProgress size={24} />}
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
