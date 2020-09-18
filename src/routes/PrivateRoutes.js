import React from "react";
import { Route, Redirect } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";

export default function PrivateRoute({
  component: Component,
  gateType,
  userAccess,
  roles,
  ...rest
}) {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      //isAuthorized: true,
    }),
    shallowEqual
  );
  const userRoles = useSelector(({ auth }) => auth.userRole);
  const isAdmin = useSelector(({ auth }) => auth.user.isAdmin);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthorized) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
        // check if route is restricted by role
        if (
          (roles && userRoles.length > 0 && userRoles.indexOf(roles) === -1) ||
          (userAccess && !isAdmin)
        ) {
          // role not authorised so redirect to home page
          return <Redirect to={{ pathname: "/error" }} />;
        }

        // authorised so return component
        return <Component {...props} gateType={gateType} />;
      }}
    />
  );
}
