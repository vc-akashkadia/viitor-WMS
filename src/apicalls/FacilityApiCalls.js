import { getUrl } from "../services/network/urls";
import { get,post } from "../services/network/requests";
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
      let response = {
        status : false,
        code : err.response.status
      }
      callback(response)
      });
  };
};

export const selectedFacility = (facility,authToken,callback) => {
  
    let url = getUrl("facilityCheck");
    let data = {
      facility_id : facility
    }
    return (dispatch) => {
      post(url, data, authToken)
        .then((response) => {
          callback(response);
          dispatch(selectFacility(facility));
        })
        .catch((err) => {
          console.log("error", err);
          let responseNew = {
            data: {
              status: false,
              // code: err.response.status,
            },
          };
          callback(responseNew);
        });
    };
  

  
};
