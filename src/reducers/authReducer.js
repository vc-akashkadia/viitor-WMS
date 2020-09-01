import { actionTypes } from "../actions/actionTypes";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const initialAuthState = {
  user:undefined,//{fullname : 'test'},
  authToken: undefined,
  remember_username : {

  }
};
const auth = persistReducer(
  { storage, key: "wms-auth", whitelist: ["user", "authToken","remember_username"] },
    (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN: {
      const { authToken,user } = action.payload;
      return { authToken, user: user };
    }
    case actionTypes.LOGOUT: {
      // TODO: Change this code. Actions in reducer aren't allowed.
      return {
        ...state,
        user:undefined,
        authToken: undefined,
      };
    }
    case actionTypes.USER_LOADED: {
      const { user } = action.payload;
      return { ...state, user };
    }
    case actionTypes.REMEMBER_ME_ACTION: {
      const { remember_username } = action.payload;
     
      return { ...state, remember_username };
    }
    default:
      return state;
  }
});

export default auth;
