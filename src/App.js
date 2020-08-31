import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import theme from "@config/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import Login from "./pages/Auth/Login"
import "./App.css";

const history = createBrowserHistory();

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <Switch>
        <Route exact path="/login" component={Login}  />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
