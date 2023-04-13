// third-party
import { combineReducers } from "redux";
import auth from "./authSlice";
import pageReducer from "./pageSlice";

const reducers = combineReducers({ auth, pageReducer });

export default reducers;
