import { actionTypes } from "../actions/actionTypes";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const initialAuthState = {
  user: undefined,
  authToken: undefined,
  remember_username: {},
  userRole: [],
};
const auth = persistReducer(
  {
    storage,
    key: "wms-auth",
    whitelist: ["user", "authToken", "userRole"],
  },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.LOGIN: {
        const { authToken, user } = action.payload;
        return { ...state, authToken, user: user };
      }
      case actionTypes.LOGOUT: {
        return initialAuthState;
      }
      case actionTypes.USER_LOADED: {
        const { user } = action.payload;
        return { ...state, user };
      }
      case actionTypes.USER_ROLE: {
        return { ...state, userRole: action.data };
      }
      case actionTypes.REMEMBER_ME_ACTION: {
        const { remember_username } = action.payload;

        return { ...state, remember_username };
      }
      default:
        return state;
    }
  }
);

export default auth;
