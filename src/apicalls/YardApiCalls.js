import { getUrl } from "../services/network/urls";
import { post, get } from "../services/network/requests";
import { yardCraneList, selectYardCrane,blockList,YardContainerList,selectLocationcrane } from "../actions/actions";

export const GetYardCraneList = (facility, authToken, callback) => {
  let url = getUrl("craneList") + facility;
  return (dispatch) => {
    get(url, authToken).then((response) => {
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
    });
  };
};

export const selectYardCraneApi = (yardCrane) => {
    return (dispatch) => {
        dispatch(selectYardCrane(yardCrane));
      };
}

export const selectLocationCraneApi = (yardCrane) => {
    return (dispatch) => {
        dispatch(selectLocationcrane(yardCrane));
      };
}

export const getBlockListApiCall = (facility,authToken,callback) => {
  let url = getUrl("yardBlockList") + facility;
  return (dispatch) => {
    get(url, authToken).then((response) => {
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
    });
  };
}

export const getYardOperationApiCall = (data, authToken, callback) => {
  let url = getUrl("yardContainerList");
  let querystring = `?facilityId=${data.facilityId}`;
  if (data.gatetype !== "" &&  data.gatetype !== undefined) {
    querystring = querystring + `&containerStatus=${data.gatetype}`;
  }else{
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
    get(url, authToken).then((response) => {
      const {
        data: { status, data },
      } = response;
      if (status) {
        dispatch(YardContainerList(data.yardContainerList));
      }
      callback(response);
    });
  };
}


export const AddPickUpApiCall = (data, authToken, callback) => {
  
  let url = getUrl("pickupConfirm");
  return (dispatch) => {
    post(url,data, authToken).then((response) => {
      callback(response);
    });
  };
}



export const GroundingContianerApiCall = (data, authToken, callback) => {
  
  let url = getUrl("groundingAddapi");
  return (dispatch) => {
    post(url,data, authToken).then((response) => {
      callback(response);
    });
  };
}




