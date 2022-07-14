import produce from "immer";
import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/message";

const initialState = {};

const message = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return produce(state, (draft) => {
        draft.message = action.payload;
      });
    case CLEAR_MESSAGE:
      return produce(state, (draft) => {
        draft.message = "";
      });
    default:
      return state;
  }
};

export default message;
