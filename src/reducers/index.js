import { combineReducers } from "redux";
import employee from './employee.js';
import detail from "./detail.js";
import redirect from "./redirect.js";

const reducers = combineReducers({
  employee,
  detail,
  redirect
});

export default reducers;