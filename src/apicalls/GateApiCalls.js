import { getUrl } from "../services/network/urls";
import { post, get } from "../services/network/requests";
import {
  DamageCodeList,
  GateMoveContainerList,
  selectGateMoveOperationOption,
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
            text : code.damageCode+'-'+ (code.damageType === "1") ? 'Min' : 'Max' 
          }));
          dispatch(DamageCodeList(damageCodeList));
        }
        callback(response);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const getContainerListApi = (data, authToken, callback) => {
  let url = getUrl("gatemovecontainer");
  let querystring = `?facilityid=${data.facilityid}`
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

export const GateMoveContainerApi = (data,authToken,callback) => {
  let url = getUrl("gatemoveapi");
  return (dispatch) => {
    post(url,data, authToken).then((response) => {
      callback(response);
    });
  };
}
