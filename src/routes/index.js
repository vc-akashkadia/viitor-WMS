import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import Login from "../pages/Auth/Login";
import YardOperation from "../pages/yard/YardOperation"
import Facility from "../pages/Facility";
import Operations from "../pages/Operations";
import Dashboard from '../pages/Dashboard';
import Popup from "../components/popup";
import PositionUpdate from "../pages/PositionUpdate"
export function Routes() {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      // isAuthorized: auth.user != null,
      isAuthorized: true,
    }),
    shallowEqual
  );

  return (
    <Switch>
      {!isAuthorized ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route path="/login" component={Login} />
      ) : (
        /*Otherwise redirect to root page (`/`)*/
        <Redirect from="/login" to="/facility" />
      )}
      {isAuthorized ? (
        <>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/yard/operation" component={YardOperation} />
          <Route exact path="/facility" component={Facility} />
          <Route exact path="/operations" component={Operations} />
          <Route exact path="/position/update" component={PositionUpdate} />
          <Route exact path="/components" component={Popup} />
        </>
      ) : (
        <Redirect to="/login" />
      )}

      {/* <Route path="/error" component={ErrorsPage} />*/}
      {/* <Route path="/logout" component={Logout} /> */}
    </Switch>
  );
}
