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
import PrivateRoute from "../routes/PrivateRoutes";
import { constants } from "@config/constant";
import Reprint from "./Reprint"
export default function BasePage() {
  return (
    <Switch>
      {
        //  Redirect from root URL to /facility.
        <Redirect exact from="/" to="/facility" />
      }

      <Route key="facility" exact path="/facility" component={Facility} />
      <Route key="operations" exact path="/operations" component={Operations} />
      <PrivateRoute
        roles={constants.roles.ROLE_YARD}
        key="yard-operation"
        exact
        path="/yard/operation"
        component={YardOperations}
      />

      <PrivateRoute
        roles={constants.roles.ROLE_LOCATION_UPDATE}
        key="position-update"
        exact
        path="/location/update"
        component={PositionUpdate}
      />
      <PrivateRoute
        roles={constants.roles.ROLE_GATE}
        exact
        path="/gate/in"
        gateType="In"
        component={GateMovePage}
        // render={(props) => <GateMovePage {...props} gateType="In" />}
      />
      <PrivateRoute
        roles={constants.roles.ROLE_GATE}
        exact
        path="/gate/out"
        render={(props) => <GateMovePage {...props} gateType="Out" />}
      />
      <PrivateRoute
        roles={constants.roles.ROLE_GATE}
        exact
        path="/location/print"
        render={(props) => <LocationPrint />}
      />
      <PrivateRoute
        roles={constants.roles.ROLE_GATE}
        exact
        path="/eir/print"
        render={(props) => <EIRPrint />}
      />
      {/* <PrivateRoute
        roles={constants.roles.ROLE_LOCATION_UPDATE} exact path="/position" component={PositionUpdate} /> */}
      <PrivateRoute
        roles={constants.roles.ROLE_ADMIN}
        exact
        path="/user"
        component={UserList}
      />
      <PrivateRoute exact path="/reprint" component={Reprint} />
      <Redirect to="/error" />
    </Switch>
  );
}
