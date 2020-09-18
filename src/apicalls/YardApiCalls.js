import { getUrl } from "../services/network/urls";
import { post, get } from "../services/network/requests";
import {
  yardCraneList,
  selectYardCrane,
  blockList,
  YardContainerList,
  selectLocationcrane,
} from "../actions/actions";
import { logout } from "../actions/authActions";
export const GetYardCraneList = (facility, authToken, callback) => {
  let url = getUrl("craneList") + `?facility_id=${facility}`;
  return (dispatch) => {
    get(url, authToken)
      .then((response) => {
        const {
          data: { status, data },
        } = response;
        if (status) {
          let yardCraneListObject = data.craneNumberList.map((code) => ({
            value: code.craneNumber,
            label: code.craneNumber,
          }));
          dispatch(yardCraneList(yardCraneListObject));
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

export const selectYardCraneApi = (yardCrane) => {
  return (dispatch) => {
    dispatch(selectYardCrane(yardCrane));
  };
};

export const selectLocationCraneApi = (yardCrane) => {
  return (dispatch) => {
    dispatch(selectLocationcrane(yardCrane));
  };
};

export const getBlockListApiCall = (facility, authToken, callback) => {
  let url = getUrl("yardBlockList") + `?facility_id=${facility}`;
  return (dispatch) => {
    get(url, authToken)
      .then((response) => {
        const {
          data: { status, data },
        } = response;
        if (status) {
          let yardCraneListObject = data.yardBlockList.map((code) => ({
            value: code.area,
            label: code.area,
          }));
          dispatch(blockList(yardCraneListObject));
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

export const getYardOperationApiCall = (data, authToken, callback) => {
  let url = getUrl("yardContainerList");
  let querystring = `?facility_id=${data.facility_id}`;
  if (data.gatetype !== "" && data.gatetype !== undefined) {
    querystring = querystring + `&containerStatus=${data.gatetype}`;
  } else {
    querystring = querystring + `&containerStatus=ALL`;
  }

  if (data.blockNumber !== "" && data.blockNumber !== undefined) {
    querystring = querystring + `&blockNumber=${data.blockNumber}`;
  }

  if (data.vehical === "truck") {
    querystring = querystring + `&truckNumber=${data.number}`;
  }
  if (data.vehical === "container") {
    querystring = querystring + `&containerNumber=${data.number}`;
  }
  url = url + querystring;
  return (dispatch) => {
    get(url, authToken)
      .then((response) => {
        const {
          data: { status, data },
        } = response;
        if (status) {
          let yardList = data !== null ? data.yardContainerList : [];
          dispatch(YardContainerList(yardList));
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

export const AddPickUpApiCall = (data, authToken, callback) => {
  let url = getUrl("pickupConfirm");
  return (dispatch) => {
    post(url, data, authToken)
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

export const GroundingContianerApiCall = (data, authToken, callback) => {
  let url = getUrl("groundingAddapi");
  return (dispatch) => {
    post(url, data, authToken)
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

export const getRefreshYardContainer = (data, authToken, callback) => {
  let url = getUrl("refreshYardContainer");
  let querystring = `?facility_id=${data.facility_id}`;
  if (data.operationtype !== undefined) {
    querystring = querystring + `&operationtype=${data.operationtype}`;
  }

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
            // code: err.response.status,
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
