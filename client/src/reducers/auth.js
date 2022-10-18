import produce from "immer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/auth";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return produce(state, (draft) => {
        draft.isLoggedIn = false;
      });
    case REGISTER_FAIL:
      return produce(state, (draft) => {
        draft.isLoggedIn = false;
      });
    case LOGIN_SUCCESS:
      return produce(state, (draft) => {
        draft.isLoggedIn = true;
        draft.user = action.payload.user.user;
      });
    case LOGIN_FAIL:
      return produce(state, (draft) => {
        draft.isLoggedIn = false;
        draft.user = null;
      });
    case LOGOUT:
      return produce(state, (draft) => {
        draft.isLoggedIn = false;
        draft.user = null;
      });
    default:
      return state;
  }
};

export default auth;
