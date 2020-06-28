import { combineReducers } from "redux";
import scheduler from "./scheduler";
import chart from "./chart";

export default combineReducers({
	scheduler,
	chart,
});
