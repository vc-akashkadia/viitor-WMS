import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen } from "../theme/layouts";
// import { BuilderPage } from "./pages/BuilderPage";
// import { MyPage } from "./pages/MyPage";
const FacilityPage = lazy(() => import("../container/FacilityContainer"));

const OperationsPage = lazy(() => import("../container/OperationsContainer"));
const GateMovePage = lazy(() =>
  import("../container/GateMove/GateMoveContainer")
);
const DamageContainer = lazy(() =>
  import("../container/GateMove/DamageContainer")
);
const YardCranePage = lazy(() =>
  import("../container/YardContainer/YardContainer")
);
const YardJobOptionPage = lazy(() =>
  import("../container/YardContainer/YarJobOptionContainer")
);
const YardOperationPage = lazy(() =>
  import("../container/YardContainer/YardOperation")
);
const ModuleAccessPage = lazy(() =>
  import("../container/ModuleAccess/ModuleAccessContainer")
);
const ModuleAccessAddUserPage = lazy(() =>
  import("../container/ModuleAccess/ModuleAccessAddUserContainer")
);
const GroundContainer = lazy(() =>
  import("../container/YardContainer/GroundContainer")
);
const LocationUpdatePage = lazy(() =>
  import("../container/YardContainer/LocationUpdatePage")
);

export default function MainMiddleSection() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/facility" />
        }
        
        <Route exact path="/facility" component={FacilityPage} />
        <Route exact path="/operations" component={OperationsPage} />
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
          path="/container-damage/:container_id"
          component={DamageContainer}
        />
        <Route exact path="/yard/crane" component={YardCranePage} />
        <Route exact path="/yard/option" component={YardJobOptionPage} />
        <Route exact path="/yard/operation" component={YardOperationPage} />
        <Route exact path="/module-access" component={ModuleAccessPage} />
        <Route
          exact
          path="/module-access/add-user"
          component={ModuleAccessAddUserPage}
        />
        <Route
          exact
          path="/yard/ground/container"
          component={GroundContainer}
        />
        <Route
          exact
          path="/location-update"
          component={LocationUpdatePage}
        />

        {/* <ContentRoute path="/dashboard" component={DashboardPage} /> */}
        {/* <ContentRoute path="/builder" component={BuilderPage} />
                <ContentRoute path="/my-page" component={MyPage} />
                <Route path="/google-material" component={GoogleMaterialPage} />
                <Route path="/react-bootstrap" component={ReactBootstrapPage} />
                <Route path="/e-commerce" component={ECommercePage} /> */}
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
