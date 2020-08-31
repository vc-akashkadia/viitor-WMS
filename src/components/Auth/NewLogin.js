import React from "react";
import Card from "@material-ui/core/Card";
// import CardActions from '@material-ui/core/CardActions';
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
    },
    listItemsChild: {
      marginBottom: 20,
    },
  }));

export default function NewLogin() {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
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
            <Grid item xs={12} className={classes.listItemsChild}>
              <Button variant="contained" color="primary">
                Sign in
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
