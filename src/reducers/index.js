import { combineReducers } from "redux";
import { dashboard } from "./dashboard";
import { account } from "./account";

export default combineReducers({
  // nav: navReducer,
  dashboard,
  account
});
