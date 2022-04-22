import produce from "immer";
import {
  RECEIVE_QUESTIONS,
  CREATE_QUESTION,
  UPDATE_QUESTION,
} from "../actions/questions";

export default function questions(state = {}, action) {
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
      console.log("Reducer Payload", action.payload);
      console.log("Reducer Action", action);
      return produce(state, (draft) => {
        draft[action.q.id][action.answer].votes = draft[action.q.id][
          action.answer
        ].votes.concat([action.autheduser]);
      });
    default:
      return state;
  }
}
