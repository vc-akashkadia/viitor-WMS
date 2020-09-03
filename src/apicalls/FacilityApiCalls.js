import { getUrl } from "../services/network/urls";
import { get } from "../services/network/requests";
import { FacilityList, selectFacility } from "../actions/actions";

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
      });
  };
};

export const selectedFacility = (facility) => {
  return (dispatch) => {
    dispatch(selectFacility(facility));
  };
};
