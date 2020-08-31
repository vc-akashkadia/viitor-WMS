import React from "react";
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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginTop:"15px"
  },
  listItemsChild: {
    marginBottom: 20,
  },
  cardContent:{
    paddingBottom:"5px",
    marginTop:"25px"
  }
}));

export default function Login() {
  const classes = useStyles();
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
              width: "59%",
              marginLeft: "48px",
              marginTop: "10px",
            }}
          />
        </Link>
      </div>

      <Card className={classes.root}>
        <CardContent >
          <form>
            <Grid item xs={12} className={classes.listItemsChild}>
              <TextField
                id="filled-basic"
                label="User Name"
                variant="filled"
                size="small"
              />
            </Grid>
            <Grid item xs={12} className={classes.listItemsChild}>
              <TextField
                type="password"
                id="filled-basic"
                label="Password"
                variant="filled"
                size="small"
              />
            </Grid>

            <Grid item xs={12} className={classes.listItemsChild}>
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
            <Grid item xs={12} className={classes.listItemsChild} >
              <Button variant="contained" color="primary" size="small" style={{width:"208px"}}>
                Sign in
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
