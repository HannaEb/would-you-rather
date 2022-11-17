import produce from "immer";
import { LOGOUT } from "../actions/auth";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const auth = (state = initialState, action) => {
  switch (action.type) {
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
