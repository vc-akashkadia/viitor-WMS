import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import Login from "../pages/Auth/Login";
import Logout from "../pages/Auth/Logout";
import Facility from "../pages/Facility";
import Operations from "../pages/Operations";
// import YardOperation from "../pages/yarn/YarnOperation"
import PositionUpdate from "../pages/PositionUpdate"
import YardOperations from "../pages/yard/YardOperation";
import GateMovePage from "../pages/GateMove/GateMovePage";
import PrintSample from "../components/print/PrintSample";
import LocationPrint from "../components/print/LocationPrint";
import EIRPrint from "../components/print/EIRPrint";
import UserList from "../pages/UserAccess/UserList";

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
      {
        <Redirect exact from="/" to="/login" />
      }
      {!isAuthorized ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route path="/login" component={Login} />
      ) : (
        /*Otherwise redirect to root page (`/`)*/
        <Redirect from="/login" to="/facility" />
      )}
      <Route path="/logout" component={Logout} />
      {isAuthorized ? (
        <>
          
          <Route key="facility" exact path="/facility" component={Facility} />
          <Route key="operations" exact path="/operations" component={Operations} />
          <Route key="yard-operation" exact path="/yard/operation" component={YardOperations} />
          <Route key="position-update" exact path="/location/update" component={PositionUpdate} />
          <Route
            exact
            path="/new/gate/in"
            render={(props) => <GateMovePage {...props} gateType="In" />}
          />
          <Route
            exact
            path="/gate/in"
            render={(props) => <GateMovePage {...props} gateType="In" />}
          />
          <Route
            exact
            path="/gate/out"
            render={(props) => <GateMovePage {...props} gateType="Out" />}
          />
          <Route
            exact
            path="/new/gate/out"
            render={(props) => <GateMovePage {...props} gateType="Out" />}
          />
          <Route
            exact
            path="/print"
            render={(props) => <PrintSample  />}
          />
          <Route
            exact
            path="/location/print"
            render={(props) => <LocationPrint  />}
          />
          <Route
            exact
            path="/eir/print"
            render={(props) => <EIRPrint  />}
          />
          <Route
            exact
            path="/position"
            component={PositionUpdate}
          />
          <Route
            exact
            path="/user"
            component={UserList}
          />
          
        </>
      ) : (
        <Redirect to="/login" />
      )}

      {/* <Route path="/error" component={ErrorsPage} />*/}
      {/* <Route path="/logout" component={Logout} /> */}
    </Switch>
  );
}
