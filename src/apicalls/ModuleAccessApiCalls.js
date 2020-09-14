import { getUrl } from "../services/network/urls";
import { post, get } from "../services/network/requests";
import {
  ContainerListForLocation,
  userList,
  userRoleList,
} from "../actions/actions";

export const AddRoleApi = (data, authtoken, callback) => {
  let url = getUrl("addUser");
  return (dispatch) => {
    post(url, data, authtoken)
      .then((response) => {
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
        callback(responseNew);
      });
  };
};

export const EditRoleApi = (data, authtoken, callback) => {
  let url = getUrl("editUser");
  return (dispatch) => {
    post(url, data, authtoken)
      .then((response) => {
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
        callback(responseNew);
      });
  };
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
          
          dispatch(userList(data));
        }
        callback(response);
      })
      .catch((err) => {
        console.log("error", err);
        let response = {
         data : { status: false,}
          
        };
        callback(response);
      });
  };
};
export const getUserRoleList = (authToken, callback) => {
  let url = getUrl("userRolelist");
  // let querystring = `?containerNumber=${data.containerNumber}&facilityName=${data.facility}`;
  // url = url + querystring;
  return (dispatch) => {
    get(url, authToken)
      .then((response) => {
        const {
          data: { status, data },
        } = response;
        if (status) {
          
          dispatch(userRoleList(data));
        }
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

        callback(responseNew);
      });
  };
};

export const getContainerListForLocationUpdate = (
  data,
  authToken,
  callback
) => {
  let url = getUrl("locationUpdateGetApi");
  let querystring = `?containerNumber=${data.containerNumber}&facilityName=${data.facility}`;
  if (data.blockNumber !== "" && data.blockNumber !== undefined) {
    querystring = querystring + `&blockNumber=${data.blockNumber}`;
  }
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

export const LocationUpdatePost = (data, authtoken, callback) => {
  let url = getUrl("locationUpdatePost");
  return (dispatch) => {
    post(url, data, authtoken)
      .then((response) => {
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
        callback(responseNew);
      });
  };
};
