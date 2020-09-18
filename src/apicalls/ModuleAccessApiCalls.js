import { getUrl } from "../services/network/urls";
import { post, get } from "../services/network/requests";
import {
  ContainerListForLocation,
  userList,
  userRoleList,
} from "../actions/actions";
import { logout } from "../actions/authActions";
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
        callback(responseNew);
      });
  };
};

export const getUserList = (data, authToken, callback) => {
  let url = getUrl("userlist");
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
        callback(response);
      });
  };
};
export const getUserRoleList = (authToken, callback) => {
  let url = getUrl("userRolelist");
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
  let querystring = `?containerNumber=${data.containerNumber}&facility_id=${data.facility_id}`;
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
        callback(responseNew);
      });
  };
};

export const getRefreshLocationUpdateContainer = (
  data,
  authToken,
  callback
) => {
  let url = getUrl("refreshLocationUpdate");
  let querystring = `?facility_id=${data.facility_id}`;
  url = url + querystring;
  return (dispatch) => {
    get(url, authToken)
      .then((response) => {
        callback(response);
      })
      .catch((err) => {
        console.log("error", err);
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
        callback(responseNew);
      });
  };
};
