import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { Layout } from "../theme/layouts";
import MainMiddleSection from "../page/MainMiddleSection";
import { AuthPage } from "../page/AuthPage";
import Logout from "../page/Logout";
// import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";

export function Routes() {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: false//(auth.user != null),
    }),
    shallowEqual
  );
  console.log(isAuthorized)
  return (
    <Switch>
      {!isAuthorized ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route path="/login" component={AuthPage} />
      ) : (
        /*Otherwise redirect to root page (`/`)*/
        <Redirect from="/login" to="/" />
      )}

      {/* <Route path="/error" component={ErrorsPage} />*/}
      <Route path="/logout" component={Logout} />

      {!isAuthorized ? (
        /*Redirect to `/auth` when user is not authorized*/
        <Redirect to="/login" />
      ) : (
        <>
          <Layout>
            <MainMiddleSection />
          </Layout>
        </>
      )}
    </Switch>
  );
}
