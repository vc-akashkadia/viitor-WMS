import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const reducer = combineReducers({
    
})
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(...middleware))
);

export default store;