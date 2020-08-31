import { combineReducers } from "redux";
import auth from "./authReducer";
import base from "./baseReducer";

const rootReducer = combineReducers({
  auth: auth,
  base: base,
});

export default rootReducer;
