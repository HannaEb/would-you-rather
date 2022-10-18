import produce from "immer";
import {
  RECEIVE_QUESTIONS,
  CREATE_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
} from "../actions/questions";

const initialState = {};

const questions = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return produce(state, (draft) => {
        action.payload.questions.forEach((question) => {
          draft[question.id] = question;
        });
      });
    case CREATE_QUESTION:
      return produce(state, (draft) => {
        draft[action.payload.id] = action.payload;
      });
    case UPDATE_QUESTION:
      return produce(state, (draft) => {
        draft[action.question.id][action.answer].votes = draft[
          action.question.id
        ][action.answer].votes.concat([action.authedUserId]);
      });
    case DELETE_QUESTION:
      return produce(state, (draft) => {
        delete draft[action.payload];
      });
    default:
      return state;
  }
};

export default questions;
