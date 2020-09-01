import { getUrl } from "../services/network/urls";
import { post, get } from "../services/network/requests";
import { DamageCodeList } from "../actions/actions";

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
            label: code.damageCode,
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
