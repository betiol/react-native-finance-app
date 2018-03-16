import { combineReducers } from "redux";
import { dashboard } from "./dashboard";
import { account } from "./account";
import { occurrence } from "./occurrence";
import { category } from "./category";
import { typeOccurrence } from "./typeOccurrence";

export default combineReducers({
  dashboard,
  account,
  occurrence,
  category,
  typeOccurrence
});
