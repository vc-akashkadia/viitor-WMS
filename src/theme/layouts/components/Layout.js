import React, { useMemo } from "react";
import { useHtmlClassService } from "../_core/MetronicLayout";
import objectPath from "object-path";
import { HeaderMobile } from "./header/HeaderMobile";
import { Header } from "./header/Header";
import QuickUser from "../components/QuickUser";
import LayoutInit from "../components/LayoutInit";
export function Layout({ children }) {
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      layoutConfig: uiService.config,
      selfLayout: objectPath.get(uiService.config, "self.layout"),
      asideDisplay: objectPath.get(uiService.config, "aside.self.display"),
      subheaderDisplay: objectPath.get(uiService.config, "subheader.display"),
      desktopHeaderDisplay: objectPath.get(
        uiService.config,
        "header.self.fixed.desktop"
      ),
      contentCssClasses: uiService.getClasses("content", true),
      contentContainerClasses: uiService.getClasses("content_container", true),
      contentExtended: objectPath.get(uiService.config, "content.extended"),
    };
  }, [uiService]);
  return layoutProps.selfLayout !== "blank" ? (
    <>
      <HeaderMobile />
      <div className="d-flex flex-column flex-root">
        {/*begin::Page*/}
        <div className="d-flex flex-row flex-column-fluid page">
          <div
            className="d-flex flex-column flex-row-fluid wrapper"
            id="kt_wrapper"
          >
            <Header />
            <div
              id="kt_content"
              className={`content ${layoutProps.contentCssClasses} d-flex flex-column flex-column-fluid`}
            >
              {/* {layoutProps.subheaderDisplay && <SubHeader />} */}
              {!layoutProps.contentExtended && (
                <div className="d-flex flex-column-fluid">
                  {/*begin::Container*/}
                  <div className={layoutProps.contentContainerClasses}>
                    {children}
                  </div>
                  {/*end::Container*/}
                </div>
              )}
              {layoutProps.contentExtended && { children }}
            </div>
          </div>
        </div>
      </div>
      <QuickUser />
      <LayoutInit />
    </>
  ) : (
    // BLANK LAYOUT
    <div className="d-flex flex-column flex-root">{children}</div>
  );
}
