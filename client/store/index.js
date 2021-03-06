import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import user from "./user";
import friends from "./friends";
import comms from "./comms";

const reducer = combineReducers({
  auth,
  user,
  friends,
  comms,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./user";
export * from "./friends";
export * from "./comms";
