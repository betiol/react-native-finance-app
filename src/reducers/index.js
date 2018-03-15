import { combineReducers } from "redux";
import { dashboard } from "./dashboard";
import { account } from "./account";

export default combineReducers({
  dashboard,
  account
});
