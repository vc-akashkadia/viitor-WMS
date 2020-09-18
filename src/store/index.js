import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
import rootReducer from "../reducers/rootReducer";

const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
  }),
  logger,
];
const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});
export const dispatch = (action) => {
  store.dispatch(action);
};

export const persistor = persistStore(store);

export default store;
