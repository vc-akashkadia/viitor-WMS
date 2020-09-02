import React, { useState } from "react";
import { Link } from "react-router-dom";
import brandLogo from "@assests/img/logo-new.svg";
import bottomImage from "@assests/img/pattern.svg";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, withStyles, fade } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import { LoginApi } from "../../apicalls/authCall";
import { useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";
import Alert from "@material-ui/lab/Alert";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(2),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#eff0f3",
    border: "none",
    fontSize: 13,
    fontFamily: "Roboto",
    fontWeight: 400,
    width: "100%",
    padding: "8px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "500px",
    marginTop: "15px",
    margin: "auto",
    position: "relative",
    paddingBottom: 12,
    "@media (min-width:241px)": {
      paddingBottom: 40,
    },
    "@media (min-width:768px)": {
      paddingBottom: 100,
    },
  },
  logo: {
    display: "block",
    height: "100%",
    width: 100,
    margin: "10px auto",
  },
  listItemsChild: {
    marginBottom: 10,
  },
  cardContent: {
    paddingBottom: "5px",
    marginTop: "25px",
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
  },
  checkedIcon: {
    backgroundColor: "#007bff",
    "&:before": {
      display: "block",
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
    paddingTop: 8,
  },
  field: {
    display: "flex",
  },
  card: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: "#707070",
    fontWeight: 500,
    fontFamily: "Roboto",
    lineHeight: '16px',
    marginBottom: 5
  },
  rememberText: {
    fontSize: 12,
    color: "#707070",
    fontWeight: 500,
    fontFamily: "Roboto",
  },
  button: {
    fontSize: 13,
    color: "#ffffff",
    fontWeight: 500,
    fontFamily: "Roboto",
    width: "100%",
    height: 30,
    backgroundColor: "#0c79c1",
    textTransform: "inherit",
  },
  bottomImage: {
    position: "absolute",
    bottom: 0,
    maxWidth: "100%",
    left: 0,
    display: 'block',
    right: 0,
    margin: '0 auto'
  },
}));
// let errors = {
//   email: "",
//   password: "",
// };
let toasterOption = {
  option: "error",
  message: "Invalid Login",
};

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember_me, setCheckbox] = useState(false);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
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
      dispatch(LoginApi(data, remember_me, handleCallback));
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
console.log("email",errors.email)
// console.log("Passoww",password)

  return (
    <>
      <div>
        <Link to="/" className="brand-logo">
          <img src={brandLogo} alt="Logo" className={classes.logo} />
        </Link>
      </div>

      <Card className={classes.root}>
        <CardContent className={classes.card}>
        {alert && (
            <Alert severity={toasterOption.option}>
              {toasterOption.message}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Grid item xs={12} className={classes.listItemsChild}>
              {/* <FormControl className={classes.field}> */}
                <InputLabel
                  shrink
                  htmlFor="bootstrap-input"
                  className={classes.label}
                >
                  User Name
                </InputLabel>
                {/* <BootstrapInput
                  error
                  id="username"
                  placeholder="Enter User Name"
                  helperText={errors.email}
                  value={email}
                  onInput={(e) => setEmail(e.target.value)}
                /> */}
                <TextField 
                error={errors.email !== ""}
                  id="username" 
                  label=""
                  variant="outlined"
                  placeholder="Enter User Name"
                  helperText={errors.email}
                  value={email}
                  onInput={(e) => setEmail(e.target.value)}
                  style={{width: '100%'}}
                  />
              {/* </FormControl> */}
            </Grid>
            <Grid item xs={12} className={classes.listItemsChild}>
                <InputLabel
                  shrink
                  htmlFor="bootstrap-input"
                  className={classes.label}
                >
                  Password
                </InputLabel>
                 <TextField 
                  error={errors.password !== ""}
                  type="password"
                  variant="outlined"
                  id="password"
                  helperText={errors.password}
                  onInput={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  style={{width: '100%'}}
                  />
            </Grid>

            <Grid item xs={12} className={classes.listItemsChild}>
              <Checkbox
                className={clsx(classes.checkBox, classes.paddingRemove)}
                color="primary"
                name="rememberme"
                icon={<span className={classes.icon} />}
                checkedIcon={
                  <span className={clsx(classes.icon, classes.checkedIcon)} />
                }
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
                disabled={loading}
              >
                Sign in {loading && <CircularProgress size={24} />}
              </Button>
            </Grid>
          </form>
          <img
            src={bottomImage}
            alt="bottom-image"
            className={classes.bottomImage}
          />
        </CardContent>
      </Card>
    </>
  );
}
