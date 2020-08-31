import React from "react";
import { Link } from "react-router-dom";
import {  useMediaQuery } from "../theme/helpers";
// import Login from "../container/Auth/LoginContainer";
import Login from "../components/Auth/NewLogin";
import brandLogo from '../theme/assets/image/logo-new.png';
export function AuthPage() {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
          id="kt_login"
        >
          {/*begin::Aside*/}
          <div
            className={
              "login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat  p-lg-10 " +
              (isMobile ? "pt-2 pr-10 pl-10 pb-0 " : "p-10")
            }
          >
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              {/* start:: Aside header */}
              <Link to="/" className="flex-column-auto mt-3">
                <img
                  alt="Logo"
                  className={isMobile ? "max-h-70px" : "max-h-80px "}
                  src={brandLogo}
                />
              </Link>
            </div>
          </div>
          {/*begin::Aside*/}

          {/*begin::Content*/}
          <div
            className={
              "flex-row-fluid d-flex flex-column position-relative overflow-hidden " +
              (isMobile ? "" : "p-7 ")
            }
          >
            {/* begin::Content body */}
            <br />
            <div className="d-flex flex-column-fluid flex-center mt-lg-0">
              <Login />
            </div>
            {/*end::Content body*/}
          </div>
        </div>
      </div>
    </>
  );
}
