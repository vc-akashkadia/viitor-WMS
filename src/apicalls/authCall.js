import { getUrl } from "../services/network/urls";
import { post } from "../services/network/requests";
import { login,remember } from "../actions/authActions";
export const LoginApi = (userData,remember_me ,callback) => {
  let url = getUrl("signin");

  return (dispatch) => {
    post(url, userData, {})
      .then((response) => {
        const {
          data: { status, data },
        } = response;
        callback(response);
        if (status) {
          callback(response);
          setTimeout(() => {
            if(remember_me){
              dispatch(remember({remember_username : userData}));
            }
            dispatch(
              login({
                authToken: data.token,
                user: {
                  fullname: data.username,
                  isAdmin: data.admin,
                },
              })
            );
          }, 2000);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

};


