import React, { useMemo } from "react";
import objectPath from "object-path";
import { Link } from "react-router-dom";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { Topbar } from "./Topbar";
import { toAbsoluteUrl } from "../../../helpers";
import { AnimateLoading } from "@utilities";
import brandLogo from '../../../assets/image/logo-resize.png';

export function Header() {
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      headerClasses: uiService.getClasses("header", true),
      headerAttributes: uiService.getAttributes("header"),
      headerContainerClasses: uiService.getClasses("header_container", true),
      menuHeaderDisplay: objectPath.get(
        uiService.config,
        "header.menu.self.display"
      ),
      disabledAsideSelfDisplay:
        objectPath.get(uiService.config, "aside.self.display") === false,
    };
  }, [uiService]);

  const getHeaderLogo = () => {
    let result = "logo-light.png";
    if (layoutProps.headerSelfTheme && layoutProps.headerSelfTheme !== "dark") {
      result = "logo-dark.png";
    }
    return toAbsoluteUrl(`/media/logos/${result}`);
  };

  return (
    <>
      {/*begin::Header*/}
      <div
        className={`header ${layoutProps.headerClasses}`}
        id="kt_header"
        {...layoutProps.headerAttributes}
      >
        {/*begin::Container*/}

        <div
          className={` ${layoutProps.headerContainerClasses} d-flex align-items-stretch justify-content-between`}
        >
          <AnimateLoading />
          {layoutProps.menuHeaderDisplay ? (
            <div
              className="header-menu-wrapper header-menu-wrapper-left"
              id="kt_header_menu_wrapper"
            >
              {layoutProps.disabledAsideSelfDisplay && (
                <>
                  {/*begin::Header Logo*/}
                  <div className="header-logo">
                    <Link to="/">
                      <img alt="logo" src={getHeaderLogo()} />
                    </Link>
                  </div>
                  {/*end::Header Logo*/}
                </>
              )}
              {/*begin::Header Menu*/}
              {/* <HeaderMenu layoutProps={layoutProps} /> */}
              {/*end::Header Menu*/}
              <Link to="/" className="brand-logo">
                <img src={brandLogo} alt="Logo" style={{display:'block',height:'100%',width:'100%',objectFit:'contain'}} />
              </Link>
            </div>
          ) : (
            <div />
          )}
          {/*begin::Topbar*/}
          <Topbar />
          {/*end::Topbar*/}
        </div>
        {/*end::Container*/}
      </div>
      {/*end::Header*/}
    </>
  );
}
