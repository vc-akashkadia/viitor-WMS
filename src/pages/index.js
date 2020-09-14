import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import Facility from "./Facility";
import Operations from "./Operations";
// import YardOperation from "./yarn/YarnOperation"
import PositionUpdate from "./PositionUpdate";
import YardOperations from "./yard/YardOperation";
import GateMovePage from "./GateMove/GateMovePage";
import LocationPrint from "../components/print/LocationPrint";
import EIRPrint from "../components/print/EIRPrint";
import UserList from "./UserAccess/UserList";
export default function BasePage() {
  return (
    <Switch>
      {
        //  Redirect from root URL to /facility.
        <Redirect exact from="/" to="/facility" />
      }

      <Route key="facility" exact path="/facility" component={Facility} />
      <Route key="operations" exact path="/operations" component={Operations} />
      <Route
        key="yard-operation"
        exact
        path="/yard/operation"
        component={YardOperations}
      />
      <Route
        key="position-update"
        exact
        path="/location/update"
        component={PositionUpdate}
      />
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
      {/* <Route exact path="/print" render={(props) => <PrintSample />} /> */}
      <Route
        exact
        path="/location/print"
        render={(props) => <LocationPrint />}
      />
      <Route exact path="/eir/print" render={(props) => <EIRPrint />} />
      <Route exact path="/position" component={PositionUpdate} />
      <Route exact path="/user" component={UserList} />
      <Redirect to="/error"/>
    </Switch>
  );
}
