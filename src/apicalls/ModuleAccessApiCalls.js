import { getUrl } from "../services/network/urls";
import { post, get } from "../services/network/requests";
import {
  ContainerListForLocation,
  userList
} from "../actions/actions";

export const AddRoleApi = (data, authtoken, callback) => {
  let url = getUrl("addRole");
  return (dispatch) => { post(url, data, authtoken)
    .then((response) => {
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

export const EditRoleApi = (data, authtoken, callback) => {
  let url = getUrl("addRole");
  return (dispatch) => {  post(url, data, authtoken)
    .then((response) => {
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
  }
};

export const getUserList = (data, authToken, callback) => {
  let url = getUrl("userlist");
  // let querystring = `?containerNumber=${data.containerNumber}&facilityName=${data.facility}`;
  // url = url + querystring;
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
          dispatch(userList(damageCodeList));
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
}

export const getContainerListForLocationUpdate = (data, authToken, callback) => {
  let url = getUrl("locationUpdateGetApi");
  let querystring = `?containerNumber=${data.containerNumber}&facilityName=${data.facility}`;
  url = url + querystring;
  return (dispatch) => {
    get(url, authToken)
      .then((response) => {
        const {
          data: { status, data },
        } = response;
        if (status) {
          dispatch(ContainerListForLocation(data));
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
}

export const LocationUpdatePost = (data, authtoken, callback) => {
  let url = getUrl("addRole");
  return (dispatch) => {post(url, data, authtoken)
    .then((response) => {
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
