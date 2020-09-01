import { getUrl } from "../services/network/urls";
import { post, get } from "../services/network/requests";
import { yardCraneList, selectYardCrane } from "../actions/actions";

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
