import { getUrl } from "../services/network/urls";
import { post, get } from "../services/network/requests";
import {
  ContainerListForLocation
} from "../actions/actions";
export const AddRoleApi = (data, authtoken, callback) => {
  let url = getUrl("addRole");
  post(url, data, true)
    .then((response) => {
      callback(response);
    })
    .catch((err) => {
      console.log("err => ", err);
    });
};


export const getContainerListForLocationUpdate = (data, authToken, callback) => {
  let url = getUrl("damageCodeList");
  return (dispatch) => {
    get(url, authToken)
      .then((response) => {
        const {
          data: { status, data },
        } = response;
        if (status) {
          let damageCodeList = data.damageCodeList.map((code) => ({
            value: code.damageCode,
            label: code.damageDescription,
          }));
          dispatch(ContainerListForLocation(damageCodeList));
        }
        callback(response);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
}