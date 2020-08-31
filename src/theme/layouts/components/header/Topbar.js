import React, { useMemo } from "react";
import objectPath from "object-path";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHtmlClassService } from "../../_core/MetronicLayout";

export function Topbar() {
  const { user } = useSelector((state) => state.auth);
  const uiService = useHtmlClassService();
  const history = useHistory();

  const logoutClick = () => {
    history.push("/logout");
  };

  const layoutProps = useMemo(() => {
    return {
      viewUserDisplay: objectPath.get(uiService.config, "extras.user.display"),
      offcanvas:
        objectPath.get(uiService.config, "extras.user.layout") === "offcanvas",
      light:
        objectPath.get(uiService.config, "extras.user.dropdown.style") ===
        "light",
    };
  }, [uiService]);
  console.log(layoutProps.offcanvas);
  return (
    <div className="topbar">
      {layoutProps.viewUserDisplay && (
        <>
          {layoutProps.offcanvas && (
            // <OverlayTrigger
            //   placement="bottom"
            //   overlay={<Tooltip id="quick-user-tooltip">View user</Tooltip>}
            // >
              <div className="topbar-item">
                <div
                  className="btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-0"
                  id="kt_quick_user_toggle"
                >
                  <>
                    <span className="text-muted font-weight-bold font-size-base d-block d-md-inline mr-1">
                      Hi,
                    </span>
                    <span className="text-dark-50 font-weight-bolder font-size-base d-block d-md-inline mr-3">
                      {user && user.fullname}
                      {/* Admin */}
                    </span>
                    <span className="symbol symbol-35 symbol-light-success d-none">
                      <span className="symbol-label font-size-h5 font-weight-bold">
                        {user && user.fullname && user.fullname[0]}
                      </span>
                    </span>
                  </>
                </div>
                <div className="logout-btn" onClick={logoutClick}>
                  <IconButton color="primary" aria-label="Logout" component="span">
                    <ExitToAppIcon />
                  </IconButton>
                </div>
              </div>
            // </OverlayTrigger>
          )}

        </>
      )}
    </div>
  );
}
