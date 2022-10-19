import produce from "immer";
import {
  RECEIVE_USERS,
  UPDATE_USER_QUESTIONS,
  UPDATE_USER_ANSWERS,
} from "../actions/users";

const initialState = {};

const users = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return produce(state, (draft) => {
        action.payload.users.forEach((user) => {
          draft[user.username] = user;
        });
      });
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
