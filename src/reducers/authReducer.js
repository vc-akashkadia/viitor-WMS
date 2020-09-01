import { actionTypes } from "../actions/actionTypes";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const initialAuthState = {
  user:undefined,//{fullname : 'test'},
  authToken: undefined,
};
const auth = persistReducer(
  { storage, key: "wms", whitelist: ["user", "authToken"] },
    (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.Login: {
      const { authToken,user } = action.payload;
      return { authToken, user: user };
    }
    case actionTypes.Register: {
      const { authToken } = action.payload;
      return { authToken, user: undefined };
    }
    case actionTypes.Logout: {
      // TODO: Change this code. Actions in reducer aren't allowed.
      return initialAuthState;
    }
    case actionTypes.UserLoaded: {
      const { user } = action.payload;
      return { ...state, user };
    }
    default:
      return state;
  }
});

export default auth;
