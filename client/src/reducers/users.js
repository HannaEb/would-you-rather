import produce from "immer";
import { UPDATE_USER_QUESTIONS, UPDATE_USER_ANSWERS } from "../actions/users";

const initialState = {};

const users = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_QUESTIONS:
      return produce(state, (draft) => {
        draft[action.payload.author].questions = draft[
          action.payload.author
        ].questions.concat([action.payload.id]);
      });
    case UPDATE_USER_ANSWERS:
      return produce(state, (draft) => {
        draft[action.payload.authedUser].answers = draft[
          action.payload.authedUser
        ].answers.concat({
          id: action.payload.id,
          answer: action.payload.answer,
        });
      });
    default:
      return state;
  }
};

export default users;
