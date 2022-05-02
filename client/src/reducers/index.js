import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading";
import users from "./users";
import questions from "./questions";
import auth from "./auth";
import message from "./message";

export default combineReducers({
  users,
  questions,
  loadingBar: loadingBarReducer,
  auth,
  message,
});
