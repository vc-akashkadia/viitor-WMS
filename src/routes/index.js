import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard";
export function Routes() {
    const { isAuthorized } = useSelector(
      ({ auth }) => ({
        isAuthorized: (auth.user != null),
      }),
      shallowEqual
    );
    
    return (
      <Switch>
        {!isAuthorized ? (
          /*Render auth page when user at `/auth` and not authorized.*/
          <Route path="/login" component={Login} />,
          <Route path="/dashboard" component={Dashboard} />
        ) : (
          /*Otherwise redirect to root page (`/`)*/
          <Redirect from="/login" to="/" />
        )}
  
        {/* <Route path="/error" component={ErrorsPage} />*/}
        {/* <Route path="/logout" component={Logout} /> */}
  
      </Switch>
    );
  }
  