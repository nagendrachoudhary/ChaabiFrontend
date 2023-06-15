import { legacy_createStore, applyMiddleware } from "redux"
import reducer from "./reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

const myStore = legacy_createStore(reducer, applyMiddleware(thunk));

export default myStore;