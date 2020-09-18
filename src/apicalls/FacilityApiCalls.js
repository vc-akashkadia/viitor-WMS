import { getUrl } from "../services/network/urls";
import { get } from "../services/network/requests";
import { FacilityList, selectFacility, userRoles } from "../actions/actions";
import { logout } from "../actions/authActions";

export const facilityListApiCall = (authToken, callback) => {
  let url = getUrl("facilityList");
  return (dispatch) => {
    get(url, authToken)
      .then((response) => {
        const {
          data: { status, data },
        } = response;
        if (status) {
          let facilityListObject = data.facilityList.map((code) => ({
            value: code.facilityCode,
            label: code.facilityName,
          }));
          dispatch(FacilityList(facilityListObject));
        }
        callback(response);
      })
      .catch((err) => {
        console.log("error", err);
        let response = {
          status: false,
          code: err.response !== undefined ? err.response.status : "OK",
        };
        if (err.response !== undefined) {
          const {
            data: { code },
          } = err.response;
          if (code === "UNAUTHORIZED") {
            dispatch(logout());
          }
        }
        callback(response);
      });
  };
};

export const selectedFacility = (facility, authToken, callback) => {
  let url = getUrl("facilityCheck");
  let querystring = `?facility_id=${facility}`;
  url = url + querystring;
  return (dispatch) => {
    get(url, authToken)
      .then((response) => {
        const {
          data: { code, status, data },
        } = response;
        console.log(code);
        console.log(status);
        console.log(data);
        if (status) {
          dispatch(selectFacility(facility));
          dispatch(userRoles(data));
          callback(response);
        } else {
          if (code === "UNAUTHORIZED") {
            dispatch(logout());
          } else {
            callback(response);
          }
        }
      })
      .catch((err) => {
        console.log("error", err.response);
        let responseNew = {
          data: {
            status: false,
            code: err.response !== undefined ? err.response.status : "OK",
          },
        };
        if (err.response !== undefined) {
          const {
            data: { code },
          } = err.response;
          if (code === "UNAUTHORIZED") {
            dispatch(logout());
          }
        }
        dispatch(selectFacility(facility));
        callback(responseNew);
      });
  };
};
