import { getUrl } from "../services/network/urls";
import { post } from "../services/network/requests";
import { login, remember } from "../actions/authActions";
export const LoginApi = (userData, remember_me, callback) => {
  let url = getUrl("signin");

  return (dispatch) => {
    post(url, userData, {})
      .then((response) => {
        
        const {
          data: { status, data },
        } = response;
        if (status) {
          // dispatch(remember({remember_username : userData}));
          dispatch(
            login({
              authToken: data.token,
              user: {
                fullname: data.username,
                isAdmin: data.admin,
              },
            })
          );
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
