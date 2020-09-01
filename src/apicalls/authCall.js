import { getUrl } from "../services/network/urls";
import { post } from "../services/network/requests";
import { login } from "../actions/authActions";
export const LoginApi = (data, callback) => {
  let url = getUrl("signin");

  return (dispatch) => {
    post(url, data, {})
      .then((response) => {
        const {
          data: { status, data },
        } = response;
        callback(response);
        if (status) {
          callback(response);
          setTimeout(() => {
            dispatch(
              login({
                authToken: data.token,
                user: {
                  fullname: data.username,
                  isAdmin: data.admin,
                },
              })
            );
          }, 1000);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};
