import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
// import { LayoutSplashScreen } from "../theme/layouts";
import { logout } from "../../actions/authActions";

export default function Logout(props) {
  const dispatch = useDispatch();

  const logoutAction = () => {
    dispatch(logout());
  };
  useEffect(logoutAction, []);

  return <Redirect to="/login" />;
}
