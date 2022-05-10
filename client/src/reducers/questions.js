import produce from "immer";
import {
  RECEIVE_QUESTIONS,
  CREATE_QUESTION,
  UPDATE_QUESTION,
} from "../actions/questions";

const initialState = {};

export default function questions(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.payload.reduce(
          (questions, question) => ({ ...questions, [question.id]: question }),
          {}
        ),
      };
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
    default:
      return state;
  }
}
