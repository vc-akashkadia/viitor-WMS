import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import objectPath from "object-path";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../helpers";
import brandLogo from '../../../assets/image/logo-resize.png';
export function HeaderMobile() {
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      headerLogo: uiService.getStickyLogo(),
      asideDisplay: objectPath.get(uiService.config, "aside.self.display"),
      headerMenuSelfDisplay:
        objectPath.get(uiService.config, "header.menu.self.display") === true,
      headerMobileCssClasses: uiService.getClasses("header_mobile", true),
      headerMobileAttributes: uiService.getAttributes("header_mobile"),
    };
  }, [uiService]);

  return (
    <>
      {/*begin::Header Mobile*/}
      <div
        id="kt_header_mobile"
        className={`header-mobile align-items-center ${layoutProps.headerMobileCssClasses}`}
        {...layoutProps.headerMobileAttributes}
      >
        {/*begin::Logo*/}
        <Link to="/" className="brand-logo">
          {/* <img alt="logo" src={layoutProps.headerLogo} /> */}
          {/* <h1>WMS Yard Application</h1> */}
          <img src={brandLogo} alt="Logo" style={{ display: 'block', height: '100%', width: '100%', objectFit: 'contain' }}/>
        </Link>
        {/*end::Logo*/}

        {/*begin::Toolbar*/}
        <div className="d-flex align-items-center">
          <button
            className="btn btn-hover-text-primary p-0 ml-2"
            id="kt_header_mobile_topbar_toggle"
          >
            <span className="svg-icon svg-icon-xl">
              <img
                alt="logo"
                style={{ width: "25px" }}
                src={toAbsoluteUrl("/media/users/300_21.jpg")}
              />
            </span>
          </button>
          {/*end::Topbar Mobile Toggle*/}
        </div>
        {/*end::Toolbar*/}
      </div>
      {/*end::Header Mobile*/}
    </>
  );
}
