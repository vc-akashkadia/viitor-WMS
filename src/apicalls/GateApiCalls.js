import { getUrl } from "../services/network/urls";
import { post, get } from "../services/network/requests";
import {
  DamageCodeList,
  GateMoveContainerList,
  selectGateMoveOperationOption,
  GetLocationSlipDetail,
} from "../actions/actions";

export const DamageCodeListApi = (authToken, callback) => {
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
            text:
              code.damageCode + "-" + (code.damageType === "1") ? "Min" : "Max",
          }));
          dispatch(DamageCodeList(damageCodeList));
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

export const getContainerListApi = (data, authToken, callback) => {
  let url = getUrl("gatemovecontainer");
  let querystring = `?facilityid=${data.facilityid}`;
  if (data.operationtype !== undefined) {
    querystring = querystring + `&operationtype=${data.operationtype}`;
  }

  if (data.vehical === "truck") {
    querystring = querystring + `&trucknumber=${data.number}`;
  }
  if (data.vehical === "container") {
    querystring = querystring + `&containernumber=${data.number}`;
  }
  url = url + querystring;
  return (dispatch) => {
    get(url, authToken)
      .then((response) => {
        const {
          data: { status, data },
        } = response;
        if (status) {
          dispatch(GateMoveContainerList(data));
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

    dispatch(
      selectGateMoveOperationOption({
        vehical: data.vehical,
        number: data.number,
        gatetype: data.gatetype,
      })
    );
  };
};

export const gateMoveContainerApi = (data, authToken, callback) => {
  let url = getUrl("gatemoveapi");
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
        callback(responseNew);
      });
  };
};

export const LocationSlipApi = (callData, authToken, callback) => {
  let url = getUrl("locationSlipPrint");
  let querystring = `?shipmentId=${callData.shipmentId}&operationStatus=${callData.operationCode}`;
  url = url + querystring;
  return (dispatch) => {
    get(url, authToken)
      .then((response) => {
        const {
          data: { status, data },
        } = response;
        if (status) {
          dispatch(GetLocationSlipDetail(data));
        }
        callback(response, callData.printType);
      })
      .catch((err) => {
        console.log("error", err);
        let responseNew = {
          data: {
            status: false,
            // code: err.response.status,
          },
        };
        callback(responseNew, callData.printType);
      });
  };
};
export const EIRPrintApi = (callData, authToken, callback) => {
  let url = getUrl("EIRPrint");
  let querystring = `?container_number=${callData.containerNumber}&operation_type=${callData.operationCode}&facility_id=${callData.facility}`;
  url = url + querystring;
  return (dispatch) => {
    get(url, authToken)
      .then((response) => {
        const {
          data: { status, data },
        } = response;
        if (status) {
          dispatch(GetLocationSlipDetail(data));
        }
        callback(response, callData.printType);
      })
      .catch((err) => {
        console.log("error", err);
        let response = {
          data : { status: false,}
           
         };
        callback(response, callData.printType);
      });
  };
};

export const getRefreshContainer = (data, authToken, callback) => {
  let url = getUrl("refreshContainer");
  let querystring = `?facilityid=${data.facilityid}`;
  if (data.operationtype !== undefined) {
    querystring = querystring + `&operationtype=${data.operationtype}`;
  }

  if (data.vehical === "truck") {
    querystring = querystring + `&trucknumber=${data.number}`;
  }
  if (data.vehical === "container") {
    querystring = querystring + `&containernumber=${data.number}`;
  }
  url = url + querystring;
  return (dispatch) => {
    get(url, authToken)
      .then((response) => {
        const {
          data: { status, data },
        } = response;
        if (status) {
          dispatch(GateMoveContainerList(data));
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

    dispatch(
      selectGateMoveOperationOption({
        vehical: data.vehical,
        number: data.number,
        gatetype: data.gatetype,
      })
    );
  };
};
