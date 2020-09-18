import React from "react";
import { Link } from "react-router-dom";
import brandLogo from "@assests/img/logo-new.svg";
import bottomImage from "@assests/img/pattern.svg";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "500px",
    margin: "0 10px",
    position: "relative",
    "@media (min-width:241px)": {
      paddingBottom: 40,
      margin: "auto",
    },
    "@media (min-width:768px)": {
      paddingBottom: 100,
      margin: "auto",
    },
  },
  logo: {
    display: "block",
    height: "100%",
    width: 100,
    margin: "10px auto",
  },
  listItemsChild: {
    display: "block",
    margin: "5px auto",
    textAlign: "center",
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
    minHeight: "250px",
  },
  label: {
    fontSize: 16,
    color: "#777777",
    fontWeight: 500,
    fontFamily: "Roboto",
    lineHeight: "16px",
    marginBottom: 5,
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
    width: "100%",
    left: 0,
    display: "block",
    padding: "0 10px",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: 195,
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <div>
        <Link to="/" className="brand-logo">
          <img src={brandLogo} alt="Logo" className={classes.logo} />
        </Link>
      </div>

      <Card className={classes.root}>
        <CardContent className={classes.card}>
          <div className={classes.loginForm}>
            <Grid item xs={12} className={classes.listItemsChild}>
              <Typography
                variant="h5"
                style={{ fontWeight: "500", color: "#000000" }}
              >
                404
              </Typography>
              <Typography
                variant="h5"
                style={{ fontWeight: "500", color: "#000000" }}
              >
                Page Not Found
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.listItemsChild}>
              <Button
                type="submit"
                variant="contained"
                size="small"
                className={classes.button}
                onClick={() => history.push("/")}
              >
                Back To Home
              </Button>
            </Grid>
          </div>
          <img src={bottomImage} alt="bottom" className={classes.bottomImage} />
        </CardContent>
      </Card>
    </>
  );
}
