import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import Login from "../pages/Auth/Login";
import Logout from "../pages/Auth/Logout";
import BasePage from "../pages"
import ErrorsPage from "../pages/error/index"
export function Routes() {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      //isAuthorized: true,
    }),
    shallowEqual
  );

  return (
    <Switch>
      {<Redirect exact from="/" to="/login" />}
      {!isAuthorized ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route path="/login" component={Login} />
      ) : (
        /*Otherwise redirect to root page (`/`)*/
        <Redirect from="/login" to="/facility" />
      )}
      <Route path="/logout" component={Logout} />
      <Route path="/error" component={ErrorsPage} />
      {isAuthorized ? (
        <>
        <BasePage />
        </>
      ) : (
        <Redirect to="/login" />
      )}

      
      
    </Switch>
  );
}
