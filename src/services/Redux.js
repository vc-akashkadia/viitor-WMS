import { createStore, applyMiddleware } from "redux";
import {configureStore,getDefaultMiddleware} from "@reduxjs/toolkit";
import logger from "redux-logger";
import {persistStore} from "redux-persist";
import {reduxBatch} from "@manaflair/redux-batch";
import rootReducer from "../reducers/rootReducer";

const middlewares = applyMiddleware(logger);

// export const store =
//   process.env.NODE_ENV === "development"
//     ? createStore(rootReducer, middlewares)
//     : createStore(rootReducer);

const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true
  }),
  logger
  
];
const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [reduxBatch]
});
export const dispatch = (action) => {
  store.dispatch(action);
};

export const persistor = persistStore(store);

export default store;
