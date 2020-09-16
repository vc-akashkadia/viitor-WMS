import { getUrl } from "../services/network/urls";
import { get, post } from "../services/network/requests";
import { FacilityList, selectFacility,userRoles } from "../actions/actions";

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
          code: err.response.status,
        };
        callback(response);
      });
  };
};

export const selectedFacility = (facility, authToken, callback) => {
  let url = getUrl("facilityCheck");
  let querystring = `?facility_id=${facility}`;
  url = url + querystring
  return (dispatch) => {
    get(url, authToken)
      .then((response) => {
        const {
          data: { status, data },
        } = response;
        
        dispatch(selectFacility(facility));
        console.log(data)
        dispatch(userRoles(data))
        callback(response);
      })
      .catch((err) => {
        console.log("error", err);
        let responseNew = {
          data: {
            status: false,
            // code: err.response.status,
          },
        };
        dispatch(selectFacility(facility));
        callback(responseNew);
      });
  };
};
