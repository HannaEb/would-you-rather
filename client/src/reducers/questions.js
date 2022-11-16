import produce from "immer";
import { GET_QUESTION } from "../actions/questions";

const initialState = {};

const questions = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTION:
      return produce(state, (draft) => {
        draft[action.payload.id] = action.payload;
      });
    default:
      return state;
  }
};

export default questions;
